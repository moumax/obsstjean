import React, { useState, useEffect } from "react";
import eventAPI from "../../services/eventAPI";
import CardEvent from "./cardEvent";

export default function Events() {
  const [event, setEvent] = useState([]);

  useEffect(() => {
    eventAPI.get("/api/events").then((response) => {
      setEvent(
        response.data.events.map((data) => {
          return { ...data };
        })
      );
    });
  }, [setEvent]);

  return (
    <section className="w-[90vw] mt-10 flex flex-col items-center ">
      <h2 className="bg-red-50 mb-5">Calendrier des évènements</h2>
      {event.map((data) => (
        <div key={data.id}>
          <CardEvent data={data} />
        </div>
      ))}
    </section>
  );
}
