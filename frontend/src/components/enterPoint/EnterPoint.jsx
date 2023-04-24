/* eslint-disable import/no-unresolved */
import About from "@components/about/About";
import Weather from "@components/weather/Weather";
import Footer from "@components/footer/Footer";
import Observatoire from "@components/observatoire/Observatoire";
import Contact from "@components/contact/Contact";
import Events from "@components/enterPoint/Events";
import Header from "@components/header/Header";

export default function EnterPoint() {
  return (
    <>
      <Header />
      <Weather />
      <Observatoire />
      <About />
      <Events />
      <Contact />
      <Footer />
    </>
  );
}
