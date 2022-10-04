import React from 'react'
 import About from '../components/about';
 import Contact from '../components/contact';
 import Features from '../components/features';
 import Navbar from '../components/navbar';
 import Pricing from '../components/pricing';
 import Showcase from '../components/showcase';

export default function LandingPage() {
  return (
      <div>
      <Navbar />
      <Showcase />
      <About />
      <Features />
      <Pricing />
      <Contact />
    </div>
  )
}
