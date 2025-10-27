import React from "react";
import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import AboutUs from "./components/AboutUs";
import OurStory from "./components/OurStory";
import Memories from "./components/Memories";
import Testimonials from "./components/Testimonials";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <AboutUs />
      <OurStory />
      <Memories />
      <Testimonials />
      <Gallery />
      <Footer />
    </div>
  );
}

export default App;
