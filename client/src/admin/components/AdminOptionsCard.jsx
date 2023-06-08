import React from 'react';
import Button from 'components/form/Button';
import { Link } from "react-router-dom";

const AdminOptionsCard = ({ title, link, image }) => {
  return (
    <div className="relative shadow-md rounded-2xl w-80 h-60 bg-white hover:shadow-xl transition duration-200 group">
      <Link to={link}>
        <img
          src={image}
          alt=""
          className="object-cover object-center w-full h-full absolute rounded-2xl"
        />
        <div className="px-4 py-[8px] absolute w-full h-14 bottom-0 gap-2 left-0 bg-white rounded-2xl z-10 flex flex-col group-hover:bg-violet-500 group-hover:text-white transition druation-200">
          <h3 className="font-semibold">{title}</h3>
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <Button title="Edit" outline/>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default AdminOptionsCard;
