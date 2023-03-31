import { useState, useContext } from "react";
import Modal from "react-modal";
import { useSWRConfig } from "swr";
import Moment from "react-moment";
import "moment/locale/fr";
import { toast } from "react-toastify";
import axiosAPI from "../../services/axiosAPI";
import CurrentUserContext from "../../contexts/userContext";

import editButton from "../../assets/administration/edit.svg";
import deleteButton from "../../assets/administration/delete.svg";

const cardEvent = (event) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState(event.data.title);
  const [description, setDescription] = useState(event.data.description);
  const [date, setDate] = useState(event.data.date);
  const [site, setSite] = useState(event.data.site);
  const [userId, setUserId] = useState(event.data.userId);
  const { user } = useContext(CurrentUserContext);
  const { mutate } = useSWRConfig();

  const openModalModify = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const modifyEvent = async (e) => {
    e.preventDefault();
    try {
      await axiosAPI.put(`http://localhost:5000/api/events/${event.data.id}`, {
        title,
        description,
        date,
        site,
        userId,
      });
      mutate("events");
      closeModal();
      toast.success("Evènement mis à jour avec succès");
    } catch (error) {
      toast.error("Erreur dans le formulaire !!!");
    }
  };

  const deleteEvent = async () => {
    await axiosAPI.delete(`http://localhost:5000/api/events/${event.data.id}`);
    mutate("events");
    toast.success(`L'évènement ${event.data.title} a été supprimé`);
  };

  const currentPage = window.location.pathname;

  return (
    <div className="w-96 flex flex-col items-center ">
      <div className="w-[90vw] mb-5">
        <div className="flex flex-col items-center bg-white/10 rounded-t-xl">
          <p className="text-white opacity-50 text-xs px-5 pt-3 self-start">
            <Moment locale="fr" format="LL">
              {event.data.date}
            </Moment>
          </p>
          <h3 className="text-yellow-300 self-end px-5 pb-3">
            {event.data.title}
          </h3>
        </div>
        <div className="bg-white/5 px-5 rounded-b-xl shadow-xl">
          <p className="text-white opacity-50 text-xs pt-2">
            {event.data.description}
          </p>
          <div className="flex justify-between pt-10 pb-2">
            <p className="text-white opacity-70 text-xs">A quel endroit ?</p>
            <p className="text-white opacity-70 text-xs">{event.data.site}</p>
          </div>
          {user && currentPage !== "/" && (
            <div className="flex gap-2 justify-end pt-4">
              <button type="submit" onClick={() => openModalModify()}>
                <img
                  className="w-[8vw]"
                  src={editButton}
                  alt="Editer un évènement"
                />
                <span />
              </button>
              <button
                type="submit"
                onClick={() => deleteEvent()}
                className="w-[8vw]"
              >
                <img src={deleteButton} alt="Supprimer un évènement" />
                <span />
              </button>
            </div>
          )}
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
        >
          <h2>Modifier un évènement</h2>

          <div className="mb-5">
            <label htmlFor="title" className="font-bold text-slate-700">
              Titre
            </label>
            <input
              id="title"
              type="text"
              className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Titre"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="description" className="font-bold text-slate-700">
              Description
            </label>
            <input
              id="description"
              type="text"
              className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="date" className="font-bold text-slate-700">
              Date
            </label>
            <input
              id="date"
              type="text"
              className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="site" className="font-bold text-slate-700">
              Site
            </label>
            <input
              id="site"
              type="text"
              className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Site"
              value={site}
              onChange={(e) => setSite(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="userId" className="font-bold text-slate-700">
              Id utilisateur
            </label>
            <input
              id="userId"
              type="text"
              className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Id utilisateur"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
          <button
            onClick={modifyEvent}
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
};

export default cardEvent;
