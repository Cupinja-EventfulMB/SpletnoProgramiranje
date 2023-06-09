import InstitutionCard from "./InstitutionCard";

const InstitutionCardContainer = ({ institutions, title, max }) => {
  if (!institutions) return <div>No institutions</div>;
  return (
    <>
      <h1 className="text-2xl font-semibold py-4">{title}</h1>
      <div className="w-full flex flex-row gap-8 flex-wrap ml-10 mb-7">
        {institutions.slice(0, max).map((institution) => (
          <InstitutionCard key={institution.id} institution={institution} />
        ))}
      </div>
    </>
  );
};

export default InstitutionCardContainer;
export default InstitutionCardContainer;