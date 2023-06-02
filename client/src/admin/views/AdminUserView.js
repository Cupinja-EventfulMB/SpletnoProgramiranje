import AdminHero from "../components/AdminGradient";
import UserCard from "admin/components/UserCard";
import React, { useEffect, useState } from "react";

const AdminUserView = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState(users);

  const handleSearch = (value) => {
    setSearch(users.filter((user) => user.name.toLowerCase().includes(value)));
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/user");
        const data = await response.json();
        setUsers(data);
        setSearch(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);
  if (!users) return <div>Loading...</div>;

  return (
    <>
      <AdminHero />
      <div className="container mx-auto pt-4">
          {search.map((user) => (
            <UserCard user={user} key={user._id} />
          ))}
      </div>
    </>
  );
};

export default AdminUserView;