// eslint-disable-next-line no-unused-vars
import MoonLoader from "react-spinners/MoonLoader";
import useSWR from "swr";
import axiosAPI from "../../services/axiosAPI";
import CardEvent from "../administration/CardEvent";
import sortedByDate from "../../utils/date";

export default function EventsList() {
  const getEvents = async () => {
    const response = await axiosAPI.get("http://localhost:5000/api/events");
    return sortedByDate(response.data);
  };

  const { data } = useSWR("events", getEvents);
  if (!data)
    return (
      <h2>
        <MoonLoader
          color="#36d7b7"
          size={60}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </h2>
    );

  return (
    <section className="w-[90vw] mt-10 flex flex-col items-center">
      <h2 className="font-exo2 text-xl text-white pb-4">
        Calendrier des évènements
      </h2>
      {data.map((event) => (
        <div key={event.id}>
          <CardEvent data={event} />
        </div>
      ))}
    </section>
  );
}
