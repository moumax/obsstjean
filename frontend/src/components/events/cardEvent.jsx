const cardEvent = (event) => {
  // console.log(data)
  return (
    <div className="w-96 flex flex-col items-center ">
      <div className="w-[90vw] border-solid border-2 border-yellow-300 p-3 rounded-xl mb-5">
        <h3 className="text-white opacity-70">{event.data.title}</h3>
        <p className="text-white opacity-50 text-xs">
          {event.data.description}
        </p>
        <p className="text-white opacity-50 text-xs">{event.data.date}</p>
        <p className="text-white opacity-70">{event.data.site}</p>
      </div>
    </div>
  );
};

export default cardEvent;
