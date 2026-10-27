import assert from "node:assert/strict";
import fs from "node:fs";
import Module from "node:module";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const testDirectory = path.dirname(fileURLToPath(import.meta.url));
const resolveFilename = Module._resolveFilename;
Module._resolveFilename = function resolvePixAliases(request, parent, isMain, options) {
  if (request === "@/lib/open-andrade/pricing") {
    return path.join(testDirectory, "pricing.ts");
  }

  return resolveFilename.call(this, request, parent, isMain, options);
};

Module._extensions[".ts"] = (loadedModule, filename) => {
  const source = fs.readFileSync(filename, "utf8");
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  });

  loadedModule._compile(compiled.outputText, filename);
};

const loadModule = Module.createRequire(import.meta.url);
const { buildPixPayload } = loadModule("./pix.ts");

function parseTlv(payload) {
  const fields = [];

  for (let offset = 0; offset < payload.length;) {
    const id = payload.slice(offset, offset + 2);
    const lengthText = payload.slice(offset + 2, offset + 4);
    assert.match(id, /^\d{2}$/, `Invalid BR Code tag at character ${offset}`);
    assert.match(lengthText, /^\d{2}$/, `Invalid BR Code length for tag ${id}`);

    const length = Number(lengthText);
    const value = payload.slice(offset + 4, offset + 4 + length);
    assert.equal(value.length, length, `Incorrect character length for tag ${id}`);
    fields.push({ id, value });
    offset += 4 + length;
  }

  return fields;
}

function crc16(payload) {
  let crc = 0xffff;

  for (const byte of new TextEncoder().encode(payload)) {
    crc ^= byte << 8;
    for (let bit = 0; bit < 8; bit += 1) {
      crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1;
      crc &= 0xffff;
    }
  }

  return crc.toString(16).toUpperCase().padStart(4, "0");
}

test("CRC-16 matches the Banco Central static BR Code example", () => {
  const officialPrefix =
    "00020126580014br.gov.bcb.pix0136123e4567-e12b-12d1-a456-426655440000" +
    "5204000053039865802BR5913Fulano de Tal6008BRASILIA62070503***6304";

  assert.equal(crc16(officialPrefix), "1D3D");
});

test("buildPixPayload returns a parseable BR Code for each registration fee", () => {
  for (const [amountCents, expectedAmount] of [[3000, "30.00"], [4500, "45.00"]]) {
    const payload = buildPixPayload(amountCents);
    const fields = parseTlv(payload);
    const field = (id) => fields.find((item) => item.id === id)?.value;
    const account = parseTlv(field("26"));
    const additionalData = parseTlv(field("62"));

    assert.equal(field("00"), "01");
    assert.equal(field("01"), "11");
    assert.equal(account.find((item) => item.id === "00")?.value, "br.gov.bcb.pix");
    assert.equal(account.find((item) => item.id === "01")?.value, "+5517996195606");
    assert.equal(field("52"), "0000");
    assert.equal(field("53"), "986");
    assert.equal(field("54"), expectedAmount);
    assert.equal(field("58"), "BR");
    assert.equal(field("59"), "Evandro Jose de Andrade");
    assert.equal(field("60"), "CATANDUVA");
    assert.equal(additionalData.find((item) => item.id === "05")?.value, "***");
    assert.equal(fields.at(-1)?.id, "63");
    assert.equal(fields.at(-1)?.value, crc16(payload.slice(0, -4)));
  }
});
