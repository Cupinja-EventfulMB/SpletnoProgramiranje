import { BsCalendar4Week } from "react-icons/bs";
import Button from "../form/Button";
import useEventPopup from "hooks/useEventPopup";

const EventCard = ({ event }) => {
  const eventPopup = useEventPopup();
  return (
    <div className="relative shadow-md rounded-2xl w-96 h-36 bg-white hover:shadow-l transition duration-200 group hover:scale-105">
      <img
        src={event.image}
        alt=""
        className="object-cover object-center w-full h-full aboslute rounded-2xl"
      />
      <div className="px-4 py-[8px] absolute w-full bottom-0 gap-2 left-0 bg-white rounded-2xl z-10 flex flex-col group-hover:bg-rose-500 group-hover:text-white transition druation-200">
        <h3 className="font-semibold">{event.title}</h3>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <BsCalendar4Week className="text-gray-400 group-hover:text-white mr-2" />
            <p className="text-gray-400 text-sm group-hover:text-white">
              {event.date}
            </p>
            <div className="flex items-center ml-2">
              {event.category.map((category, index) => (
                <div
                  key={index}
                  className="w-auto h-3 px-2 rounded-full bg-white text-black flex items-center justify-center text-xs font-semibold"
                  style={{ marginLeft: index !== 0 ? "4px" : "0" }}
                >
                  {category}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <Button
            title={"Info"}
            small
            action={() => {
              eventPopup.setEvent(event);
              eventPopup.onOpen();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default EventCard;