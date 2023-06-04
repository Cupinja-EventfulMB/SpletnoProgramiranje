import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import Button from "../../components/form/Button";
import axios from "axios";
import { useState } from "react";
import useEditInstitutionsModal from "./hooks/useEditInstitutionsModal";
import EditInstitutionsModal from "./modals/EditInstitutionsModal";

const InstitutionCard = ({ institution, onDelete }) => {
  const editInstitutionModal = useEditInstitutionsModal();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = () => {
    axios .delete(`http://localhost:3001/api/institution/${institution._id}`)
      .then((response) => {
        console.log("Institution deleted successfully");
        onDelete(institution._id); 
      })
      .catch((error) => {
        console.error("Error deleting institution", error);
      });
  };

  const handleEdit = () => {
    editInstitutionModal.setInstitution(institution); // Set the user being edited
    setIsModalOpen(true);
  };

  if (!institution) return <div>Loading...</div>;
  return (
    <div className="w-full bg-white flex flex-row justify-between h-20 items-center px-8">
      <div className="flex flex-col">
        <p className="text-gray-500 text-sm">{institution.name}</p>
        <p className="text-gray-500 text-sm">{institution.email}</p>
      </div>
      <div className="flex flex-col">
        <p className="text-gray-500 text-sm"></p>
        <p className="text-gray-500 text-sm"></p>
      </div>
      <div className="flex flex-col">
        <p className="text-gray-500 text-sm"></p>
        <img src={institution.image} alt="" />
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
        <EditInstitutionsModal
          institution={editInstitutionModal.institution}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default InstitutionCard;