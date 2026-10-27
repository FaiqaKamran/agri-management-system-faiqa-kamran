import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../../store/thunks/fetchWeather";

const WeatherCard = () => {
  const dispatch = useDispatch();

  const weather = useSelector((state) => state.weather);

  useEffect(() => {
    if (weather.status === "idle") {
      dispatch(fetchWeather());
    }
  }, [dispatch, weather.status]);

  const current = weather.data?.current;

  const temperature = current?.temperature_2m;
  const wind = current?.wind_speed_10m;
  const rain = current?.rain;

  const handleRefresh = () => {
    dispatch(fetchWeather());
  };

  return (
    <div className="dashboard-card weather-card">
      <div className="dashboard-card-header">
        <div>
          <h5>Lahore Weather</h5>
          <p>Live weather conditions</p>
        </div>

        <button
          type="button"
          className="btn btn-sm btn-outline-success"
          onClick={handleRefresh}
          disabled={weather.status === "loading"}
        >
          <i className="bi bi-arrow-clockwise me-1"></i>
          {weather.status === "loading" ? "Loading..." : "Refresh"}
        </button>
      </div>

      {weather.status === "failed" ? (
        <div className="alert alert-warning mb-0">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {weather.error || "Unable to load weather data."}
        </div>
      ) : (
        <div className="weather-main">
          <div className="weather-temperature">
            <i className="bi bi-cloud-sun"></i>

            <div>
              <h2>
                {temperature !== undefined
                  ? `${Math.round(temperature)}°C`
                  : "--"}
              </h2>

              <span>Lahore, Pakistan</span>
            </div>
          </div>

          <div className="weather-details">
            <div>
              <i className="bi bi-wind"></i>
              <span>Wind</span>
              <strong>
                {wind !== undefined ? `${wind} km/h` : "--"}
              </strong>
            </div>

            <div>
              <i className="bi bi-cloud-rain"></i>
              <span>Rain</span>
              <strong>
                {rain !== undefined ? `${rain} mm` : "--"}
              </strong>
            </div>

            <div>
              <i className="bi bi-droplet"></i>
              <span>Humidity</span>
              <strong>
                {current?.relative_humidity_2m !== undefined
                  ? `${current.relative_humidity_2m}%`
                  : "--"}
              </strong>
            </div>
          </div>
        </div>
      )}

      {weather.lastUpdated && (
        <div className="weather-updated">
          Updated:{" "}
          {new Date(weather.lastUpdated).toLocaleTimeString("en-PK", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      )}
    </div>
  );
};

export default WeatherCard;