import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import useSWR, { useSWRConfig } from "swr";
import Modal from "react-modal";
import axios from "axios";
import CardEventAdmin from "../../components/events/cardEventAdmin";
// import eventAPI from "../../services/eventAPI";

Modal.setAppElement("#root");

export default function Administration() {
  const [event, setEvent] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [site, setSite] = useState("");
  const [userId, setUserId] = useState(0);

  const navigate = useNavigate();

  let subtitle;

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const afterOpenModal = () => {
    subtitle.style.color = "#f00";
  };

  const openModalAdd = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const fetcher = async () => {
    const response = await axios.get("http://localhost:5000/api/events");
    setEvent(response.data);
    return response.data;
  };
  const { data } = useSWR("events", fetcher);
  if (!data) return <h2>Loading...</h2>;

  const { mutate } = useSWRConfig();

  const saveEvent = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/events", {
      title,
      description,
      date,
      site,
      userId,
    });
    mutate("events");
    closeModal();
  };

  return (
    <section>
      <section className="w-[90vw] mt-10 flex flex-col items-center ">
        <h2 className="bg-red-50 mb-5">Calendrier des évènements</h2>
        <button type="button" onClick={openModalAdd}>
          Ajouter un évènement
        </button>

        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
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
            onClick={saveEvent}
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
            <CardEventAdmin data={events} />
          </div>
        ))}

        <button type="button" onClick={() => navigate("/")}>
          Retouner à la page principale
        </button>
      </section>
    </section>
  );
}