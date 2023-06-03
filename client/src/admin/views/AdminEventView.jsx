import AdminGradient from "../components/AdminGradient";
import List from "admin/components/List";
import EventCard from "admin/components/EventCard";
import React, { useEffect, useState } from "react";

const AdminEventView = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState(events);

  const handleSearch = (value) => {
    setSearch(
      events.filter((event) => event.title.toLowerCase().includes(value))
    );
  };

  const handleDelete = (deletedEventId) => {
    setEvents(events.filter((event) => event._id !== deletedEventId));
    setSearch(search.filter((event) => event._id !== deletedEventId));
  };

  useEffect(() => {
    const fetchInstitution = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/event");
        const data = await response.json();

        setEvents(data);
        setSearch(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchInstitution();
  }, []);

  if (!events) return <div>Loading...</div>;
  return (
    <>
      <AdminGradient />
      <div className="container mx-auto pt-4">
        <List header={"Events"} onType={handleSearch}>
          {search.map((event) => (
            <EventCard event={event} key={event._id} onDelete={handleDelete}/>
          ))}
        </List>
      </div>
    </>
  );
};

export default AdminEventView;