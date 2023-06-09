import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

//coordinates of Maribor
const position = [46.5547, 15.6459];

const InstitutionMap = ({ institution }) => {
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
          <Marker position={[institution.location.x, institution.location.y]}>
            <Popup>
              <h3>{institution.name}</h3>
            </Popup>
          </Marker>
      </MapContainer>

    
  );
};

export default InstitutionMap;
