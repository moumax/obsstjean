import CardAbout from "./cardAbout";
import datasAbout from "../../datas/datasAbout";
import Titles from "@components/utils/titles";

export default function About() {
  return (
    <section className="w-[90vw] mt-10 flex flex-col items-center">
      <Titles color="text-white" size="text-4xl" text="Nos activités" />
      <div className="flex flex-wrap justify-center w-full">
        {datasAbout.map((data) => (
          <CardAbout data={data} key={data.id} />
        ))}
      </div>
    </section>
  );
}
