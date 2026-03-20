import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/landing/Hero";
import ValueProps from "@/components/landing/ValueProps";
import ProjectTypesGrid from "@/components/landing/ProjectTypesGrid";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ValueProps />
        <ProjectTypesGrid />
      </main>
      <Footer />
    </>
  );
}
