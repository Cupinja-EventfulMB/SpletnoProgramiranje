import React from "react";
import { useState } from "react";
import Button from "components/form/Button";

const List = ({ header, onType, action, actionLabel, children }) => {
  const [search, setSearch] = useState("");

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-bold">{header}</h1>
        <div className="flex flex-row pl-5">
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-300 mr-6 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            onChange={(e) => {
              setSearch(e.target.value);
              onType(e.target.value);
            }}
            value={search}
          />
          <Button action={action} title={actionLabel}/>
        </div>
      </div>
      <div className="mt-4">{children}</div>
    </>
  );
};

export default List;
