import React from "react";
import useWeather from "../../hooks/useWeather";
import {
  getWeatherDescription,
  getWeatherIcon,
} from "../../services/weatherApi";

const ForecastStrip = () => {
  const { weather, loading } = useWeather();

  if (loading || !weather) {
    return (
      <div className="dashboard-card">
        <div className="card-header">
          <div>
            <h5>5-Day Forecast</h5>
            <p>Weather outlook for Lahore</p>
          </div>
        </div>

        <div className="text-center py-4">
          <div className="spinner-border spinner-border-sm"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-card">
      <div className="card-header">
        <div>
          <h5>5-Day Forecast</h5>
          <p>Weather outlook for Lahore</p>
        </div>
      </div>

      <div className="forecast-strip">
        {weather.daily.dates.map((date, index) => {
          const day = new Date(date).toLocaleDateString(
            "en-PK",
            {
              weekday: "short",
            }
          );

          return (
            <div className="forecast-item" key={date}>
              <strong>
                {index === 0 ? "Today" : day}
              </strong>

              <i
                className={`bi ${getWeatherIcon(
                  weather.daily.weatherCodes[index]
                )}`}
              ></i>

              <span>
                {Math.round(
                  weather.daily.maxTemps[index]
                )}
                °
                <small>
                  {" "}
                  /{" "}
                  {Math.round(
                    weather.daily.minTemps[index]
                  )}
                  °
                </small>
              </span>

              <small>
                <i className="bi bi-droplet"></i>{" "}
                {weather.daily.rainProbability[index]}%
              </small>

              <em>
                {getWeatherDescription(
                  weather.daily.weatherCodes[index]
                )}
              </em>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ForecastStrip;