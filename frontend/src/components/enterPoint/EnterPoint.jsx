/* eslint-disable import/no-unresolved */
import About from "@components/about/about";
import Weather from "@components/weather/Weather";
import Footer from "@components/footer/footer";
import Observatoire from "@components/observatoire/observatoire";
import Contact from "@components/contact/contact";
import Events from "@components/enterPoint/events";
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
