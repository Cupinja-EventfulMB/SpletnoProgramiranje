import { AiFillEdit, AiFillDelete } from "react-icons/ai";

const EventCard = ({ event }) => {
  if (!event) return <div>Loading...</div>;
  return (
    <div className="w-full bg-white flex flex-row justify-between h-20 items-center px-8">
      <div className="flex flex-col">
        <p className="text-gray-500 text-sm">{event.title}</p>
        <p className="text-gray-500 text-sm">institution</p>
      </div>
      <div className="flex flex-col">
        <p className="text-gray-500 text-sm">location</p>
        <p className="text-gray-500 text-sm">going</p>
      </div>
      <div className="flex flex-col">
        <p className="text-gray-500 text-sm">interested</p>
        <p className="text-gray-500 text-sm">{event.date}</p>
      </div>
      <div className="flex flex-row cursor-pointer">
        <div className="flex flex-col" onClick={() => console.log("edit")}>
          <AiFillEdit size={32} />
        </div>
        <div className="flex flex-col" onClick={() => console.log("edit")}>
          <AiFillDelete size={32} />
        </div>
      </div>
    </div>
  );
};

export default EventCard;
