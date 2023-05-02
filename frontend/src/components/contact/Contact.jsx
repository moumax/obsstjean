/* eslint-disable import/no-unresolved */
import Leaflet from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { CiFacebook } from "react-icons/ci";
import { SiMaildotru } from "react-icons/si";
import "./Leaflet.css";
// import "./contact.css";
import iconUrl from "../../assets/contact/marker.webp";
import Titles from "@components/utils/titles";

export default function Contact() {
  const position = [47.891346, 1.917617];

  const newicon = new Leaflet.Icon({
    iconUrl,
    iconAnchor: [5, 55],
    popupAnchor: [10, -44],
    iconSize: [35, 45],
  });

  return (
    <section className="w-[90vw] mt-10 flex flex-col items-center">
      <Titles size="text-4xl" color="text-white" text="Nous contacter" />
      <MapContainer
        className="h-56 w-full overflow-hidden rounded-xl"
        center={position}
        zoom={17}
        scrollWheelZoom={false}
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
        <p className="font-exo2  text-slate-400 text-center mt-2">
          L'observatoire est ouvert tous les Vendredis à partir de 21h
        </p>
        <div className="flex gap-10 justify-center w-full mt-2">
          <div className="flex items-center gap-1">
            <p className="font-exo2  text-slate-400">obsstjean</p>
            <p className="font-exo2  text-slate-400">
              <SiMaildotru />
            </p>
            <p className="font-exo2  text-slate-400">gmail.com</p>
          </div>

          <div className="mt-2">
            <a href="https://www.google.fr" target="_blank" rel="noreferrer">
              <CiFacebook className="text-slate-400 w-8 h-8" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
