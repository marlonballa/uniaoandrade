import Image from "next/image";

type LogoProps = {
  className?: string;
};

export default function Logo({ className }: LogoProps) {
  return (
    <span className={`relative block shrink-0 overflow-hidden rounded-full ${className ?? ""}`}>
      <Image
        src="/logo.jpeg"
        alt="Emblema União Andrade Escola de Artes Marciais"
        fill
        sizes="40px"
        className="object-cover"
      />
    </span>
  );
}
