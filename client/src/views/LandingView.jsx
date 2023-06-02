import React, { useEffect } from "react";

//HOOKS
import useEventPopup from "hooks/useEventPopup";

//COMPONENTS
import EventCardContainer from "components/event/EventCardContainer";
import Gradient from "components/Gradient";
import Search from "components/Search";
import EventSideView from "components/event/EventSideView";

const events = [
  {
    _id: "6468c08ca8f43c689aa7262b",
    name: "Event 1",
    date: "3 May 2023",
    image:
      "https://content.eventim.com/static/uploaded/at/p/b/h/g/pbhg_960_360.webp",
  },
  {
    _id: 2,
    name: "Event 2",
    date: "8 May 2023",
    image:
      "https://content.eventim.com/static/uploaded/at/x/i/x/u/xixu_960_360.webp",
  },
  {
    _id: 3,
    name: "Event 3",
    date: "10 May 2023",
    image:
      "https://content.eventim.com/static/uploaded/at/p/b/h/g/pbhg_960_360.webp",
  },
  {
    _id: 4,
    name: "Event 4",
    date: "12 May 2023",
    image:
      "https://content.eventim.com/static/uploaded/at/x/i/x/u/xixu_960_360.webp",
  },
  {
    _id: 5,
    name: "Event 5",
    date: "15 May 2023",
    image:
      "https://content.eventim.com/static/uploaded/at/p/b/h/g/pbhg_960_360.webp",
  },
];

const LandingView = ({ socket }) => {
  const eventPopup = useEventPopup();

  const [selectedEvent, setSelectedEvent] = React.useState(null);

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
        <EventCardContainer events={events} title={"Trending"} max={3} />
        <EventCardContainer
          events={events}
          title={"Today in Maribor"}
          max={3}
        />
        <EventCardContainer events={events} title={"Upcoming"} max={3} />
      </div>
    </>
  );
};

export default LandingView;