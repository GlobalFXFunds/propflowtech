import React from 'react';
import Atmosphere from './components/Atmosphere';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

const App: React.FC = () => {
  return (
    <>
      <Atmosphere />
      <Navbar />
      <main>
        <Hero />
      </main>
    </>
  );
};

export default App;
