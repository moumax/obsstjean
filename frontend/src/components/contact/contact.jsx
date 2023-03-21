/* eslint-disable import/no-unresolved */
import Leaflet from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./Leaflet.css";
// import "./contact.css";
import iconUrl from "../../assets/contact/marker.webp";

export default function Contact() {
  const position = [47.891346, 1.917617];

  const newicon = new Leaflet.Icon({
    iconUrl,
    iconAnchor: [5, 55],
    popupAnchor: [10, -44],
    iconSize: [35, 45],
  });

  return (
    <section className="bg-green-700 w-1/2 h-auto m-20">
      <MapContainer
        className="h-56 w-full overflow-hidden rounded-xl"
        center={position}
        zoom={13}
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={newicon}>
          <Popup>Observatoire de Saint Jean Le blanc</Popup>
        </Marker>
      </MapContainer>

      <div className="flex flex-col items-center">
        <p>Horaires d'ouverture :</p>
        <p>Tous les Vendredis à partir de 21h</p>
        <p>obsstjean AT gmail.com</p>
      </div>
    </section>
  );
}
