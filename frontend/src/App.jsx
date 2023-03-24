/* eslint-disable import/no-unresolved */
import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Administration from "@pages/Administration/Administration";
import EnterPoint from "@components/enter_point/enter_point";
import Login from "@pages/Administration/Login";
import CurrentUserContext from "./contexts/userContext";

import "./App.css";

function App() {
  const { user } = useContext(CurrentUserContext);
  return (
    <main className="w-full h-full bg-[#072449] overflow-hidden">
      <div className="flex flex-col items-center">
        <Routes>
          <Route path="/" element={<EnterPoint />} />
          <Route path="login" element={<Login />} />
          <Route
            path="Administration"
            element={user ? <Administration /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </main>
  );
}

export default App;
