import React from "react";
import { useState } from "react";

const List = ({ header, onType, children }) => {
  const [search, setSearch] = useState("");

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-bold">{header}</h1>
        <div className="flex flex-row">
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            onChange={(e) => {
              setSearch(e.target.value);
              onType(e.target.value);
            }}
            value={search}
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md ml-4">
            Search
          </button>
        </div>
      </div>
      <div className="mt-4">{children}</div>
    </>
  );
};

export default List;
