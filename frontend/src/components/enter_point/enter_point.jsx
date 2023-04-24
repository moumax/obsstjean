import { useContext } from "react";
import { useNavigate } from "react-router-dom";
/* eslint-disable import/no-unresolved */
import About from "@components/about/about";
import Weather from "@components/weather/Weather";
import Footer from "@components/footer/footer";
import Observatoire from "@components/observatoire/observatoire";
import Contact from "@components/contact/contact";
import Events from "@components/enter_point/events";
import Header from "@components/header/Header";
import { toast } from "react-toastify";
import axiosAPI from "../../services/axiosAPI";
import CurrentUserContext from "../../contexts/userContext";
import Button from "../assets/Button";

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
      <Header />
      <Weather />
      <Observatoire />
      <About />
      <Events />
      <Contact />
      <Footer />
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
    </>
  );
}
