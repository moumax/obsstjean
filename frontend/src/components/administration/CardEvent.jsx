import { useState, useContext, useReducer } from "react";
import Modal from "react-modal";
import { useSWRConfig } from "swr";
import Moment from "react-moment";
import "moment/locale/fr";
import { toast } from "react-toastify";
import eventsReducer from "../../reducers/eventsReducer";
import axiosAPI from "../../services/axiosAPI";
import CurrentUserContext from "../../contexts/userContext";

import editEvent from "../../assets/administration/editEvent.svg";
import eraseEvent from "../../assets/administration/deleteEvent.svg";
import Button from "../assets/Button";

function CardEvent({ data }) {
  const [modalIsOpen, setIsOpen] = useState(false);

  const initialState = {
    title: data.title,
    description: data.description,
    site: data.site,
    date: data.date,
  };

  const [eventForm, eventFormDispatch] = useReducer(
    eventsReducer,
    initialState
  );
  // eslint-disable-next-line no-unused-vars
  const [userId, setUserId] = useState(data.userId);
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
      await axiosAPI.put(`http://localhost:5000/api/events/${data.id}`, {
        title: eventForm.title,
        description: eventForm.description,
        date: eventForm.date,
        site: eventForm.site,
        userId,
      });
      mutate("events");
      closeModal();
      toast.success("Evènement mis à jour avec succès");
    } catch (error) {
      if (!eventForm.title) {
        toast.error('Le champ "Titre" est vide !');
      }
      if (!eventForm.description) {
        toast.error('Le champ "description" est vide !');
      }
      if (!eventForm.date) {
        toast.error('Le champ "Date" est vide !');
      }
      if (!eventForm.site) {
        toast.error('Le champ "Site" est vide !');
      }
      if (!userId) {
        toast.error('Le champ "UserId" est vide !');
      }
    }
  };
  const deleteEvent = async () => {
    await axiosAPI.delete(`http://localhost:5000/api/events/${data.id}`);
    mutate("events");
    toast.success(`L'évènement ${data.title} a été supprimé`);
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

  const dateFunction = (e) => {
    const date = new Date(e.target.value);

    eventFormDispatch({
      type: "DATE",
      payload: date.toISOString(e.target.value),
    });
  };

  return (
    <div className="w-96 flex flex-col items-center ">
      <div className="w-[90vw] mb-5">
        <div className="flex flex-col items-center bg-white/10 rounded-t-xl">
          <p className="text-white opacity-50 text-xs px-5 pt-3 self-start">
            <Moment locale="fr" format="LL">
              {data.date}
            </Moment>
          </p>
          <h3 className="text-yellow-300 self-end px-5 pb-3">{data.title}</h3>
        </div>
        <div className="bg-white/5 px-5 rounded-b-xl shadow-xl">
          <p className="text-white opacity-50 text-xs pt-2 break-words">
            {data.description}
          </p>
          <div className="flex justify-between pt-10 pb-2">
            <p className="text-white opacity-70 text-xs">A quel endroit ?</p>
            <p className="text-white opacity-70 text-xs">{data.site}</p>
          </div>
          {user && currentPage !== "/" && (
            <div className="flex gap-2 justify-end pt-4 pb-2">
              <button type="submit" onClick={() => openModalModify()}>
                <img
                  className="w-[8vw]"
                  src={editEvent}
                  alt="Editer un évènement"
                />
                <span />
              </button>
              <button
                type="submit"
                onClick={() => deleteEvent()}
                className="w-[8vw]"
              >
                <img src={eraseEvent} alt="Supprimer un évènement" />
                <span />
              </button>
            </div>
          )}
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
          style={modalStyle}
        >
          <h2 className="text-center text-white text-2xl">
            Modifier un évènement
          </h2>
          <div className="m-1 mt-5">
            <label htmlFor="title" className="font-bold text-slate-300">
              Titre
            </label>
            <input
              id="title"
              type="text"
              className="text-xs w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Titre"
              value={eventForm.title}
              onChange={(e) =>
                eventFormDispatch({
                  type: "TITLE",
                  payload: e.target.value,
                })
              }
            />
          </div>
          <div className="m-1">
            <label htmlFor="description" className="font-bold text-slate-300">
              Description
            </label>
            <textarea
              id="description"
              type="text"
              className="text-xs w-full h-40 py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Description"
              value={eventForm.description}
              onChange={(e) =>
                eventFormDispatch({
                  type: "DESCRIPTION",
                  payload: e.target.value,
                })
              }
            />
          </div>
          <div className="m-1">
            <label htmlFor="date" className="font-bold text-slate-300">
              Date
            </label>
            <input
              id="date"
              type="date"
              className="text-xs w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="date"
              value={eventForm.date.slice(0, 10)}
              onChange={dateFunction}
            />
          </div>
          <div className="m-1">
            <label htmlFor="site" className="font-bold text-slate-300">
              Site
            </label>
            <input
              id="site"
              type="text"
              className="text-xs w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Site"
              value={eventForm.site}
              onChange={(e) =>
                eventFormDispatch({
                  type: "SITE",
                  payload: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col absolute bottom-0 right-0 items-center">
            <Button
              label="Sauvegarder"
              bgprimary="bg-green-600"
              onClick={modifyEvent}
              height="h-10"
            />

            <Button
              label="Fermer"
              bgprimary="bg-red-500"
              onClick={closeModal}
              height="h-10"
            />
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default CardEvent;
