import React from "react";
import {
  RiUserAddLine,
  RiBellLine,
  RiCheckLine,
  RiCloseLine,
} from "react-icons/ri";

const Notification = ({ type, message }) => {
  return (
    <div
      className={`notification bg-white rounded-lg shadow-lg p-4 w-60 ${
        type === "friend-request" ? "bg-blue-100" : "bg-gray-100"
      }`}
    >
      <div className="flex items-center">
        {type === "friend-request" ? (
          <RiUserAddLine className="text-blue-500 text-2xl mr-2" />
        ) : (
          <RiBellLine className="text-gray-500 text-2xl mr-2" />
        )}
        <p className="text-black">{message}</p>
      </div>
      {type === "friend-request" && (
        <div className="flex justify-end mt-2">
          <button className="bg-green-500 text-white px-3 py-2 rounded-md mr-2">
            <RiCheckLine className="text-white text-xl" />
          </button>
          <button className="bg-red-500 text-white px-3 py-2 rounded-md">
            <RiCloseLine className="text-white text-xl" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Notification;
