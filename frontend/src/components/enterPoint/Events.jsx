// eslint-disable-next-line no-unused-vars
import MoonLoader from "react-spinners/MoonLoader";
import useSWR from "swr";
import CardEvent from "../administration/CardEvent";
import sortedByDate from "../../utils/date";
import fetcher from "../../api/fetcher";

export default function EventsList() {
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

  return (
    <section className="w-[90vw] mt-10 flex flex-col items-center">
      <h2 className="font-exo2 text-xl text-white pb-4">
        Calendrier des évènements
      </h2>
      {sortedByDate(data).map((event) => (
        <div key={event.id}>
          <CardEvent data={event} />
        </div>
      ))}
    </section>
  );
}
