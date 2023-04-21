// eslint-disable-next-line no-unused-vars
import useSWR, { useSWRConfig } from "swr";
import axiosAPI from "../../services/axiosAPI";
import CardEvent from "../administration/CardEvent";

export default function EventsList() {
  const fetcher = async () => {
    const response = await axiosAPI.get("http://localhost:5000/api/events");
    const now = new Date();
    const sortedEvents = response.data.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (dateA < now && dateB < now) {
        return dateA - dateB;
      }
      if (dateA < now) {
        return 1;
      }
      if (dateB < now) {
        return -1;
      }
      return dateA - dateB;
    });
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
