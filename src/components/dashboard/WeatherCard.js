import React from "react";
import useWeather from "../../hooks/useWeather";
import {
  getWeatherDescription,
  getWeatherIcon,
} from "../../services/weatherApi";

const WeatherCard = () => {
  const {
    weather,
    loading,
    error,
    refreshWeather,
  } = useWeather();

  if (loading) {
    return (
      <div className="dashboard-card weather-card">
        <div className="card-header">
          <div>
            <h5>Live Weather</h5>
            <p>Lahore, Pakistan</p>
          </div>
        </div>

        <div className="weather-loading">
          <div className="spinner-border"></div>
          <p>Loading weather...</p>
        </div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="dashboard-card weather-card">
        <div className="card-header">
          <div>
            <h5>Live Weather</h5>
            <p>Lahore, Pakistan</p>
          </div>

          <button
            className="btn btn-sm btn-outline-success"
            onClick={refreshWeather}
          >
            <i className="bi bi-arrow-clockwise"></i>
          </button>
        </div>

        <div className="weather-error">
          <i className="bi bi-cloud-slash"></i>
          <p>{error || "Weather unavailable."}</p>
        </div>
      </div>
    );
  }

  const current = weather.current;

  return (
    <div className="dashboard-card weather-card">
      <div className="card-header">
        <div>
          <h5>Live Weather</h5>
          <p>
            <i className="bi bi-geo-alt"></i>{" "}
            Lahore, Pakistan
          </p>
        </div>

        <button
          className="btn btn-sm btn-light"
          onClick={refreshWeather}
          title="Refresh weather"
        >
          <i className="bi bi-arrow-clockwise"></i>
        </button>
      </div>

      <div className="weather-main">
        <div className="weather-icon">
          <i
            className={`bi ${getWeatherIcon(
              current.weatherCode
            )}`}
          ></i>
        </div>

        <div>
          <h2>{Math.round(current.temperature)}°C</h2>
          <p>
            {getWeatherDescription(
              current.weatherCode
            )}
          </p>
        </div>
      </div>

      <div className="weather-details">
        <div>
          <i className="bi bi-droplet"></i>
          <span>Humidity</span>
          <strong>{current.humidity}%</strong>
        </div>

        <div>
          <i className="bi bi-wind"></i>
          <span>Wind</span>
          <strong>{current.wind} km/h</strong>
        </div>

        <div>
          <i className="bi bi-cloud-rain"></i>
          <span>Rain</span>
          <strong>{current.rain} mm</strong>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;