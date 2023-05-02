import SubTitles from "@components/utils/subtitles";

const cardAbout = ({ data }) => {
  return (
    <div className="w-96 flex flex-col items-center pt-5 font-exo2">
      <img className="w-fit rounded-xl pb-2" src={data.image} alt={data.alt} />
      <SubTitles size="text-xs" color="text-white" text={data.title} />
      <p className="w-fit text-center text-white text-xs opacity-40">
        {data.textFr}
      </p>
    </div>
  );
};

export default cardAbout;
