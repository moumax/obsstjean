import { useState } from "react";
import Modal from "react-modal";
import { useSWRConfig } from "swr";
import { toast } from "react-toastify";
import axiosAPI from "../../services/axiosAPI";

import editUser from "../../assets/administration/editUser.svg";
import deleteUserSvg from "../../assets/administration/deleteUser.svg";

function CardUser({ data }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState(data.email);
  const [password, setPassword] = useState(data.password_hash);
  const { mutate } = useSWRConfig();

  const openModalModify = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const modifyUser = async (e) => {
    e.preventDefault();
    try {
      await axiosAPI.put(`http://localhost:5000/api/users/${data.id}`, {
        email,
        password_hash: password,
      });
      mutate("users");
      closeModal();
      toast.success("Utilisateur mis à jour avec succès");
    } catch (error) {
      toast.error("Erreur dans le formulaire !!!");
    }
  };

  const deleteUser = async () => {
    await axiosAPI.delete(`http://localhost:5000/api/users/${data.id}`);
    mutate("users");
    toast.success(`L'utilisateur ${data.email} a été supprimé`);
  };

  const currentPage = window.location.pathname;

  return (
    <div className="flex flex-col items-center">
      <div className="w-[90vw] mb-5 bg-white/10 rounded-xl p-5 font-exo2 shadow-xl">
        <div className=" w-full flex justify-between">
          <div>
            <p className="text-white">Email :</p>
            <h3 className="text-white opacity-70 text-sm pl-3">
              {data.data.email}
            </h3>
            <p className="text-white">Role :</p>
            <h3 className="text-white opacity-70 text-sm pl-3">A définir</h3>
          </div>
          <div className="self-center">
            {data && currentPage !== "/" && (
              <div className="flex gap-2 justify-end pt-4">
                <button type="submit" onClick={() => openModalModify()}>
                  <img
                    className="w-[8vw]"
                    src={editUser}
                    alt="Editer un utilisateur"
                  />
                  <span />
                </button>
                <button
                  type="submit"
                  onClick={() => deleteUser()}
                  className="w-[8vw]"
                >
                  <img src={deleteUserSvg} alt="Supprimer un utilisateur" />
                  <span />
                </button>
              </div>
            )}
          </div>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
        >
          <h2>Modifier un utilisateur</h2>

          <div className="mb-5">
            <label htmlFor="email" className="font-bold text-slate-700">
              Email
            </label>
            <input
              id="email"
              type="text"
              className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="font-bold text-slate-700">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            onClick={modifyUser}
            type="submit"
            className="w-full py-3 font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow"
          >
            Sauvegarder
          </button>

          <button type="button" onClick={closeModal}>
            close
          </button>
        </Modal>
      </div>
    </div>
  );
}

export default CardUser;
