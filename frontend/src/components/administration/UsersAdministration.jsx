import { useReducer, useState } from "react";
import Modal from "react-modal";
// import { toast } from "react-toastify";
import useSWR, { mutate } from "swr";
import { MoonLoader } from "react-spinners";
import Button from "../assets/Button";
import usersReducer from "../../reducers/usersReducer";
import CardUser from "./CardUser";
import addUser from "../../assets/administration/addUser.svg";
import axiosAPI from "../../services/axiosAPI";
import fetcher from "../../api/fetcher";

Modal.setAppElement("#root");

export default function UsersAdministration() {
  const [modalIsOpen, setIsOpen] = useState(false);

  const role = JSON.parse(localStorage.getItem("role"));

  const initialState = {
    email: "",
    password: "",
    role: "",
  };

  const [userForm, userFormDispatch] = useReducer(usersReducer, initialState);

  const { data, error } = useSWR("http://localhost:5000/api/users", fetcher);

  if (error) return <div>Une erreur est survenue : {error.message}</div>;
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
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  async function createUser(user) {
    const response = await axiosAPI.post(
      "http://localhost:5000/api/users",
      user
    );
    return response.data;
  }

  function handleSubmit(e) {
    e.preventDefault();
    createUser({
      email: userForm.email,
      password_hash: userForm.password,
      role: userForm.role,
    }).then(() => {
      closeModal();
      mutate("http://localhost:5000/api/users");
    });
  }

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
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <option value="" />
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
      {role === "administrateur" &&
        data.map((user) => (
          <div key={user.id}>
            <CardUser data={user} />
          </div>
        ))}
    </section>
  );
}
