import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Weather() {
  const [sunrise, setSunrise] = useState();
  const [sunset, setSunset] = useState();
  const [moonrise, setMoonrise] = useState();
  const [moonset, setMoonset] = useState();
  const baseURL =
    "http://api.weatherapi.com/v1/astronomy.json?key=48015afa1f274a1d95a100916232104&q=Saint jean le blanc";
  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setSunrise(response.data.astronomy.astro.sunrise);
      setSunset(response.data.astronomy.astro.sunset);
      setMoonrise(response.data.astronomy.astro.moonrise);
      setMoonset(response.data.astronomy.astro.moonset);
    });
  }, []);

  return (
    <>
      <div className="text-white">{`Levé du Soleil : ${sunrise}`}</div>
      <div className="text-white">{`Couché du Soleil : ${sunset}`}</div>
      <div className="text-white">{`Levé de Lune : ${moonrise}`}</div>
      <div className="text-white">{`Couché de Lune : ${moonset}`}</div>
    </>
  );
}
