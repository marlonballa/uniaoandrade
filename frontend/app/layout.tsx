import type { Metadata } from "next";
import { Bevan, Unbounded, Space_Grotesk } from "next/font/google";
import "./globals.css";

const bevan = Bevan({
  variable: "--font-bevan",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = "https://www.uniaoandrade.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Taekwondo e Artes Marciais em Catanduva | União Andrade",
    template: "%s | União Andrade",
  },
  description:
    "Taekwondo Kukkiwon Old School em Catanduva-SP. Arte marcial, luta e defesa pessoal para crianças e adultos, com mais de 20 anos de tradição. Agende sua aula experimental.",
  keywords: [
    "Taekwondo",
    "Taekwondo Catanduva",
    "Academia de Taekwondo",
    "Taekwondo Kukkiwon",
    "Taekwondo marcial",
    "arte marcial",
    "defesa pessoal",
    "luta",
    "faixa preta",
    "Taekwondo infantil",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "União Andrade Taekwondo Marcial",
    title: "União Andrade | Taekwondo Marcial em Catanduva",
    description:
      "Arte marcial, luta e defesa pessoal para crianças e adultos, com mais de 20 anos de tradição em Catanduva-SP.",
  },
  alternates: {
    canonical: siteUrl,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  name: "União Andrade | Taekwondo Marcial",
  description:
    "Escola de Taekwondo Kukkiwon Old School em Catanduva-SP, com mais de 20 anos de tradição em arte marcial, luta e defesa pessoal para crianças e adultos.",
  url: siteUrl,
  telephone: "+55 17 99619-5606",
  address: {
    "@type": "PostalAddress",
    streetAddress: "R. Minas Gerais, 454, 1º andar",
    addressLocality: "Catanduva",
    addressRegion: "SP",
    addressCountry: "BR",
  },
  sameAs: ["https://www.instagram.com/uniaoandrade"],
  areaServed: [
    "Catanduva",
    "Catiguá",
    "Santa Adélia",
    "Dois Córregos",
    "Fernando Prestes",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${bevan.variable} ${unbounded.variable} ${spaceGrotesk.variable}`}
    >
      <body className="bg-paper text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
