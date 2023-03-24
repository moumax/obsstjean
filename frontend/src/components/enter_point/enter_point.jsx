import { useContext } from "react";
import { useNavigate } from "react-router-dom";
/* eslint-disable import/no-unresolved */
import About from "@components/about/about";
import Footer from "@components/footer/footer";
import Observatoire from "@components/observatoire/observatoire";
import Contact from "@components/contact/contact";
import Events from "@components/events/events";
import { toast } from "react-toastify";
import userAPI from "../../services/userAPI";
import CurrentUserContext from "../../contexts/userContext";

import Image from "../../assets/logo/logo.png";
import EnterPointImage from "../../assets/enter_point/enter_point.jpg";

export default function EnterPoint() {
  const { user, setUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();

  const handleDisconnect = () => {
    userAPI
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
        {user && (
          <button
            className="bg-blue-600 rounded-lg p-1 text-white absolute top-3 right-20"
            type="button"
            onClick={() => navigate("/administration")}
          >
            Administration
          </button>
        )}
        {user && (
          <button
            className="bg-red-600 rounded-lg p-1 text-white absolute top-3 right-1"
            type="button"
            onClick={() => {
              handleDisconnect();
            }}
          >
            Logout
          </button>
        )}
        {!user && (
          <button
            className="bg-blue-600 rounded-lg p-1 text-white absolute top-3 right-5"
            type="button"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        )}

        <img
          className="w-[50vw]"
          src={Image}
          alt="logo observatoire de saint jean le blanc"
        />
        <h1>Observatoire de Saint Jean Le Blanc</h1>
        <h2>Association loi 1901 pour la promotion de l'astronomie amateur</h2>
        <img
          className="my-5 rounded-xl"
          src={EnterPointImage}
          alt="observatoire"
        />
      </header>
      <Observatoire />
      <About />
      <Events />
      <Contact />
      <Footer />
    </>
  );
}
