import { useState } from "react";
import Modal from "react-modal";
import { useSWRConfig } from "swr";
import axios from "axios";

const cardEventAdmin = (event) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState(event.data.title);
  const [description, setDescription] = useState(event.data.description);
  const [date, setDate] = useState(event.data.date);
  const [site, setSite] = useState(event.data.site);
  const [userId, setUserId] = useState(event.data.userId);

  let subtitle;

  const afterOpenModal = () => {
    subtitle.style.color = "#f00";
  };

  const openModalModify = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const { mutate } = useSWRConfig();

  const saveEvent = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/api/events/${event.data.id}`, {
      title,
      description,
      date,
      site,
      userId,
    });
    mutate("events");
    closeModal();
  };

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

  const deleteEvent = async () => {
    await axios.delete(`http://localhost:5000/api/events/${event.data.id}`);
    mutate("events");
  };

  return (
    <div className="w-96 flex flex-col items-center ">
      <div className="w-[90vw] border-solid border-2 border-slate-300 p-3 rounded-xl mb-5">
        <h3>{event.data.title}</h3>
        <p>{event.data.description}</p>
        <p>{event.data.date}</p>
        <p>{event.data.site}</p>
        <button
          type="submit"
          onClick={() => openModalModify()}
          className="font-medium bg-green-400 hover:bg-green-500 px-3 py-1 rounded text-white"
        >
          Modifier
        </button>
        <button
          type="submit"
          onClick={() => deleteEvent()}
          className="font-medium bg-red-400 hover:bg-red-500 px-3 py-1 rounded text-white"
        >
          Suppr
        </button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
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
      </div>
    </div>
  );
};

export default cardEventAdmin;
