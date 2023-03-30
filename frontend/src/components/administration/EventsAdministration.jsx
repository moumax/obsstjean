import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import useSWR, { useSWRConfig } from "swr";
import Modal from "react-modal";
import { toast } from "react-toastify";
import CardEvent from "../events/cardEvent";
import eventAPI from "../../services/eventAPI";
// import Button from "../assets/Button";

import addButton from "../../assets/adminitration/add.svg";

Modal.setAppElement("#root");

export default function EventsAdministration() {
  const [event, setEvent] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [site, setSite] = useState("");
  const [userId, setUserId] = useState(0);

  const openModalAdd = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const fetcherEvent = async () => {
    const response = await eventAPI.get("http://localhost:5000/api/events");
    setEvent(response.data);
    return response.data;
  };
  const { data } = useSWR("events", fetcherEvent);
  if (!data) return <h2>Loading...</h2>;

  const { mutate } = useSWRConfig();

  const createEvent = async (e) => {
    e.preventDefault();
    try {
      await eventAPI.post("http://localhost:5000/api/events", {
        title,
        description,
        date,
        site,
        userId,
      });
      mutate("events");
      closeModal();
      toast.success("Nouvel évènement crée avec succès");
    } catch (error) {
      if (!title) {
        toast.error('Le champ "Titre" est vide !');
      }
      if (!description) {
        toast.error('Le champ "description" est vide !');
      }
      if (!date) {
        toast.error('Le champ "Date" est vide !');
      }
      if (!site) {
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
        <img className="w-[15vw]" src={addButton} alt="add an event" />
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
