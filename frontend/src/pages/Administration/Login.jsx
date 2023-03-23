import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import userAPI from "../../services/userAPI";

import CurrentUserContext from "../../contexts/userContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const { setUser } = useContext(CurrentUserContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email && pass) {
      userAPI
        .post("http://localhost:5000/api/auth/login", {
          email,
          pass,
        })
        .then((res) => {
          setUser(res.data);
          localStorage.setItem("user", JSON.stringify(res.data));
          navigate("/");
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
    <section id="login">
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="user"
            name="user"
            placeholder="Votre email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            id="pass"
            name="pass"
            placeholder="Votre mot de passe"
            onChange={(e) => setPass(e.target.value)}
          />
          <button className="login-button" type="submit">
            Se connecter
          </button>
        </form>
      </div>
    </section>
  );
}
