import React, { useEffect } from "react";

//HOOKS
import useEventPpopup from "hooks/useEventPopup";

//COMPONENTS
import EventCardContainer from "components/event/EventCardContainer";
import Gradient from "components/Gradient";
import Search from "components/Search";
import Map from "components/Map";

//REDUX
import { useSelector } from "react-redux";

import axios from "axios";

const LandingView = ({ socket }) => {
  const eventPopup = useEventPpopup();
  const [events, setEvents] = React.useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/event").then((res) => {
      setEvents(res.data);
    });
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("notification", (data) => {
        console.log("Received notification:", data.message);
        // Display the notification using a library or custom code
      });

      // Cleanup when the component is unmounted
      return () => {
        socket.off("notification");
      };
    }
  }, [socket]);
  return (
    <>
      <Gradient/>
      <div className="container mx-auto">
        <Search />
      </div>
      <div className="container mx-auto h-[600px] flex flex-row py-12">
        <div className="w-4/6 px-8 py-2 overflow-y-auto" id="events">
          <EventCardContainer events={events} max={4} title={"Trending"} />
          <EventCardContainer events={events} max={4} title={"Popular"} />
          <EventCardContainer events={events} max={4} title={"Other"} />
        </div>
        <div className="w-2/6 bg-blue-300 sticky sm:hidden md:inline-flex">
          <Map events={events} />
        </div>
      </div>
    </>
  );
};

export default LandingView;