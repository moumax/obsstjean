import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosAPI from "../../services/axiosAPI";
import Button from "../../components/assets/Button";

import CurrentUserContext from "../../contexts/userContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const { setUser } = useContext(CurrentUserContext);

  const navigate = useNavigate();

  // function refreshPage() {
  //   window.location.reload(false);
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email && pass) {
      await axiosAPI
        .post("http://localhost:5000/api/auth/login", {
          email,
          pass,
        })
        .then((res) => {
          setUser(res.data);
          localStorage.setItem("role", JSON.stringify(res.data.role));
          navigate("/");
          // refreshPage();
          toast.success("Vous êtes connecté !");
        });
    } else {
      toast.warning("Votre email ou votre mot de passe est faux");
    }

    if (email && !pass) {
      toast.warning("Merci de renseigner votre mot de passe");
    }
    if (!email && pass) {
      toast.warning("Merci de renseigner votre email");
    }
  };

  return (
    <section
      className="w-[90vw] h-[100vh] mt-10 flex flex-col items-center justify-center"
      id="login"
    >
      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col w-[60vw] gap-2 py-5">
            <input
              className="rounded-xl h-10 text-center"
              type="text"
              id="user"
              name="user"
              placeholder="Votre email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="rounded-xl h-10 text-center"
              type="password"
              id="pass"
              name="pass"
              placeholder="Votre mot de passe"
              onChange={(e) => setPass(e.target.value)}
            />
            <Button
              label="Login"
              type="submit"
              bgprimary="bg-blue-600"
              onClick={(e) => handleSubmit(e)}
            />
          </div>
        </form>
      </div>
    </section>
  );
}
