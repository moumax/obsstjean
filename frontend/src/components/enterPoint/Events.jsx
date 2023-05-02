// eslint-disable-next-line no-unused-vars
import MoonLoader from "react-spinners/MoonLoader";
import useSWR from "swr";
import Titles from "../utils/Titles";
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
      <Titles
        color="text-white"
        size="text-2xl"
        text="Calendrier des évènements"
      />
      {sortedByDate(data).map((event) => (
        <div key={event.id}>
          <CardEvent data={event} />
        </div>
      ))}
    </section>
  );
}
