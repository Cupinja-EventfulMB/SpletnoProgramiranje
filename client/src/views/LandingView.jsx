import React, { useEffect } from "react";

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
      <Gradient title={"Welcome to the Events App"}
      subtitle={"Welcome to the Events App"}/>
      <RegisterModal />
      <LoginModal />
      <EventSideView onClose={eventPopup.onClose} isOpen={eventPopup.isOpen} />
      <div className="container mx-auto">
        <Search />
      </div>
      <div className="container mx-auto h-[600px] flex flex-row py-2">
      <div className="w-4/6 py-1 overflow-y-auto" id="events">
          <EventCardContainer events={events} max={8} title={"Trending"} />
          <EventCardContainer events={events} max={4} title={"Popular"} />
          <EventCardContainer events={events} max={4} title={"Other"} />
        </div>
        <div className="w-2/6 bg-blue-300 sticky outline: sm:hidden md:inline-flex">
          <Map events={events} />
        </div>
      </div>
    </>
  );
};

export default LandingView;