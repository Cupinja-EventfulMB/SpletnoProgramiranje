import React, {useEffect, useState} from 'react';
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-red.png';
import shadow from 'leaflet/dist/images/marker-shadow.png';
import weatherIcon from 'leaflet/dist/images/marker-weather.jpg';

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
    const [locationEvents, setLocationEvents] = useState({});
    // const [weatherIcon, setWeatherIcon] = useState('');

    const position = [46.5547, 15.6459];
    const wPosition = [46.547246, 15.704558];

    const customMarkerIcon = L.icon({
        iconUrl: icon,
        shadowUrl: shadow,
        iconSize: [25, 41],
        iconAnchor: [12.5, 41],
    });

    const fixedMarkerStyle = {
        position: 'absolute',
        top: '10px',
        left: '10px',
    };

    const markerIconWeather = L.icon({
            iconUrl: weatherIcon,
            iconSize: [80,80],
        }
    );

    useEffect(() => {
        const locEventsMap = {};
        locations.forEach((location) => {
            fetch(`http://localhost:3001/api/location/events/${location._id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => res.json())
                .then((body) => {
                    locEventsMap[location._id] = body;
                    setLocationEvents(locEventsMap);
                });
        });
    }, [locations]);

    const [weather, setWeather] = useState({});

    useEffect(() => {
        const weatherApi = 'http://dataservice.accuweather.com/forecasts/v1/daily/1day/299438?apikey=TtGavgOdqpTVaVorZkKbvYg7IlykiGbT'

        fetch(`https://cors-anywhere.herokuapp.com/` + weatherApi, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((body) => {
                setWeather(body); // Update the weather state
            });
    }, []);


    return (
        <MapContainer center={position} zoom={13.5} style={{height: '400px'}}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {locations.map((location) => {
                const events = locationEvents[location._id];
                let eventTitle = 'No event was found';
                let eventDate = '';
                if (events && events.length > 0) {
                    eventTitle = events[0].title;
                    eventDate = events[0].date;
                }
                const formattedEventDate = formatDate(eventDate);
                return (
                    <Marker key={location.id} position={[location.x, location.y]} icon={customMarkerIcon}>
                        <Popup>
                            <h2>
                                <b>{location.institution}</b>
                            </h2>
                            <p>Event: <b>{eventTitle}</b></p>
                            <p>Date: <b>{formattedEventDate}</b></p>
                        </Popup>
                    </Marker>
                );
            })}
            <Marker position={wPosition} icon={markerIconWeather} style={fixedMarkerStyle}>
                <Popup>
                    <h2>
                        <b>Weather in Maribor</b>
                    </h2>
                    <p>
                        {weather && weather.DailyForecasts && weather.DailyForecasts.length > 0 && (
                            <>
                                Min Temp: {Math.round(((weather.DailyForecasts[0].Temperature.Minimum.Value - 32) * 5) / 9)}°C
                                <br />
                                Max Temp: {Math.round(((weather.DailyForecasts[0].Temperature.Maximum.Value - 32) * 5) / 9)}°C
                                <br />
                                More Info: {weather.Headline.Text}
                            </>
                        )}
                    </p>
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default MapMaribor;
