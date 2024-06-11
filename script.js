const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';

document.addEventListener('DOMContentLoaded', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            getWeatherByLocation(lat, lon);
        });
    }
});

function getWeatherByLocation(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => console.error('Error fetching weather data:', error));
}

function getWeatherByInput() {
    const location = document.getElementById('locationInput').value;
    if (location) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`)
            .then(response => response.json())
            .then(data => displayWeather(data))
            .catch(error => console.error('Error fetching weather data:', error));
    }
}

function displayWeather(data) {
    const weatherDataDiv = document.getElementById('weatherData');
    if (data.cod === 200) {
        weatherDataDiv.innerHTML = `
            <p><strong>${data.name}, ${data.sys.country}</strong></p>
            <p>${data.weather[0].description}</p>
            <p>Temperature: ${data.main.temp} °C</p>
            <p>Humidity: ${data.main.humidity} %</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
    } else {
        weatherDataDiv.innerHTML = `<p>${data.message}</p>`;
    }
}
