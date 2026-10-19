const LATITUDE = 31.5204;
const LONGITUDE = 74.3587;

export const getWeather = async () => {
  const url =
    `https://api.open-meteo.com/v1/forecast?` +
    `latitude=${LATITUDE}` +
    `&longitude=${LONGITUDE}` +
    `&current=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation,rain,weather_code` +
    `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max` +
    `&timezone=Asia%2FKarachi` +
    `&forecast_days=5`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Weather API request failed.");
  }

  const data = await response.json();

  return {
    current: {
      temperature: data.current.temperature_2m,
      humidity: data.current.relative_humidity_2m,
      wind: data.current.wind_speed_10m,
      rain: data.current.rain,
      precipitation: data.current.precipitation,
      weatherCode: data.current.weather_code,
    },

    daily: {
      dates: data.daily.time,
      weatherCodes: data.daily.weather_code,
      maxTemps: data.daily.temperature_2m_max,
      minTemps: data.daily.temperature_2m_min,
      rainProbability:
        data.daily.precipitation_probability_max,
    },
  };
};

export const getWeatherDescription = (code) => {
  const weatherCodes = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Foggy",
    48: "Foggy",
    51: "Light drizzle",
    53: "Drizzle",
    55: "Heavy drizzle",
    61: "Light rain",
    63: "Rain",
    65: "Heavy rain",
    71: "Light snow",
    73: "Snow",
    75: "Heavy snow",
    80: "Rain showers",
    81: "Rain showers",
    82: "Heavy rain showers",
    95: "Thunderstorm",
    96: "Thunderstorm",
    99: "Thunderstorm",
  };

  return weatherCodes[code] || "Unknown";
};

export const getWeatherIcon = (code) => {
  if (code === 0) return "bi-sun";

  if (code === 1 || code === 2) {
    return "bi-cloud-sun";
  }

  if (code === 3) return "bi-clouds";

  if ([45, 48].includes(code)) {
    return "bi-cloud-fog";
  }

  if ([51, 53, 55, 61, 63, 65].includes(code)) {
    return "bi-cloud-rain";
  }

  if ([80, 81, 82].includes(code)) {
    return "bi-cloud-rain-heavy";
  }

  if ([95, 96, 99].includes(code)) {
    return "bi-cloud-lightning-rain";
  }

  return "bi-cloud";
};