import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import Button from "../../components/form/Button";
import axios from "axios";
import { useState } from "react";

const InstitutionCard = ({ institution, onDelete }) => {
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
        <div className="flex flex-col" onClick={() => console.log("edit")}>
          <AiFillEdit size={32} />
        </div>
        <div className="flex flex-col" onClick={handleDelete}>
          <AiFillDelete size={32} />
        </div>
      </div>
    </div>
  );
};

export default InstitutionCard;