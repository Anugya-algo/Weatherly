const form = document.getElementById('weatherForm');
const input = document.getElementById('locationInput');
const result = document.getElementById('weatherResult');
const errorEl = document.getElementById('error');

const apiKey = "d854b1b94821440690354557251107";

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const location = input.value.trim();
  if (!location) return;

  result.classList.add('hidden');
  errorEl.textContent = "";

  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("❌ Location not found");

    const data = await res.json();

    // Populate data
    document.getElementById('cityName').textContent = `${data.location.name}, ${data.location.country}`;
    document.getElementById('conditionIcon').src = `https:${data.current.condition.icon}`;
    document.getElementById('temperature').textContent = `${data.current.temp_c}°`;
    document.getElementById('conditionText').textContent = data.current.condition.text;
    document.getElementById('feelsLike').textContent = `Anugya ,It feels like ${data.current.feelslike_c}°`;

    document.getElementById('humidity').textContent = `${data.current.humidity}%`;
    document.getElementById('wind').textContent = `${data.current.wind_kph} km/h`;
    document.getElementById('pressure').textContent = `${data.current.pressure_mb} hPa`;
    document.getElementById('visibility').textContent = `${data.current.vis_km} km`;

    const uv = data.current.uv;
    document.getElementById('uvIndex').textContent = uv;
    document.getElementById('uvValue').style.width = `${Math.min(uv * 10, 100)}%`;

    // 🌡️ Background based on temperature
    const temperature = data.current.temp_c;
    const body = document.body;

    if (temperature <= 0) {
      body.style.background = "linear-gradient(to top right, #a1c4fd, #c2e9fb)"; // Cold
    } else if (temperature <= 15) {
      body.style.background = "linear-gradient(to top right, #89f7fe, #66a6ff)"; // Cool
    } else if (temperature <= 25) {
      body.style.background = "linear-gradient(to top right, #74ebd5, #acb6e5)"; // Pleasant
    } else if (temperature <= 35) {
      body.style.background = "linear-gradient(to top right, #fbd786, #f7797d)"; // Warm
    } else {
      body.style.background = "linear-gradient(to top right, #f953c6, #b91d73)"; // Hot
    }

    result.classList.remove('hidden');
  } catch (err) {
    errorEl.textContent = err.message;
  }
});
