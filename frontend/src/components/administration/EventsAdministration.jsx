import { useState, useContext, useReducer } from "react";
// eslint-disable-next-line no-unused-vars
import useSWR from "swr";
import Modal from "react-modal";
import { toast } from "react-toastify";
import Moment from "moment";
import eventsReducer from "../../reducers/eventsReducer";
import CardEvent from "./CardEvent";
import axiosAPI from "../../services/axiosAPI";
import CurrentUserContext from "../../contexts/userContext";
// import Button from "../assets/Button";

import addEvent from "../../assets/administration/addEvent.svg";

Modal.setAppElement("#root");

export default function EventsAdministration() {
  const [event, setEvent] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const { user } = useContext(CurrentUserContext);
  const [userId, setUserId] = useState(0);

  const initialState = {
    title: "",
    description: "",
    site: "",
    date: "",
  };

  const [eventForm, eventFormDispatch] = useReducer(
    eventsReducer,
    initialState
  );

  const fetcherEvent = async () => {
    const response = await axiosAPI.get("http://localhost:5000/api/events");
    const sortedEvents = response.data.sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    setEvent(sortedEvents);
    return sortedEvents;
  };
  const { data, mutate } = useSWR("events", fetcherEvent);
  if (!data) return <h2>Loading...</h2>;

  const currentUserId = async () => {
    const res = await axiosAPI.get("http://localhost:5000/api/users");
    res.data.map((result) =>
      result.email === user.email ? setUserId(result.id) : null
    );
    return res;
  };

  const openModalAdd = () => {
    currentUserId();
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const createEvent = async (e) => {
    e.preventDefault();
    const newDate = Moment(eventForm.date).toISOString();
    try {
      await axiosAPI.post("http://localhost:5000/api/events", {
        title: eventForm.title,
        description: eventForm.description,
        date: newDate,
        site: eventForm.site,
        userId,
      });
      closeModal();
      toast.success("Nouvel évènement crée avec succès");
      mutate("events");
    } catch (error) {
      if (!eventForm.title) {
        toast.error('Le champ "Titre" est vide !');
      }
      if (!eventForm.description) {
        toast.error('Le champ "description" est vide !');
      }
      if (!newDate) {
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

  return (
    <section className="w-[90vw] mt-10 flex flex-col items-center ">
      <h2 className="text-2xl text-white font-exo2">
        Calendrier des évènements
      </h2>
      <button
        className="self-end pt-6 pb-6"
        type="button"
        onClick={openModalAdd}
      >
        <img className="w-[15vw]" src={addEvent} alt="add an event" />
        <span />
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <h2>Ajouter un event</h2>

        <div className="mb-5">
          <label htmlFor="title" className="font-bold text-slate-700">
            Titre
          </label>
          <input
            id="title"
            type="text"
            className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
            placeholder="Titre"
            value={eventForm.title}
            onChange={(e) =>
              eventFormDispatch({
                type: "VOID_TITLE",
                payload: e.target.value,
              })
            }
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
            value={eventForm.description}
            onChange={(e) =>
              eventFormDispatch({
                type: "VOID_DESCRIPTION",
                payload: e.target.value,
              })
            }
          />
        </div>
        <div className="mb-5">
          <label htmlFor="date" className="font-bold text-slate-700">
            Date
          </label>
          <input
            id="date"
            type="date"
            className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
            placeholder="Date"
            value={eventForm.date}
            onChange={(e) =>
              eventFormDispatch({
                type: "VOID_DATE",
                payload: e.target.value,
              })
            }
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
            value={eventForm.site}
            onChange={(e) =>
              eventFormDispatch({
                type: "VOID_SITE",
                payload: e.target.value,
              })
            }
          />
        </div>
        <button
          onClick={createEvent}
          type="submit"
          className="w-full py-3 font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow"
        >
          Sauvegarder
        </button>

        <button type="button" onClick={closeModal}>
          close
        </button>
      </Modal>

      {event.map((events) => (
        <div key={events.id}>
          <CardEvent data={events} />
        </div>
      ))}
    </section>
  );
}
