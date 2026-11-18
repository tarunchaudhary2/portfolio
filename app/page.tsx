import Hero from "./components/cp/Hero";
import Pipeline from "./components/cp/Pipeline";
import { Architecture } from "./components/cp/Diagrams";
import { AISection, Building, Career, Field, Platforms, Stack } from "./components/cp/Sections";
import Contact, { Services } from "./components/cp/Contact";
import { Footer, Mesh, Nav, Reveal } from "./components/cp/shell";
import { IconDefs, PopupProvider } from "./components/cp/ui";
import { personJsonLd } from "./lib/site";

export default function Home() {
  return (
    <PopupProvider>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()).replace(/</g, "\\u003c") }} />
      <IconDefs />
      <Mesh />
      <Nav />
      <main>
        <Hero />
        <Pipeline />
        <Architecture />
        <Career />
        <Platforms />
        <Building />
        <AISection />
        <Services />
        <Field />
        <Stack />
        <Contact />
      </main>
      <Footer />
      <Reveal />
    </PopupProvider>
  );
}
