import React, { useEffect } from "react";

//HOOKS
import useEventPpopup from "hooks/useEventPopup";

//COMPONENTS
import EventCardContainer from "components/EventCardContainer";
import Gradient from "components/Gradient";
import Search from "components/Search";
import EventSideView from "components/EventSideView";
import Map from "components/Map";
import { useSelector } from "react-redux";
import axios from "axios";

const LandingView = ({ socket }) => {
  const eventPopup = useEventPpopup();

  const [events, setEvents] = React.useState([]);

  const [selectedEvent, setSelectedEvent] = React.useState(
    useSelector((state) => state.event.event)
  );

  useEffect(() => {
    axios.get("http://localhost:3001/api/events").then((res) => {
      setEvents(res.data);
      console.log(res.data);
    });
  }, [events]);

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
      <Gradient />
      <EventSideView onClose={eventPopup.onClose} isOpen={eventPopup.isOpen} />
      <div className="container mx-auto">
        <Search />
      </div>
      <div className="container mx-auto h-[600px] flex flex-row py-12">
        <div className="w-4/6 px-8 py-2 overflow-y-auto" id="events">
          <EventCardContainer events={events} max={3} title={"Trending"} />
          <EventCardContainer events={events} max={3} title={"Popular"} />
          <EventCardContainer events={events} max={5} title={"Other"} />
        </div>
        <div className="w-2/6 bg-blue-300 sticky sm:hidden md:inline-flex">
          <Map events={events} />
        </div>
      </div>
    </>
  );
};

export default LandingView;
