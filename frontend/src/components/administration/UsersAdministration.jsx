import { useContext, useReducer, useState } from "react";
import Modal from "react-modal";
// import { toast } from "react-toastify";
import useSWR, { mutate } from "swr";
import { MoonLoader } from "react-spinners";
import { toast } from "react-toastify";
import CurrentUserContext from "../../contexts/userContext";
import Button from "../assets/Button";
import usersReducer from "../../reducers/usersReducer";
import CardUser from "./CardUser";
import addUser from "../../assets/administration/addUser.svg";
import fetcher from "../../api/fetcher";

Modal.setAppElement("#root");

export default function UsersAdministration() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { user } = useContext(CurrentUserContext);

  const initialState = {
    email: "",
    password: "",
    role: "",
  };

  const [userForm, userFormDispatch] = useReducer(usersReducer, initialState);

  const { data, error } = useSWR("http://localhost:5000/api/users", fetcher);

  if (error)
    return (
      <div className="text-white">
        Une erreur est survenue : {error.message}
      </div>
    );
  if (!data)
    return (
      <div>
        <MoonLoader
          color="#36d7b7"
          size={60}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );

  const openModalAdd = () => {
    if (user.role === "administrateur") setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      await fetcher("http://localhost:5000/api/users", "POST", {
        email: userForm.email,
        password_hash: userForm.password,
        role: userForm.role,
      });
      mutate("http://localhost:5000/api/users");
      toast.success("Utilisateur crée avec succès");
      closeModal();
    } catch (err) {
      if (!userForm.email) {
        toast.error("Champs email vide");
      }
      if (!userForm.password) {
        toast.error("Champs password vide");
      }
      if (!userForm.role) {
        toast.error("Champs role vide");
      } else {
        toast.error("Erreur dans le formulaire");
      }
    }
  };

  const modalStyle = {
    overlay: {
      backgroundColor: "rgba(255, 255, 255, 0.50)",
      overflow: "hidden",
    },
    content: {
      borderRadius: "20px",
      backgroundColor: "rgba(7, 35, 72, 0.90)",
      border: "none",
    },
  };

  return (
    <section className="w-[90vw] mt-10 flex flex-col items-center">
      <h2 className="text-2xl text-white font-exo2">Liste des utilisateurs</h2>
      <div className="flex self-end py-4">
        <button
          className="self-end pt-6 pb-6"
          type="button"
          onClick={openModalAdd}
        >
          <img className="w-[15vw]" src={addUser} alt="add an event" />
          <span />
        </button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        // className="flex flex-col bg-transparent"
        style={modalStyle}
      >
        <h2 className="text-center text-white text-2xl">
          Ajouter un utilisateur
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="m-1 mt-5">
            <label htmlFor="title" className="font-bold text-slate-300">
              Email
            </label>
            <input
              id="title"
              type="text"
              className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Email de l'utilisateur"
              value={userForm.email}
              onChange={(e) =>
                userFormDispatch({
                  type: "VOID_EMAIL",
                  payload: e.target.value,
                })
              }
            />
          </div>
          <div className="m-1">
            <label htmlFor="password_hash" className="font-bold text-slate-300">
              Mot de passe
            </label>
            <input
              id="password_hash"
              type="password"
              className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Mot de passe"
              value={userForm.password}
              onChange={(e) =>
                userFormDispatch({
                  type: "VOID_PASSWORD",
                  payload: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col m-1">
            <label htmlFor="role-select" className="font-bold text-slate-300">
              Choisissez un rôle:
            </label>

            <select
              name="roles"
              className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              id="role-select"
              value={userForm.role}
              onChange={(e) =>
                userFormDispatch({
                  type: "VOID_ROLE",
                  payload: e.target.value,
                })
              }
            >
              <option value=""> </option>
              <option value="administrateur">administrateur</option>
              <option value="redacteur">redacteur</option>
              <option value="photographe">photographe</option>
            </select>
          </div>

          <div className="flex flex-col mt-20 gap-5">
            <Button
              label="Sauvegarder"
              bgprimary="bg-green-600"
              type="submit"
              height="h-14"
            />

            <Button
              label="Fermer"
              bgprimary="bg-red-500"
              onClick={closeModal}
              height="h-14"
            />
          </div>
        </form>
      </Modal>
      {user.role === "administrateur" ? (
        data.map((utilisateur) => (
          <div key={utilisateur.id}>
            <CardUser data={utilisateur} />
          </div>
        ))
      ) : (
        <div>Pas le droit</div>
      )}
    </section>
  );
}
