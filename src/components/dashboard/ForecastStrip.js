import { useSelector } from "react-redux";

const ForecastStrip = () => {
  const weather = useSelector((state) => state.weather);

  const daily = weather.data?.daily;

  if (!daily?.time) {
    return (
      <div className="dashboard-card">
        <div className="dashboard-card-header">
          <div>
            <h5>5-Day Forecast</h5>
            <p>Weather forecast for Lahore</p>
          </div>
        </div>

        <div className="text-muted">
          Forecast data is loading...
        </div>
      </div>
    );
  }

  const getWeatherIcon = (code) => {
    if (code === 0) return "bi-sun";
    if ([1, 2, 3].includes(code)) return "bi-cloud-sun";
    if ([45, 48].includes(code)) return "bi-cloud-fog";
    if ([51, 53, 55, 56, 57].includes(code)) return "bi-cloud-drizzle";
    if ([61, 63, 65, 66, 67].includes(code)) return "bi-cloud-rain";
    if ([71, 73, 75, 77].includes(code)) return "bi-cloud-snow";
    if ([80, 81, 82].includes(code)) return "bi-cloud-rain-heavy";
    if ([95, 96, 99].includes(code)) return "bi-cloud-lightning";
    return "bi-cloud";
  };

  return (
    <div className="dashboard-card">
      <div className="dashboard-card-header">
        <div>
          <h5>5-Day Forecast</h5>
          <p>Upcoming weather conditions</p>
        </div>

        <span className="dashboard-card-icon">
          <i className="bi bi-calendar3"></i>
        </span>
      </div>

      <div className="forecast-strip">
        {daily.time.map((date, index) => (
          <div className="forecast-day" key={date}>
            <span className="forecast-date">
              {index === 0
                ? "Today"
                : new Date(date).toLocaleDateString("en-PK", {
                    weekday: "short",
                  })}
            </span>

            <i
              className={`bi ${getWeatherIcon(
                daily.weather_code?.[index]
              )} forecast-icon`}
            ></i>

            <strong>
              {Math.round(daily.temperature_2m_max?.[index] || 0)}°
            </strong>

            <span>
              {Math.round(daily.temperature_2m_min?.[index] || 0)}°
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastStrip;