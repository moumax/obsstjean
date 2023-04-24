import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../assets/Button";
import CurrentUserContext from "../../contexts/userContext";
import axiosAPI from "../../services/axiosAPI";

export default function Footer() {
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
      .catch((err) => toast.error(err.message));
  };

  return (
    <footer className="flex flex-col pt-5">
      <div className="flex flex-col items-center text-xs text-white opacity-40">
        <p>© 2019 - 2023 -- Marc LANTOL</p>
        <p>Observatoire Astronomique de Saint Jean Le Blanc (V3.0.0)</p>
      </div>
      <div className="flex justify-end gap-2 p-5 opacity-30">
        {user && (
          <Button
            label="Administration"
            bgprimary="bg-blue-600"
            height="h-8"
            text="text-xs"
            onClick={() => navigate("/administration")}
          />
        )}
        {user && (
          <Button
            label="Logout"
            bgprimary="bg-red-600"
            height="h-8"
            text="text-xs"
            onClick={() => {
              handleDisconnect();
            }}
          />
        )}
        {!user && (
          <Button
            label="Login"
            bgprimary="bg-blue-600"
            height="h-8"
            text="text-xs"
            onClick={() => navigate("/login")}
          />
        )}
      </div>
    </footer>
  );
}
