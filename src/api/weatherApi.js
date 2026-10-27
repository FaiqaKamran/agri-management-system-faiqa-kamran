const LATITUDE = 31.5204;
const LONGITUDE = 74.3587;

export const getLahoreWeather = async () => {
  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${LATITUDE}` +
    `&longitude=${LONGITUDE}` +
    `&current=temperature_2m,relative_humidity_2m,wind_speed_10m,rain` +
    `&hourly=precipitation_probability` +
    `&daily=weather_code,temperature_2m_max,temperature_2m_min` +
    `&timezone=Asia%2FKarachi` +
    `&forecast_days=5`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Weather API request failed.");
  }

  return response.json();
};