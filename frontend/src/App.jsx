/* eslint-disable import/no-unresolved */

import EnterPoint from "@components/enter_point/enter_point";
import Observatoire from "@components/observatoire/observatoire";
import About from "@components/about/about";
import "./App.css";
import Footer from "@components/footer/footer";

function App() {
  return (
    <main className="w-full h-full bg-[#072449] overflow-hidden">
      <div className="flex flex-col items-center">
        <EnterPoint />
        <Observatoire />
        <About />
        <Footer />
      </div>
    </main>
  );
}

export default App;
