const cardEvent = ({ data }) => {
  return (
    <div className="w-96 flex flex-col items-center bg-red-200">
      <img className="w-fit rounded-xl" src={data.image} alt={data.alt} />
      <h3>{data.title}</h3>
      <p className="w-fit text-center">{data.textFr}</p>
    </div>
  );
};

export default cardEvent;
