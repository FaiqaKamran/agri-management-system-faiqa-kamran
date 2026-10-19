import { useEffect, useState } from "react";
import { getWeather } from "../services/weatherApi";

const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getWeather();
      setWeather(data);
    } catch (err) {
      console.error(err);
      setError("Unable to load weather data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();

    const interval = setInterval(() => {
      fetchWeather();
    }, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return {
    weather,
    loading,
    error,
    refreshWeather: fetchWeather,
  };
};

export default useWeather;