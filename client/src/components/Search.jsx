import Button from "./form/Button";
import { BsFillGridFill, BsCalendar4Week } from "react-icons/bs";

const Search = () => {
  return (
    <div className="w-full h-16 bg-white rounded-full -translate-y-1/2 shadow-lg">
      <div className="flex flex-row justify-evenly items-center h-full px-4">
        <input
          type="text"
          placeholder="Search by name, category, date..."
          className="w-1/2 h-full outline-none rounded-md px-4 py-2 bg-transparent"
        />
        <div className="w-[1px] h-12 bg-gray-200"></div>
        <div className="flex flex-row gap-4 items-center mx-4 h-12">
          <BsCalendar4Week
            onClick={() => console.log("grid")}
            size={36}
            className="text-rose-500 inline-block ml-4 hover:cursor-pointer"
          />
          <p className="inline-block select-none font-semibold text-lg translate-y-[2px]">
            Date
          </p>
        </div>
        <div className="w-[1px] h-12 bg-gray-200"></div>
        <div className="flex flex-row gap-4 items-center mx-4 h-12">
          <BsFillGridFill
            onClick={() => console.log("grid")}
            size={36}
            className="text-rose-500 inline-block ml-4 hover:cursor-pointer"
          />
          <p className="inline-block select-none font-semibold text-lg translate-y-[2px]">
            Category
          </p>
        </div>
        <div className="w-[1px] h-12 bg-gray-200"></div>

        <Button primary title={"Search"} />
      </div>
    </div>
  );
};

export default Search;
