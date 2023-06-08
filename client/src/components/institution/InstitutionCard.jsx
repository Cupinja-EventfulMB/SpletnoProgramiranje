import Button from "../form/Button";

const InstitutionCard = ({ institution }) => {
  return (
    <div className="relative shadow-md rounded-2xl w-96 h-52 bg-white hover:shadow-l transition duration-200 group hover:scale-105">
      <img
        src={institution.mainImage}
        alt=""
        className="object-cover object-center w-full h-full aboslute rounded-2xl"
      />
      <div className="px-4 py-[8px] absolute w-full bottom-0 gap-2 left-0 bg-white rounded-2xl z-10 flex flex-col group-hover:bg-rose-500 group-hover:text-white transition druation-200">
        <h3 className="font-semibold">{institution.name}</h3>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
          </div>
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <Button
            title={"More"}
            small
          />
        </div>
      </div>
    </div>
  );
};

export default InstitutionCard;