import Moment from "react-moment";
// import moment from "moment";
import "moment/locale/fr";

const cardEvent = (event) => {
  return (
    <div className="w-96 flex flex-col items-center ">
      <div className="w-[90vw] border-solid border-2 border-yellow-300 p-3 rounded-xl mb-5">
        <div className="flex justify-between items-center">
          <p className="text-white opacity-50 text-xs pb-10">
            <Moment locale="fr" format="LL">
              {event.data.date}
            </Moment>
          </p>
          <h3 className="text-white opacity-70 text-sm">{event.data.title}</h3>
        </div>
        <p className="text-white opacity-50 text-xs">
          {event.data.description}
        </p>

        <div className="flex justify-between pt-10">
          <p className="text-white opacity-70 text-xs">A quel endroit ?</p>
          <p className="text-white opacity-70 text-xs">{event.data.site}</p>
        </div>
      </div>
    </div>
  );
};

export default cardEvent;
