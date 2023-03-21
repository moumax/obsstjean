const cardEventAdmin = (event) => {
  // console.log(data)
  return (
    <div className="w-96 flex flex-col items-center ">
      <div className="w-[90vw] border-solid border-2 border-slate-300 p-3 rounded-xl mb-5">
        <h3>{event.data.title}</h3>
        <p>{event.data.description}</p>
        <p>{event.data.date}</p>
        <p>{event.data.site}</p>
      </div>
    </div>
  );
};

export default cardEventAdmin;
