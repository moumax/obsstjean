import { useReducer, useState } from "react";
import Modal from "react-modal";
import { useSWRConfig } from "swr";
import { toast } from "react-toastify";
import usersReducer from "../../reducers/usersReducer";
import editUser from "../../assets/administration/editUser.svg";
import deleteUserSvg from "../../assets/administration/deleteUser.svg";
import Button from "../assets/Button";
import fetcher from "../../api/fetcher";

function CardUser({ data }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);
  const { mutate } = useSWRConfig();

  const initialState = {
    email: data.email,
    password: data.password_hash,
    role: data.role,
  };

  const [userForm, userFormDispatch] = useReducer(usersReducer, initialState);

  const openModalModify = () => {
    setIsOpen(true);
  };

  const openModalDelete = () => {
    setModalDeleteIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const closeModalDelete = () => {
    setModalDeleteIsOpen(false);
  };

  const modifyUser = async (evt) => {
    evt.preventDefault();
    try {
      await fetcher(`http://localhost:5000/api/users/${data.id}`, "PUT", {
        email: userForm.email,
        password_hash: userForm.password,
        role: userForm.role,
      });
      mutate("http://localhost:5000/api/users");
      toast.success("Utilisateur mis à jour avec succès");
      closeModal();
    } catch (err) {
      toast.error("Erreur dans le formulaire !!!");
    }
  };

  const deleteUser = async () => {
    try {
      await fetcher(`http://localhost:5000/api/users/${data.id}`, "DELETE");
      mutate("http://localhost:5000/api/users");
      closeModal();
      toast.success(`L'utilisateur ${data.email} a été supprimé`);
    } catch (err) {
      toast.error("Impossible de supprimer l'utilisateur");
    }
  };

  const currentPage = window.location.pathname;

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
    <div className="flex flex-col items-center">
      <div className="w-[90vw] mb-5 bg-white/10 rounded-xl p-5 font-exo2 shadow-xl">
        <div className=" w-full flex justify-between">
          <div>
            <p className="text-white">Email :</p>
            <h3 className="text-white opacity-70 text-sm pl-3">{data.email}</h3>
            <p className="text-white">Role :</p>
            <h3 className="text-white opacity-70 text-sm pl-3">{data.role}</h3>
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
                  onClick={() => openModalDelete()}
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
          style={modalStyle}
        >
          <h2 className="text-center text-white text-2xl">
            Modifier un utilisateur
          </h2>

          <div className="m-1 mt-5">
            <label htmlFor="email" className="font-bold text-slate-300">
              Email
            </label>
            <input
              id="email"
              type="text"
              className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Email"
              value={userForm.email}
              onChange={(e) =>
                userFormDispatch({
                  type: "EMAIL",
                  payload: e.target.value,
                })
              }
            />
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="font-bold text-slate-300">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Password"
              value={userForm.password}
              onChange={(e) =>
                userFormDispatch({
                  type: "PASSWORD",
                  payload: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-row absolute bottom-3 right-0 justify-between w-full px-4">
            <Button
              label="Modifier"
              bgprimary="bg-red-600"
              onClick={modifyUser}
              height="h-10"
            />

            <Button
              label="Annuler"
              bgprimary="bg-green-600"
              onClick={closeModal}
              height="h-10"
            />
          </div>
        </Modal>
        <Modal
          isOpen={modalDeleteIsOpen}
          onRequestClose={closeModalDelete}
          contentLabel="Example Modal"
          style={modalStyle}
        >
          <h2 className="text-center text-white text-2xl">
            Supprimer cet utilisateur
          </h2>

          <div className="m-1 mt-5 flex flex-col">
            <label htmlFor="email" className="font-bold text-slate-300">
              Email :
            </label>
            <p className="text-white self-end">{userForm.email}</p>
            <label htmlFor="role" className="font-bold text-slate-300">
              Role :
            </label>
            <p className="text-white self-end">{userForm.role}</p>
          </div>
          <div className="flex flex-row absolute bottom-3 right-0 justify-between w-full px-4">
            <Button
              label="Supprimer"
              bgprimary="bg-red-600"
              onClick={deleteUser}
              height="h-10"
            />

            <Button
              label="Annuler"
              bgprimary="bg-green-600"
              onClick={closeModalDelete}
              height="h-10"
            />
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default CardUser;
