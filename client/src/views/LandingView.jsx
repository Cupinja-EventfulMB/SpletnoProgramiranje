import React, { useEffect, useState } from "react";

import useEvent from "api/useEvent";

//HOOKS
import useEventPopup from "hooks/useEventPopup";

//COMPONENTS
import EventCardContainer from "components/event/EventCardContainer";
import Gradient from "components/Gradient";
import Search from "components/Search";
import LoginModal from "components/modals/LoginModal";
import RegisterModal from "components/modals/RegisterModal";
import EventSideView from "components/event/EventSideView";
import Map from "components/Map";

//REDUX
import { useSelector } from "react-redux";

import axios from "axios";

const LandingView = ({ socket }) => {
  const eventPopup = useEventPopup();
  const [events, setEvents] = React.useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searched, setSearched] = useState(false);

  const { getAllEvents } = useEvent();

  const handleSearch = (value, date, category) => {
    var filter;

    filter = events.filter((event) =>
      event.title.toLowerCase().includes(value.toLowerCase())
    );

    if (date != null) {
      
      filter = filter.filter((event) => {
        return (
          event.date.toLocaleString("en-GB").split(",")[0].replaceAll(". ", "/") == date.toLocaleString("en-GB").replace(/\b0/g, "").split(",")[0]
        );
      });
    }

    if (category && category !== "Kategorija") {
      filter = filter.filter((event) => {
        return event.category.includes(category);
      });
    }
    
    setFilteredEvents(filter);
    setSearched(true);
    if (searched && filter.length == events.length) {
      setSearched(false);
    }

    console.log(filteredEvents);
  };

  useEffect(() => {
    getAllEvents().then((e) => {
      setEvents(e);
    });
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("notification", (data) => {
        //onsole.log("Received notification:", data.message);
        // Display the notification using a library or custom code
      });

      // Cleanup when the component is unmounted
      return () => {
        socket.off("notification");
      };
    }
  }, [socket]);

  const [locations, setLocations] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/api/location", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((body) => setLocations(body));
  }, []);
  
  return (
    <>
      <Gradient
        title={"Welcome to EventfulMB"}
        subtitle={"Choose your favorite events in Maribor"}
      />
      <RegisterModal />
      <LoginModal />
      <EventSideView onClose={eventPopup.onClose} isOpen={eventPopup.isOpen} />
      <div className="container mx-auto">
        <Search onSearch={handleSearch} style={{ position: "absolute", top: 0, zIndex: 9999 }} />
      </div>
      <div className="container mx-auto h-[600px] flex flex-row py-2">
        <div className="w-4/6 py-1 overflow-y-auto" id="events">
          {!searched ? (
            <>
              <EventCardContainer events={events} max={8} title={"Trending"} />
              <EventCardContainer events={events} max={4} title={"Popular"} />
              <EventCardContainer events={events} max={4} title={"Other"} />
            </>
          ) : (
            <>
              <EventCardContainer
                events={filteredEvents}
                max={20}
                title={"Searched"}
              />
            </>
          )}
        </div>
        <div className="w-2/6 bg-blue-300 sticky outline: sm:hidden md:inline-flex z-0">
          <Map locations={locations} events={filteredEvents} />
        </div>
      </div>
    </>
  );
};

export default LandingView;