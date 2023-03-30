import { useContext } from "react";
import { useNavigate } from "react-router-dom";
/* eslint-disable import/no-unresolved */
import About from "@components/about/about";
import Footer from "@components/footer/footer";
import Observatoire from "@components/observatoire/observatoire";
import Contact from "@components/contact/contact";
import Events from "@components/enter_point/events";
import { toast } from "react-toastify";
import axiosAPI from "../../services/axiosAPI";
import CurrentUserContext from "../../contexts/userContext";
import Button from "../assets/Button";

import Image from "../../assets/logo/logo.png";
import EnterPointImage from "../../assets/enter_point/enter_point.jpg";

export default function EnterPoint() {
  const { user, setUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();

  const handleDisconnect = () => {
    axiosAPI
      .get("http://localhost:5000/api/auth/logout")
      .then(() => {
        localStorage.clear();
        setUser(undefined);
        toast.warning("Tu es déconnecté !");
      })
      .catch((err) => console.error(err.message));
  };

  return (
    <>
      <header className="w-[90vw] mt-10 flex flex-col items-center">
        <div className="flex gap-2 absolute top-2 right-2">
          {user && (
            <Button
              label="Administration"
              bgprimary="bg-blue-600"
              onClick={() => navigate("/administration")}
            />
          )}
          {user && (
            <Button
              label="Logout"
              bgprimary="bg-red-600"
              onClick={() => {
                handleDisconnect();
              }}
            />
          )}
          {!user && (
            <Button
              label="Login"
              bgprimary="bg-blue-600"
              onClick={() => navigate("/login")}
            />
          )}
        </div>

        <div className="flex flex-col items-center mt-10 text-center">
          <img
            className="w-[50vw]"
            src={Image}
            alt="logo observatoire de saint jean le blanc"
          />
          <h1 className="text-xl font-exo2 text-transparent bg-clip-text bg-gradient-to-b from-[#fffc08] to-[#575506] pt-3">
            Observatoire de Saint Jean Le Blanc
          </h1>
          <h2 className="text-sm  font-exo2 text-white opacity-50 break-keep pt-1">
            Association loi 1901 pour la promotion de l'astronomie amateur
          </h2>
          <img
            className="my-5 rounded-xl"
            src={EnterPointImage}
            alt="observatoire"
          />
        </div>
      </header>
      <Observatoire />
      <About />
      <Events />
      <Contact />
      <Footer />
    </>
  );
}
