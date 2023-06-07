import React, {useEffect, useState} from 'react';
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
//import icon from "leaflet/dist/images/marker-red.png";
import shadow from "leaflet/dist/images/marker-shadow.png";


const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}`;

    return formattedDate;
};
const MapMaribor = ({locations}) => {
    const [locationEvents, setLocationEvents] = useState({})

    const position = [46.5547, 15.6459];

    const customMarkerIcon = L.icon({
        iconUrl: "icon",
        shadowUrl: shadow,
        iconSize: [25, 41],
        iconAnchor: [12.5, 41],
    });


    useEffect(() => {
        const locEventsMap = {}
        locations.forEach(location => {
            fetch(`http://localhost:3001/api/location/events/${location._id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json()).then(body => {
                locEventsMap[location._id] = body
                setLocationEvents(locEventsMap)
            })
        })

    }, [locations]);


    return (
        <MapContainer center={position} zoom={13.5} style={{height: "400px"}}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {locations.map(location => {
                const events = locationEvents[location._id]
                let eventTitle = "No event was found"
                let eventDate = " "
                if (events != undefined) {
                    eventTitle = events[0].name
                    eventDate = events[0].date
                }
                const formattedEventDate = formatDate(eventDate)
                return (
                    <Marker key={location.id} position={[location.x, location.y]} icon={customMarkerIcon}>
                        <Popup>
                            <h2><b>{location.institution}</b></h2>
                            <p>Event: <b>{eventTitle}</b></p>
                            <p>Date: <b>{formattedEventDate}</b></p>
                        </Popup>
                    </Marker>
                )
            })}
        </MapContainer>
    );
};

export default MapMaribor;
