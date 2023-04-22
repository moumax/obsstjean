import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  BsCloudFog,
  BsCloudRain,
  BsCloudSnow,
  BsCloudSun,
  BsSun,
  BsSunrise,
  BsSunset,
  BsThermometerSnow,
  BsWind,
} from "react-icons/bs";
import {
  WiDaySnow,
  WiDaySnowThunderstorm,
  WiDayThunderstorm,
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
import { FaCloudSunRain, FaTemperatureLow } from "react-icons/fa";
import { AiOutlineCloud } from "react-icons/ai";
import { RiCloudWindyLine, RiMistFill } from "react-icons/ri";
import { BiCloudRain } from "react-icons/bi";
import { IoThunderstormOutline } from "react-icons/io";

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
  const [condition, setCondition] = useState();
  // eslint-disable-next-line no-unused-vars
  const [conditionIcon, setConditionIcon] = useState();

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
      setCondition(response.data.current.condition.text);
      setConditionIcon(response.data.current.condition.icon);
    });
  }, []);

  const conditionPicture = () => {
    switch (condition) {
      case "Sunny" || "Clear":
        return <BsSun className="w-8 h-8" />;
      case "Partly cloudy":
        return <BsCloudSun className="w-8 h-8" />;
      case "Cloudy":
      case "Overcast":
        return <AiOutlineCloud className="w-8 h-8" />;
      case "Mist":
        return <RiMistFill className="w-8 h-8" />;
      case "Patchy rain possible" ||
        "Patchy light rain" ||
        "Light rain" ||
        "Moderate rain at times" ||
        "Moderate rain" ||
        "Heavy rain at times" ||
        "Heavy rain" ||
        "Light freezing rain" ||
        "Moderate or heavy freezing rain" ||
        "Light sleet" ||
        "Moderate or heavy sleet" ||
        "Light rain shower" ||
        "Moderate or heavy rain shower" ||
        "Torrential rain shower" ||
        "Light sleet showers" ||
        "Moderate or heavy sleet showers":
        return <FaCloudSunRain className="w-8 h-8" />;
      case "Patchy snow possible" ||
        "Patchy light snow" ||
        "Light snow" ||
        "Patchy moderate snow" ||
        "Moderate snow" ||
        "Patchy heavy snow" ||
        "Heavy snow" ||
        "Ice pellets" ||
        "Light snow showers" ||
        "Moderate or heavy snow showers" ||
        "Light showers of ice pellets" ||
        "Moderate or heavy showers of ice pellets":
        return <WiDaySnow className="w-8 h-8" />;
      case "Patchy sleet possible":
        return <WiDaySnow className="w-8 h-8" />;
      case "Patchy freezing drizzle possible":
        return <BsThermometerSnow className="w-8 h-8" />;
      case "Thundery outbreaks possible":
        return <WiDayThunderstorm className="w-8 h-8" />;
      case "Blowing snow":
        return <BsCloudSnow className="w-8 h-8" />;
      case "Blizzard":
        return <RiCloudWindyLine className="w-8 h-8" />;
      case "Fog" || "Freezing fog":
        return <BsCloudFog className="w-8 h-8" />;
      case "Patchy light drizzle" || "Light drizzle":
        return <BsCloudRain className="w-8 h-8" />;
      case "Freezing drizzle" || "Heavy freezing drizzle":
        return <BiCloudRain className="w-8 h-8" />;
      case "Patchy light rain with thunder" ||
        "Moderate or heavy rain with thunder":
        return <IoThunderstormOutline />;
      case "Patchy light snow with thunder" ||
        "Moderate or heavy snow with thunder":
        return <WiDaySnowThunderstorm />;
      default:
        return <BsSun className="w-8 h-8" />;
    }
  };

  const lunarIcon = () => {
    switch (moonphase) {
      case "New Moon":
        return <WiMoonNew className="w-8 h-8" />;
      case "First Quarter":
        return <WiMoonAltFirstQuarter className="w-8 h-8" />;
      case "Last Quarter":
        return <WiMoonAltThirdQuarter className="w-8 h-8" />;
      case "Waxing Crescent":
        return <WiMoonAltWaxingCrescent5 className="w-8 h-8" />;
      case "Waning Crescent":
        return <WiMoonAltWaningCrescent5 className="w-8 h-8" />;
      case "Waxing Gibbous":
        return <WiMoonAltWaxingGibbous2 className="w-8 h-8" />;
      case "Waning Gibbous":
        return <WiMoonAltWaningGibbous2 className="w-8 h-8" />;
      default:
        return <WiMoonFull className="w-8 h-8" />;
    }
  };

  return (
    <>
      <div className="flex mt-10 text-xs">
        <div className="flex flex-col">
          <div className="text-white flex items-center gap-3">
            <BsSunrise className="text-yellow-400 w-8 h-8" />
            {`${sunrise}`}
          </div>
          <div className="text-white flex items-center gap-3">
            <BsSunset className="text-yellow-700 w-8 h-8" /> {`${sunset}`}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-white flex items-center gap-3">
            <WiMoonrise className="text-gray-400 w-8 h-8" /> {`${moonrise}`}
          </div>
          <div className="text-white flex items-center gap-3">
            <WiMoonset className="text-gray-500 w-8 h-8" /> {`${moonset}`}
          </div>
        </div>
      </div>
      <div className="flex items-center text-xs gap-3">
        <div className="text-white">{lunarIcon()}</div>
        <div className="text-white">{`Phase lunaire ${illumination} %`}</div>
      </div>
      <div className="flex text-xs">
        <div className="text-white flex items-center gap-2">
          <FaTemperatureLow className="text-red-400 w-8 h-8" />
          {`${temperature} °C`}
          <WiHumidity className="w-8 h-8 text-cyan-500" />
          {`${humidity} %`}
          <BsWind className="text-white w-8 h-8" />
          {`${wind} km/h`}
          <WiWindDeg className="text-blue-700 w-8 h-8" />
          {windDirection}
        </div>
      </div>
      <div className="flex items-center gap-3 text-xs">
        <div className="text-white">Météo actuelle :</div>
        <div className="text-white">{conditionPicture()}</div>
      </div>
    </>
  );
}
