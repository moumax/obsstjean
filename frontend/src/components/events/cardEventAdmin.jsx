import axios from "axios";
import { useSWRConfig } from "swr";

const cardEventAdmin = (event) => {
  const { mutate } = useSWRConfig();
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
          onClick={() => deleteEvent()}
          className="font-medium bg-red-400 hover:bg-red-500 px-3 py-1 rounded text-white"
        >
          {" "}
          Suppr
        </button>
      </div>
    </div>
  );
};

export default cardEventAdmin;
