import Button from "./Button";
import { BsFillGridFill, BsCalendar4Week } from "react-icons/bs";
import Select from "react-select"
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const options = [
  {label: "Kategorija"},
  {label: "Opera" },
  {label: "Koncert" },
  {label: "Stand up" },
  {label: "Festival" },
  {label: "Balet" }
]


const Search = ({onSearch}) => {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState(null)
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(null);
  const handleSearch = () =>{
    onSearch(search, date, category)
  }

  const handleClear = () =>{
    setDate(null);
    setSearch("");
    setCategory("Kategorija")
  }

  return (
    <div className="w-full h-16 bg-white rounded-full -translate-y-1/2 shadow-lg z-50 relative">
      <div className="flex flex-row justify-evenly items-center h-full px-4">
        <input
          type="text"
          placeholder="Search by name, category, date..."
          className="w-1/2 h-full outline-none rounded-md px-4 py-2 bg-transparent"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <div className="w-[1px] h-12 bg-gray-200"></div>
        <div className="flex flex-row gap-4 items-center mx-4 h-12">
          <BsCalendar4Week
            onClick={() => {
              setShowDatePicker(!showDatePicker);
            }}
            size={36}
            className="text-rose-500 inline-block ml-4 hover:cursor-pointer"
          />
          {showDatePicker && (
            <DayPicker
              className="bg-white rounded-md absolute z-50 translate-y-[12rem]"
              mode="single"
              selected={date}
              onSelect={(val) => {
                setDate(val);
                console.log(format(val, "PP"));
                setShowDatePicker(false);
              }}
            />
          )}
          <p className="inline-block select-none font-semibold text-lg translate-y-[2px]">
            {date ? format(date, "PP") : <>Date</>}
          </p>
        </div>
        <div className="w-[1px] h-12 bg-gray-200"></div>
        <div className="flex flex-row gap-4 items-center mx-4 h-12">
          <BsFillGridFill
            size={36}
            className="text-rose-500 inline-block ml-4 hover:cursor-pointer"
          />
          <Select
            options={options}
            className=""
            placeholder="Kategorija"
            onChange={(e) => {
              setCategory(e.label);
            }}
          />
        </div>
        <div className="w-[1px] h-12 bg-gray-200"></div>
        {(search || date || category) && (
          <Button title={"Clear"} action={handleClear} />
        )}
        <Button primary title={"Search"} action={handleSearch} />
      </div>
    </div>
  );
};

export default Search;
