import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Metodologia from "@/components/Metodologia";
import Equipe from "@/components/Equipe";
import Beneficios from "@/components/Beneficios";
import Estatisticas from "@/components/Estatisticas";
import Jornada from "@/components/Jornada";
import Programas from "@/components/Programas";
import Cidades from "@/components/Cidades";
import Historias from "@/components/Historias";
import Galeria from "@/components/Galeria";
import SigaInstagram from "@/components/SigaInstagram";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Metodologia />
        <Equipe />
        <Beneficios />
        <Estatisticas />
        <Jornada />
        <Programas />
        <Cidades />
        <Historias />
        <SigaInstagram />
        <Galeria />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
