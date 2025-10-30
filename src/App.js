import "./App.css";
import AboutUs from "./components/AboutUs";
import FoodGallery from "./components/FoodGallery";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Memories from "./components/Memories";
import OurStory from "./components/OurStory";
import Testimonials from "./components/Testimonials";

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
