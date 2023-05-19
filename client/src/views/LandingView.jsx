import React, { useEffect } from "react";

//COMPONENTS
import Button from "../components/Button";
import EventCardContainer from "components/EventCardContainer";
import Gradient from "components/Gradient";
import Search from "components/Search";

const events = [
  {
    id: 1,
    name: "Event 1",
    date: "3 May 2023",
    image:
      "https://content.eventim.com/static/uploaded/at/p/b/h/g/pbhg_960_360.webp",
  },
  {
    id: 2,
    name: "Event 2",
    date: "8 May 2023",
    image:
      "https://content.eventim.com/static/uploaded/at/x/i/x/u/xixu_960_360.webp",
  },
];

const LandingView = ({ socket }) => {
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
    
      <div className="container mx-auto">
        <Search />
        <EventCardContainer events={events} title={"Trending"} />
        <EventCardContainer events={events} title={"Today in Maribor"} />
        <EventCardContainer events={events} title={"Upcoming"} />
      </div>
    </>
  );
};

export default LandingView;
