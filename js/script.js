const apiKey = "d126b7ee626c74765be5c248d310819f"; // Replace with your OpenWeatherMap API key

const input = document.querySelector(".input");
const btn = document.querySelector(".btn");
const weatherImg = document.querySelector(".weatherData img");
const temp = document.querySelector(".weatherData h1");
const city = document.querySelector(".weatherData h2");
const humidity = document.querySelector(".humidity .right h2");
const wind = document.querySelector(".air .right h2");

function getWeather(cityName) {
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    fetch(apiURL)
    .then(response => response.json())
    .then(data => {
        if (!data || data.cod !== 200) {
            alert("City not found or something went wrong!");
            return;
        }

        temp.textContent = `${Math.round(data.main.temp)}°C`;
        city.textContent = data.name;
        humidity.textContent = `${data.main.humidity}%`;
        wind.textContent = `${data.wind.speed} Km/h`;
        input.value = "";

        const condition = data.weather[0].main.toLowerCase();
        if (condition.includes("clouds")) {
            weatherImg.src = "./image/clouds.png";
        } else if (condition.includes("rain")) {
            weatherImg.src = "./image/rain.png";
        } else if (condition.includes("clear")) {
            weatherImg.src = "./image/clear.png";
        } else if (condition.includes("snow")) {
            weatherImg.src = "./image/snow.png";
        } else {
            weatherImg.src = "./image/cloud.png";
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Something went wrong! Check your internet or API key.");
    });
}

btn.addEventListener("click", () => {
    const cityName = input.value.trim();
    if (cityName === "") return;
    getWeather(cityName);
});

// Load default weather for "karad"
window.addEventListener("load", () => {
    getWeather("karad");
});