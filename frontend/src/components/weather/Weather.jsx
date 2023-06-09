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

  function convertTimeTo24(time) {
    const [timeStr, period] = time.split(" ");

    // eslint-disable-next-line prefer-const
    let [hours, minutes] = timeStr.split(":");

    if (period === "PM" && hours !== "12") {
      hours = parseInt(hours, 10) + 12;
    } else if (period === "AM" && hours === "12") {
      hours = "00";
    }
    return `${hours}:${minutes}`;
  }

  const baseURLastro =
    "http://api.weatherapi.com/v1/astronomy.json?key=48015afa1f274a1d95a100916232104&q=Saint jean le blanc&lang=fr";

  const baseURLweather =
    "http://api.weatherapi.com/v1/current.json?key=48015afa1f274a1d95a100916232104&q=Saint jean le blanc&aqi=no";

  useEffect(() => {
    axios.get(baseURLastro).then((response) => {
      setSunrise(convertTimeTo24(response.data.astronomy.astro.sunrise));
      setSunset(convertTimeTo24(response.data.astronomy.astro.sunset));
      setMoonrise(convertTimeTo24(response.data.astronomy.astro.moonrise));
      setMoonset(convertTimeTo24(response.data.astronomy.astro.moonset));
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
      case "Sunny":
      case "Clear":
        return <BsSun className="w-8 h-8" />;
      case "Partly cloudy":
        return <BsCloudSun className="w-8 h-8" />;
      case "Cloudy":
      case "Overcast":
        return <AiOutlineCloud className="w-8 h-8" />;
      case "Mist":
        return <RiMistFill className="w-8 h-8" />;
      case "Patchy rain possible":
      case "Patchy light rain":
      case "Light rain":
      case "Moderate rain at times":
      case "Moderate rain":
      case "Heavy rain at times":
      case "Heavy rain":
      case "Light freezing rain":
      case "Moderate or heavy freezing rain":
      case "Light sleet":
      case "Moderate or heavy sleet":
      case "Light rain shower":
      case "Moderate or heavy rain shower":
      case "Torrential rain shower":
      case "Light sleet showers":
      case "Moderate or heavy sleet showers":
        return <FaCloudSunRain className="w-8 h-8" />;
      case "Patchy snow possible":
      case "Patchy light snow":
      case "Light snow":
      case "Patchy moderate snow":
      case "Moderate snow":
      case "Patchy heavy snow":
      case "Heavy snow":
      case "Ice pellets":
      case "Light snow showers":
      case "Moderate or heavy snow showers":
      case "Light showers of ice pellets":
      case "Moderate or heavy showers of ice pellets":
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
      case "Fog":
      case "Freezing fog":
        return <BsCloudFog className="w-8 h-8" />;
      case "Patchy light drizzle":
      case "Light drizzle":
        return <BsCloudRain className="w-8 h-8" />;
      case "Freezing drizzle":
      case "Heavy freezing drizzle":
        return <BiCloudRain className="w-8 h-8" />;
      case "Patchy light rain with thunder":
      case "Moderate or heavy rain with thunder":
        return <IoThunderstormOutline />;
      case "Patchy light snow with thunder":
      case "Moderate or heavy snow with thunder":
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

  function temperatureIconColor() {
    if (temperature > "28") {
      return "text-red-400 w-7 h-8";
    }
    if (temperature < "28" && temperature >= "20") {
      return "text-yellow-400 w-8 h-8";
    }
    return "text-blue-400 w-7 h-8";
  }

  return (
    <>
      <section className="opacity-50 flex text-xs">
        <div className="text-white flex items-center gap-4">
          {conditionPicture()}
          <div className="flex flex-col items-center">
            <FaTemperatureLow className={temperatureIconColor()} />
            {`${temperature} °C`}
          </div>

          <div className="flex flex-col items-center">
            <WiHumidity className="w-8 h-8 text-cyan-500" />
            {`${humidity} %`}
          </div>
          <div className="flex flex-col items-center">
            <BsWind className="text-white w-8 h-8" />
            {`${wind} km/h`}
          </div>
          <div className="flex flex-col items-center">
            <WiWindDeg className="text-blue-700 w-8 h-8" />
            {windDirection}
          </div>
          <div className="flex flex-col items-center">
            <div className="text-white">{lunarIcon()}</div>
            <div className="text-white">{`${illumination} %`}</div>
          </div>
        </div>
      </section>
      <section className="flex mt-2 text-xs opacity-50 gap-4">
        <div className="flex">
          <div className="text-white flex items-center mr-3">
            <BsSunrise className="text-yellow-400 w-8 h-8 mr-2" />
            {sunrise}
          </div>
          <div className="text-white flex items-center">
            <BsSunset className="text-yellow-700 w-8 h-8 mr-2" />
            {sunset}
          </div>
        </div>
        <div className="flex">
          <div className="text-white flex items-center mr-3">
            <WiMoonrise className="text-gray-400 w-8 h-8" />
            {moonrise}
          </div>
          <div className="text-white flex items-center">
            <WiMoonset className="text-gray-500 w-8 h-8" />
            {moonset}
          </div>
        </div>
      </section>
    </>
  );
}
