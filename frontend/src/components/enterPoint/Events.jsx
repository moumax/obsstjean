// eslint-disable-next-line no-unused-vars
import { useState, useEffect } from "react";
// import useSWR, { useSWRConfig } from "swr";
import axiosAPI from "../../services/axiosAPI";
import CardEvent from "../administration/CardEvent";

export default function EventsList() {
  const [events, setEvents] = useState([]);

  const baseURLevents = "http://localhost:5000/api/events";

  function sorterByDate(tab) {
    const now = new Date();
    const sortedTab = tab.sort((a, b) => {
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
    return sortedTab;
  }

  useEffect(() => {
    axiosAPI
      .get(baseURLevents)
      .then((response) => {
        setEvents(sorterByDate(response.data));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <section className="w-[90vw] mt-10 flex flex-col items-center">
      <h2 className="font-exo2 text-xl text-white pb-4">
        Calendrier des évènements
      </h2>
      {events.map((event) => (
        <div key={event.id}>
          <CardEvent data={event} />
        </div>
      ))}
    </section>
  );
}
