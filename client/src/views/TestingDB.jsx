import React, {useEffect, useState} from "react";

//COMPONENTS
import Button from "../components/Button";
import EventCardContainer from "components/EventCardContainer";
import Gradient from "components/Gradient";
import Search from "components/Search";
import MapMaribor from "components/MapMaribor"

const LandingView = ({socket}) => {
    const [events, setEvents] = useState([])
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

    useEffect(() => {
        fetch('http://localhost:3001/api/event', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(body => setEvents(body))
    }, [])

  return (
    <>
      <Gradient 
      title={"EventfulMB"}
      subtitle={"Take a look at the events in Maribor"}
      />
      <div className="container mx-auto">
        <Search />
        <MapMaribor locations={locations} />
        <EventCardContainer events={events} title={"All events"} max={9} />
      </div>
    </>
  );
};

export default LandingView;
