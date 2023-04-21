import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsSunrise, BsSunset, BsWind } from "react-icons/bs";
import {
  WiHumidity,
  WiMoonAltFirstQuarter,
  WiMoonAltThirdQuarter,
  WiMoonAltWaningCrescent5,
  WiMoonAltWaningGibbous2,
  WiMoonAltWaxingCrescent5,
  WiMoonAltWaxingGibbous2,
  WiMoonFull,
  WiMoonNew,
  WiMoonrise,
  WiMoonset,
  WiWindDeg,
} from "react-icons/wi";
import { FaTemperatureLow } from "react-icons/fa";

export default function Weather() {
  const [sunrise, setSunrise] = useState();
  const [sunset, setSunset] = useState();
  const [moonrise, setMoonrise] = useState();
  const [moonset, setMoonset] = useState();
  const [moonphase, setMoonPhase] = useState();
  const [illumination, setIllumination] = useState();

  const [temperature, setTemperature] = useState();
  const [humidity, setHumidity] = useState();
  const [wind, setWind] = useState();
  const [windDirection, setWindDirection] = useState();

  const baseURLastro =
    "http://api.weatherapi.com/v1/astronomy.json?key=48015afa1f274a1d95a100916232104&q=Saint jean le blanc&lang=fr";

  const baseURLweather =
    "http://api.weatherapi.com/v1/current.json?key=48015afa1f274a1d95a100916232104&q=Saint jean le blanc&aqi=no";

  useEffect(() => {
    axios.get(baseURLastro).then((response) => {
      setSunrise(response.data.astronomy.astro.sunrise);
      setSunset(response.data.astronomy.astro.sunset);
      setMoonrise(response.data.astronomy.astro.moonrise);
      setMoonset(response.data.astronomy.astro.moonset);
      setMoonPhase(response.data.astronomy.astro.moon_phase);
      setIllumination(response.data.astronomy.astro.moon_illumination);
    });
  }, []);

  useEffect(() => {
    axios.get(baseURLweather).then((response) => {
      setTemperature(response.data.current.temp_c);
      setHumidity(response.data.current.humidity);
      setWind(response.data.current.wind_kph);
      setWindDirection(response.data.current.wind_dir);
    });
  }, []);

  const lunarIcon = () => {
    switch (moonphase) {
      case "New Moon":
        return <WiMoonNew className="w-10 h-10" />;
      case "First Quarter":
        return <WiMoonAltFirstQuarter className="w-10 h-10" />;
      case "Last Quarter":
        return <WiMoonAltThirdQuarter className="w-10 h-10" />;
      case "Waxing Crescent":
        return <WiMoonAltWaxingCrescent5 className="w-10 h-10" />;
      case "Waning Crescent":
        return <WiMoonAltWaningCrescent5 className="w-10 h-10" />;
      case "Waxing Gibbous":
        return <WiMoonAltWaxingGibbous2 className="w-10 h-10" />;
      case "Waning Gibbous":
        return <WiMoonAltWaningGibbous2 className="w-10 h-10" />;
      default:
        return <WiMoonFull className="w-10 h-10" />;
    }
  };

  return (
    <>
      <div className="flex mt-10">
        <div className="flex flex-col">
          <div className="text-white flex items-center gap-3">
            <BsSunrise className="text-yellow-400 w-10 h-10" />
            {`${sunrise}`}
          </div>
          <div className="text-white flex items-center gap-3">
            <BsSunset className="text-yellow-700 w-10 h-10" /> {`${sunset}`}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-white flex items-center gap-3">
            <WiMoonrise className="text-gray-400 w-10 h-10" /> {`${moonrise}`}
          </div>
          <div className="text-white flex items-center gap-3">
            <WiMoonset className="text-gray-500 w-10 h-10" /> {`${moonset}`}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-white">{lunarIcon()}</div>
        <div className="text-white font-bold">{`${illumination} % d'illumination`}</div>
      </div>
      <div className="flex mt-3">
        <div className="text-white flex items-center gap-3 mb-3">
          <FaTemperatureLow className="text-white w-8 h-8" />
          {`${temperature} °C`}
          <WiHumidity className="text-white w-8 h-8" />
          {`${humidity} %`}
        </div>
      </div>
      <div className="text-white flex items-center gap-3">
        <BsWind className="text-white w-8 h-8" />
        {`${wind} km/h`}
        <WiWindDeg className="text-white w-8 h-8" />
        {windDirection}
      </div>
    </>
  );
}
