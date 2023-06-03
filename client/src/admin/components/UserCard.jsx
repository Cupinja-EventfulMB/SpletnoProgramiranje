import { useState } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import Button from "../../components/form/Button";
import axios from "axios";

const UserCard = ({ user, onDelete }) => {
  const handleDelete = () => {
    axios .delete(`http://localhost:3001/api/user/${user._id}`)
      .then((response) => {
        console.log("User deleted successfully");
        onDelete(user._id); 
      })
      .catch((error) => {
        console.error("Error deleting user", error);
      });
  };

  if (!user) return <div>Loading...</div>;
  return (
    <div className="w-full bg-white flex flex-row justify-between h-20 items-center px-8">
        <div className="flex flex-col">
            <p className="text-gray-500 text-sm">{user.name}</p>
            <p className="text-gray-500 text-sm">{user.email}</p>
        </div>
        <div className="flex flex-col">
            <p className="text-gray-500 text-sm">{user.phone}</p>
            <p className="text-gray-500 text-sm">{user.date}</p>
        </div>
        <div className="flex flex-col">
            <p className="text-gray-500 text-sm">{user.address}</p>
            {user.admin ? <p>Admin</p> : <p>User</p>}
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

export default UserCard;
