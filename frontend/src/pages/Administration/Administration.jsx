// import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import useSWR, { useSWRConfig } from "swr";
import axios from "axios";
import CardEventAdmin from "../../components/events/cardEventAdmin";
// import eventAPI from "../../services/eventAPI";

export default function Administration() {
  const fetcher = async () => {
    const response = await axios.get("http://localhost:5000/api/events");
    return response.data;
  };
  const { data } = useSWR("events", fetcher);
  if (!data) return <h2>Loading...</h2>;

  return (
    <section>
      <section className="w-[90vw] mt-10 flex flex-col items-center ">
        <h2 className="bg-red-50 mb-5">Calendrier des évènements</h2>
        {data.map((event) => (
          <div key={event.id}>
            <CardEventAdmin data={event} />
          </div>
        ))}
      </section>
    </section>
  );
}
