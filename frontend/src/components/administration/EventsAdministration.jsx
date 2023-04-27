import { MoonLoader } from "react-spinners";
import { useState, useContext, useReducer } from "react";
import useSWR, { mutate } from "swr";
import Modal from "react-modal";
import { toast } from "react-toastify";
import Moment from "moment";
import eventsReducer from "../../reducers/eventsReducer";
import CardEvent from "./CardEvent";
import axiosAPI from "../../services/axiosAPI";
import CurrentUserContext from "../../contexts/userContext";
import sortedByDate from "../../utils/date";
import addEvent from "../../assets/administration/addEvent.svg";
import Button from "../assets/Button";
import fetcher from "../../api/fetcher";

Modal.setAppElement("#root");

export default function EventsAdministration() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { user } = useContext(CurrentUserContext);
  // eslint-disable-next-line no-unused-vars
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

  const { data, error } = useSWR("http://localhost:5000/api/events", fetcher);

  if (error)
    return (
      <div className="text-white">
        Une erreur est survenue : {error.message}
      </div>
    );
  if (!data)
    return (
      <div>
        <MoonLoader
          color="#36d7b7"
          size={60}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );

  const openModalAdd = () => {
    if (user.role === "administrateur" || user.role === "redacteur") {
      setIsOpen(true);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const createEvent = async (e) => {
    e.preventDefault();
    try {
      await axiosAPI.post("http://localhost:5000/api/events", {
        title: eventForm.title,
        description: eventForm.description,
        date: Moment(eventForm.date).toISOString(),
        site: eventForm.site,
        userId,
      });
      closeModal();
      toast.success("Nouvel évènement crée avec succès");
      mutate("events");
    } catch (err) {
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
        style={modalStyle}
      >
        <h2 className="text-center text-white text-2xl">Ajouter un event</h2>

        <div className="m-1 mt-5">
          <label htmlFor="title" className="font-bold text-slate-300">
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
        <div className="m-1">
          <label htmlFor="description" className="font-bold text-slate-300">
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
        <div className="m-1">
          <label htmlFor="date" className="font-bold text-slate-300">
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
        <div className="m-1">
          <label htmlFor="site" className="font-bold text-slate-300">
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
        <div className="flex flex-col mt-10 gap-5">
          <Button
            label="Sauvegarder"
            bgprimary="bg-green-600"
            onClick={createEvent}
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
      {user.role === "administrateur" || user.role === "redacteur" ? (
        sortedByDate(data).map((event) => (
          <div key={event.id}>
            <CardEvent data={event} />
          </div>
        ))
      ) : (
        <div>Pas accès</div>
      )}
    </section>
  );
}
