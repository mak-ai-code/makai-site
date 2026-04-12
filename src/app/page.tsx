import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero/hero";
import { Stats } from "@/components/stats";
import { Marquee } from "@/components/marquee";
import { Services } from "@/components/services";
import { Showcase } from "@/components/showcase";
import { Terminal } from "@/components/terminal";
import { Work } from "@/components/work";
import { Proof } from "@/components/proof";
import { Process } from "@/components/process";
import { Team } from "@/components/team";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { VoiceDemoModal } from "@/components/voice-demo/voice-demo";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <Stats />
        <Marquee />
        <Services />
        <Showcase />
        <Terminal />
        <Work />
        <Proof />
        <Process />
        <Team />
        <Contact />
      </main>
      <Footer />
      <VoiceDemoModal />
    </>
  );
}
