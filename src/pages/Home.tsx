// src/pages/Home.tsx
import Hero from "../components/commun/Hero";
import WhyHireMe from "../components/commun/WhyHireMe";

export default function Home() {
  return (
    <div className="bg-white dark:bg-neutral-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <Hero />
      <WhyHireMe />
    </div>
  );
}