import { useState, useEffect } from "react";
import { convertToFlag, formatDay, getWeatherIcon } from "../helpers";
export function useWeather(location) {
  const [weather, setWeather] = useState({});
  const [isLoading, setLoding] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    async function getWeather() {
      try {
        setLoding(true);
        setError("");
        const geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${location}`,
          { signal: controller.signal }
        );
        const geoData = await geoRes.json();

        if (!geoData.results) throw new Error("Location not found");

        const { latitude, longitude, timezone, name, country_code } =
          geoData.results.at(0);

        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`,
          { signal: controller.signal }
        );
        const weatherData = await weatherRes.json();
        setWeather({
          ...weatherData.daily,
          time: weatherData.daily.time.map((str, i) => formatDay(str, i)),
          flag: convertToFlag(country_code),
          icons: weatherData.daily.weathercode.map((code) =>
            getWeatherIcon(code)
          ),
          name,
        });
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoding(false);
      }
    }

    if (location.length < 2) {
      setWeather({});
      setError("");
      return;
    }
    getWeather();
    return () => controller.abort();
  }, [location]);
  return { weather, isLoading, error };
}
