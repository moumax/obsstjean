const cardAbout = ({ data }) => {
  return (
    <div className="w-96 flex flex-col items-center pt-5 font-exo2">
      <img className="w-fit rounded-xl pb-2" src={data.image} alt={data.alt} />
      <h3 className="text-white text-xs italic opacity-70 pb-2">
        {data.title}
      </h3>
      <p className="w-fit text-center text-white text-xs opacity-40">
        {data.textFr}
      </p>
    </div>
  );
};

export default cardAbout;
