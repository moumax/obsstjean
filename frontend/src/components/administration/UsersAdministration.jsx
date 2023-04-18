import { useReducer, useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import useSWR from "swr";
import usersReducer from "../../reducers/usersReducer";
import CardUser from "./CardUser";
import addUser from "../../assets/administration/addUser.svg";
import axiosAPI from "../../services/axiosAPI";

Modal.setAppElement("#root");

export default function UsersAdministration() {
  const [user, setUser] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [role, setRole] = useState("");

  const initialState = {
    email: "",
    password: "",
    role: "",
  };

  const [userForm, userFormDispatch] = useReducer(usersReducer, initialState);

  const openModalAdd = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const fetcherUser = async () => {
    const response = await axiosAPI.get("http://localhost:5000/api/users");
    setUser(response.data);
    return response.data;
  };
  const { data, mutate } = useSWR("users", fetcherUser);
  if (!data) return <h2>Loading...</h2>;

  const createUser = async (e) => {
    e.preventDefault();
    try {
      await axiosAPI.post("http://localhost:5000/api/users", {
        email: userForm.email,
        password_hash: userForm.password,
        role: userForm.role,
      });
      mutate("users");
      closeModal();
      toast.success("Nouvel utilisateur crée avec succès");
    } catch (error) {
      if (!userForm.email) {
        toast.error('Le champ "Email" est vide !');
      }
      if (!userForm.password) {
        toast.error('Le champ "password" est vide !');
      }
      if (!userForm.role) {
        toast.error('Le champ "role" est vide');
      }
    }
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
      >
        <h2>Ajouter un utilisateur</h2>

        <div className="mb-5">
          <label htmlFor="title" className="font-bold text-slate-700">
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
        <div className="mb-5">
          <label htmlFor="password_hash" className="font-bold text-slate-700">
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
        <div className="mb-5">
          <label htmlFor="role-select" className="font-bold text-slate-700">
            Choisissez un rôle:
          </label>

          <select
            name="roles"
            id="role-select"
            value={userForm.role}
            onChange={(e) =>
              userFormDispatch({
                type: "VOID_ROLE",
                payload: e.target.value,
              })
            }
          >
            <option value="">--Liste--</option>
            <option value="administrateur">administrateur</option>
            <option value="redacteur">redacteur</option>
            <option value="photographe">photographe</option>
          </select>
        </div>

        <button
          onClick={createUser}
          type="submit"
          className="w-full py-3 font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow"
        >
          Sauvegarder
        </button>

        <button type="button" onClick={closeModal}>
          close
        </button>
      </Modal>
      {user.map((users) => (
        <div key={users.id}>
          <CardUser data={users} />
        </div>
      ))}
    </section>
  );
}
