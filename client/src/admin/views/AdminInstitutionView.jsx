import AdminGradient from "../components/AdminGradient";
import List from "admin/components/List";
import InstitutionCard from "admin/components/InstitutionCard";
import React, { useEffect, useState } from "react";

const AdminInstitutionView = () => {
  const [institutions, setInstitutions] = useState([]);
  const [search, setSearch] = useState(institutions);

  const handleSearch = (value) => {
    setSearch(
      institutions.filter((institution) =>
        institution.name.toLowerCase().includes(value)
      )
    );
  };

  const handleDelete = (deletedInstitutionId) => {
    setInstitutions(institutions.filter((institution) => institution._id !== deletedInstitutionId));
    setSearch(search.filter((institution) => institution._id !== deletedInstitutionId));
  };

  useEffect(() => {
    const fetchInstitution = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/institution");
        const data = await response.json();
        setInstitutions(data);
        setSearch(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchInstitution();
  }, []);
  if (!institutions) return <div>Loading...</div>;

  return (
    <>
      <AdminGradient />
      <div className="container mx-auto pt-4">
        <List header={"Institutions"} onType={handleSearch}>
          {search.map((institution) => (
            <InstitutionCard institution={institution} key={institution._id} onDelete={handleDelete}/>
          ))}
        </List>
      </div>
    </>
  );
};

export default AdminInstitutionView;