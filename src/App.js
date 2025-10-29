import React from "react";
import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import AboutUs from "./components/AboutUs";
import OurStory from "./components/OurStory";
import Memories from "./components/Memories";
import FoodGallery from "./components/FoodGallery";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <AboutUs />
      <OurStory />
      <Memories />
      <FoodGallery />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default App;
