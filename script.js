document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("cityInput");
  const info = document.getElementById("Weather-info");
  const EnterCitybtn = document.getElementById("EnterCity-button");
  const cityNameDisplay = document.getElementById("cityName");
  const temperatureDisplay = document.getElementById("Temperature");
  const descriptionDisplay = document.getElementById("description");
  const errorMessageDisplay = document.getElementById("error-Message");
  const API_KEY = "54e2c55130ece2e3c8567506192fee74";

  EnterCitybtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) return;

    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      console.error("API Fetch Error:", error);
      displayError();
    }
  });

  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url); // Ensure 'await' is used

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    return data;
  }

  function displayWeatherData(data) {
    console.log(data);
    const { name, main, weather } = data;
    cityNameDisplay.textContent = name;
    temperatureDisplay.textContent = `Temperature: ${main.temp}°C`;
    descriptionDisplay.textContent = `Weather: ${weather[0].description}`;

    info.classList.remove("hidden");
    errorMessageDisplay.classList.add("hidden"); // Hide error message on success
  }

  function displayError() {
    info.classList.add("hidden"); // Hide weather info when an error occurs
    errorMessageDisplay.textContent = "City not found. Please try again."; // Show error message
    errorMessageDisplay.classList.remove("hidden");
  }
});
