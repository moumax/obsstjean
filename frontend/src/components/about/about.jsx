/* eslint-disable import/no-absolute-path */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import CardAbout from "./cardAbout";
import datasAbout from "/src/datas/datasAbout.js";

export default function About() {
  return (
    <section className="w-[90vw] mt-10 flex flex-col items-center">
      <h2 className="font-exo2 text-xl text-white pb-4">Nos activités</h2>
      <div className="flex flex-wrap justify-center w-full">
        {datasAbout.map((data) => (
          <CardAbout data={data} key={data.id} />
        ))}
      </div>
    </section>
  );
}
