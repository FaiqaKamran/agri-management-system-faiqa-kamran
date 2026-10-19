import React from "react";
import useWeather from "../../hooks/useWeather";

const HumidityGauge = () => {
  const { weather, loading } = useWeather();

  const humidity = weather?.current?.humidity || 0;

  return (
    <div className="dashboard-card humidity-card">
      <div className="card-header">
        <div>
          <h5>Humidity</h5>
          <p>Current moisture level</p>
        </div>

        <i className="bi bi-droplet-half card-header-icon"></i>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border spinner-border-sm"></div>
        </div>
      ) : (
        <div className="humidity-content">
          <div
            className="humidity-circle"
            style={{
              "--humidity": `${humidity * 3.6}deg`,
            }}
          >
            <div className="humidity-inner">
              <strong>{humidity}%</strong>
              <span>Humidity</span>
            </div>
          </div>

          <div className="humidity-info">
            <p>
              <i className="bi bi-check-circle"></i>
              Suitable for crop monitoring
            </p>

            <small>
              Updated from live Lahore weather
              data.
            </small>
          </div>
        </div>
      )}
    </div>
  );
};

export default HumidityGauge;