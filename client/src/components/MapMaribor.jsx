import React, {useEffect} from 'react';
import L from 'leaflet';
import {MapContainer, Marker, Pane, Popup, Rectangle, TileLayer} from "react-leaflet";
import {render} from "react-dom/profiling";
import 'leaflet/dist/leaflet.css';

const MapMaribor = ({event}) => {
    const position = [46.5547, 15.6459]
    return (
        <MapContainer center={position} zoom={13.5} style={{height: "400px"}}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
        </MapContainer>
    );

};


export default MapMaribor;