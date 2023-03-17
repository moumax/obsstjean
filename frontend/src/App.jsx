/* eslint-disable import/no-unresolved */

import EnterPoint from "@components/enter_point/enter_point";
import Observatoire from "@components/observatoire/observatoire";
import "./App.css";

function App() {
  return (
    <main className="w-full h-full bg-[#072449] overflow-hidden">
      <div className="flex flex-col items-center">
        <EnterPoint />
        <Observatoire />
      </div>
    </main>
  );
}

export default App;
