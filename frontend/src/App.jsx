/* eslint-disable import/no-unresolved */
import { Routes, Route } from "react-router-dom";
import Administration from "@pages/Administration/Administration";
import EnterPoint from "@components/enter_point/enter_point";
import Login from "@pages/Administration/Login";

import { CurrentUserContextProvider } from "./contexts/userContext";

import "./App.css";

function App() {
  return (
    <CurrentUserContextProvider>
      <main className="w-full h-full bg-[#072449] overflow-hidden">
        <div className="flex flex-col items-center">
          <Routes>
            <Route path="/" element={<EnterPoint />} />
            <Route path="login" element={<Login />} />
            <Route path="Administration" element={<Administration />} />
          </Routes>
        </div>
      </main>
    </CurrentUserContextProvider>
  );
}

export default App;
