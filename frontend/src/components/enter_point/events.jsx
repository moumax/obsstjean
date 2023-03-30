// eslint-disable-next-line no-unused-vars
import useSWR, { useSWRConfig } from "swr";
import eventAPI from "../../services/axiosAPI";
import CardEvent from "../administration/CardEvent";

export default function EventsList() {
  const fetcher = async () => {
    const response = await eventAPI.get("http://localhost:5000/api/events");
    const sortedEvents = response.data.sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    return sortedEvents;
  };
  const { data } = useSWR("events", fetcher);
  if (!data) return <h2>Loading...</h2>;

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
