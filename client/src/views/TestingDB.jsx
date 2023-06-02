import React, {useEffect, useState} from "react";

//COMPONENTS
import Button from "components/form/Button";
import EventCardContainer from "components/event/EventCardContainer";
import Gradient from "components/Gradient";
import Search from "components/Search";
import MapMaribor from "components/MapMaribor"

const TestingDB = ({socket}) => {
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
        fetch("http://localhost:3001/api/event", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(body => setEvents(body))
    }, [])

    return (
        <>
            <Gradient/>
            <div className="container mx-auto">
                <Search/>
                <MapMaribor/>
                <EventCardContainer events={events} title={"Trending"}  max={6}/>
                <EventCardContainer events={events} title={"Today in Maribor"}  max={6}/>
                <EventCardContainer events={events} title={"Upcoming"}  max={6}/>
            </div>
        </>
    );
};

export default TestingDB;