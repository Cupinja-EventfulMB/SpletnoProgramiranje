import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import shadow from 'leaflet/dist/images/marker-shadow.png';


const icon = '/images/marker-red.png';
const weatherIcon = '/images/marker-weather.jpg';

//coordinates of Maribor
const position = [46.5547, 15.6459];

const Map = ({ locations }) => {
const customMarkerIcon = L.icon({
        iconUrl: icon,
        shadowUrl: shadow,
        iconSize: [25, 41],
        iconAnchor: [12.5, 41],
    });


  return (
    
    
      <MapContainer
      id="map"
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%", zIndex: 1 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((location) => {

                return (
                    <Marker key={location.id} position={[location.x, location.y]} icon={customMarkerIcon}>
                        <Popup>
                            <h2>
                                <b>{location.institution}</b>
                            </h2>
                        </Popup>
                    </Marker>
                );
            })}
      </MapContainer>

    
  );
};

export default Map;
