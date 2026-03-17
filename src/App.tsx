import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Atmosphere from './components/Atmosphere';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsBar from './components/StatsBar';
import ProblemSolution from './components/ProblemSolution';
import YouVsWe from './components/YouVsWe';
import Features from './components/Features';
import RevenueOpportunity from './components/RevenueOpportunity';
import HowItWorks from './components/HowItWorks';
import PlatformLogos from './components/PlatformLogos';
import WhoItsFor from './components/WhoItsFor';
import FAQ from './components/FAQ';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import CaseStudies from './components/CaseStudies';

const LandingPage: React.FC = () => (
  <main>
    <Hero />
    <StatsBar />
    <ProblemSolution />
    <YouVsWe />
    <Features />
    <RevenueOpportunity />
    <HowItWorks />
    <PlatformLogos />
    <WhoItsFor />
    <FAQ />
    <ContactForm />
  </main>
);

const App: React.FC = () => {
  return (
    <>
      <Atmosphere />
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/case-studies" element={<CaseStudies />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
