// eslint-disable-next-line no-unused-vars
import useSWR, { useSWRConfig } from "swr";
import axios from "axios";
// import eventAPI from "../../services/eventAPI";
import CardEvent from "./cardEvent";

export default function EventsList() {
  // const { mutate } = useSWRConfig();
  const fetcher = async () => {
    const response = await axios.get("http://localhost:5000/api/events");
    return response.data;
  };
  const { data } = useSWR("events", fetcher);
  if (!data) return <h2>Loading...</h2>;

  return (
    <section className="w-[90vw] mt-10 flex flex-col items-center ">
      <h2 className="bg-red-50 mb-5">Calendrier des évènements</h2>
      {data.map((event) => (
        <div key={event.id}>
          <CardEvent data={event} />
        </div>
      ))}
    </section>
  );
}
