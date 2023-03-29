import { useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { useSWRConfig } from "swr";
import Button from "../assets/Button";
import userAPI from "../../services/userAPI";

import Users from "../users/Users";

Modal.setAppElement("#root");

export default function UsersAdministration() {
  // const [user, setUser] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const { mutate } = useSWRConfig();

  const createUser = async (e) => {
    e.preventDefault();
    try {
      await userAPI.post("http://localhost:5000/api/users", {
        email,
        password_hash: password,
      });
      mutate("users");
      closeModal();
      toast.success("Nouvel évènement crée avec succès");
    } catch (error) {
      if (!email) {
        toast.error('Le champ "Email" est vide !');
      }
      if (!password) {
        toast.error('Le champ "password" est vide !');
      }
    }
  };
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        // style={customStyles}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="password_hash" className="font-bold text-slate-700">
            Mot de passe
          </label>
          <input
            id="password_hash"
            type="text"
            className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
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
      <div className="flex self-end py-4">
        <Button
          label="Créer un utilisateur"
          bgprimary="bg-blue-600"
          onClick={() => openModal()}
        />
      </div>
      <Users />
    </>
  );
}
