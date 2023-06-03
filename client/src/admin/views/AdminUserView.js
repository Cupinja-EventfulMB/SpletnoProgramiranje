import AdminGradient from "../components/AdminGradient";
import List from "admin/components/List";
import UserCard from "admin/components/UserCard";
import React, { useEffect, useState } from "react";
import EditUsersModal from "admin/components/modals/EditUsersModal";

const AdminUserView = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState([]);

  const handleSearch = (value) => {
    setSearch(users.filter((user) => user.name.toLowerCase().includes(value)));
  };

  const handleDelete = (deletedUserId) => {
    setUsers(users.filter((user) => user._id !== deletedUserId));
    setSearch(search.filter((user) => user._id !== deletedUserId));
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
      <AdminGradient />
      <EditUsersModal />
      <div className="container mx-auto pt-4">
        <List header={"Users"} onType={handleSearch}>
          {search.map((user) => (
            <UserCard user={user} key={user._id} onDelete={handleDelete} />
          ))}
        </List>
      </div>
    </>
  );
};

export default AdminUserView;