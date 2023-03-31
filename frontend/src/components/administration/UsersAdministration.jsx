import { useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import useSWR from "swr";
import CardUser from "./CardUser";
import addUser from "../../assets/administration/addUser.svg";
import axiosAPI from "../../services/axiosAPI";

Modal.setAppElement("#root");

export default function UsersAdministration() {
  const [user, setUser] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        email,
        password_hash: password,
      });
      mutate("users");
      closeModal();
      toast.success("Nouvel utilisateur crée avec succès");
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
            type="password"
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
      {user.map((users) => (
        <div key={users.id}>
          <CardUser data={users} />
        </div>
      ))}
    </section>
  );
}
