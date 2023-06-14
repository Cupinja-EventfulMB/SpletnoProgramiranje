import React, { useEffect } from "react";

//HOOKS
import useEventPopup from "hooks/useEventPopup";

//COMPONENTS
import EventCardContainer from "components/EventCardContainer";
import Gradient from "components/Gradient";
import Search from "components/Search";
import EventSideView from "components/EventSideView";

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
          <Map events={filteredEvents} />
        </div>
      </div>
    </>
  );
};

export default LandingView;