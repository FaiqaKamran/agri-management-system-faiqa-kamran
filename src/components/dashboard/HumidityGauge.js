import { useSelector } from "react-redux";

const HumidityGauge = () => {
  const weather = useSelector((state) => state.weather);

  const humidity =
    weather.data?.current?.relative_humidity_2m ?? 0;

  return (
    <div className="dashboard-card humidity-card">
      <div className="dashboard-card-header">
        <div>
          <h5>Humidity</h5>
          <p>Current air humidity</p>
        </div>

        <span className="dashboard-card-icon">
          <i className="bi bi-droplet"></i>
        </span>
      </div>

      <div className="humidity-gauge-wrapper">
        <div
          className="humidity-gauge"
          style={{
            "--humidity": `${humidity * 3.6}deg`,
          }}
        >
          <div className="humidity-gauge-inner">
            <strong>{humidity}%</strong>
            <span>Humidity</span>
          </div>
        </div>
      </div>

      <div className="humidity-status">
        {humidity >= 70
          ? "High humidity"
          : humidity >= 40
          ? "Comfortable level"
          : "Low humidity"}
      </div>
    </div>
  );
};

export default HumidityGauge;