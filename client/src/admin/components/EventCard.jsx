import { useState } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import Button from "../../components/form/Button";
import axios from "axios";
import useEditEventsModal from "./hooks/useEditEventsModal";
import EditEventsModal from "./modals/EditEventsModal";

const EventCard = ({ event, onDelete }) => {
  const editEventModal = useEditEventsModal();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = () => {
    axios .delete(`http://localhost:3001/api/event/${event._id}`)
      .then((response) => {
        console.log("User deleted successfully");
        onDelete(event._id); 
      })
      .catch((error) => {
        console.error("Error deleting user", error);
      });
  };

  const handleEdit = () => {
    editEventModal.setEvent(event); 
    setIsModalOpen(true);
  };

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
        <div className="flex flex-col" onClick={handleEdit}>
          <AiFillEdit size={32} />
        </div>
        <div className="flex flex-col" onClick={handleDelete}>
          <AiFillDelete size={32} />
        </div>
      </div>
      {isModalOpen && (
        <EditEventsModal
          event={editEventModal.event}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default EventCard;
