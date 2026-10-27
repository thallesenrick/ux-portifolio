import { lazy, Suspense } from "react";
import { HeroAccentProvider } from "./lib/hero-accent";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/commun/Navbar";
import Footer from "./components/commun/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import MusicPlayer from "./components/commun/MusicPlayer";

const Playhub=lazy(()=>import("./pages/Playhub"));
const Rachaqui=lazy(()=>import("./pages/Rachaqui"));
const Oryon=lazy(()=>import("./pages/Oryon"));
const OryonLegis=lazy(()=>import("./pages/OryonLegis"));

export default function App() {
  return (
    <HeroAccentProvider>
    <Router>
      <div className="min-h-screen bg-white text-slate-100 dark:bg-slate-900 transition-colors relative">
        <div className="absolute top-0 right-0">
         <Navbar />
        </div>
    
        <main className="pt-0">
          <Suspense fallback={<div className="min-h-[65vh] grid place-items-center pt-32 text-neutral-500" role="status" aria-label="Carregando / Loading">...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/playhub" element={<Playhub />} />
            <Route path="/projects/rachaqui" element={<Rachaqui />} />
            <Route path="/projects/oryon" element={<Oryon />} />
            <Route path="/projects/oryon-legis" element={<OryonLegis />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          </Suspense>
        </main>
        <Footer />
        <MusicPlayer />
      </div>
    </Router>
    </HeroAccentProvider>
  );
}
