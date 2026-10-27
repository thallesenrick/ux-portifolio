// src/pages/Home.tsx
import Hero from "../components/commun/Hero";
import WhyHireMe from "../components/commun/WhyHireMe";
import SelectedProjects from "../components/commun/SelectedProjects";
import Experience from "../components/commun/Experience";
import ContactSection from "../components/commun/ContactSection";
import SectionReveal from "../components/commun/SectionReveal";

export default function Home() {
  return (
    <div className="bg-white dark:bg-neutral-900 text-gray-800 dark:text-gray-100 transition-colors duration-300" style={{ overflowX: "clip" }}>
      <SectionReveal from="left"><Hero /></SectionReveal>
      <SectionReveal from="left"><SelectedProjects /></SectionReveal>
      <SectionReveal from="right"><WhyHireMe /></SectionReveal>
      <SectionReveal from="left"><Experience /></SectionReveal>
      <SectionReveal from="right"><ContactSection /></SectionReveal>
    </div>
  );
}
