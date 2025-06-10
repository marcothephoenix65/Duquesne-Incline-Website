$(document).ready(() => {
    const carouselImages = [
        "../static/fire gift shop web page 088.jpg",
        "../static/shot glasses resized 2.jpg",
        "../static/wood car resized 1.jpg",
        "../static/fire gift shop web page 089.jpg"
    ];

    let currentIndex = 0;
    const $carousel = $("#carousel");
    const $prevButton = $("#prev");
    const $nextButton = $("#next");

    function updateCarousel() {
        $carousel.fadeOut(300, () => {
            $carousel.attr("src", carouselImages[currentIndex]);
            $carousel.fadeIn(300);
        });
    }

    $prevButton.on("click", () => {
        currentIndex = (currentIndex - 1 + carouselImages.length) % carouselImages.length;
        updateCarousel();
    });

    $nextButton.on("click", () => {
        currentIndex = (currentIndex + 1) % carouselImages.length;
        updateCarousel();
    });

    updateCarousel();

    const weatherContainer = document.getElementById("weather");
    const weatherApiUrl = "https://api.open-meteo.com/v1/forecast?latitude=40.4406&longitude=-79.9959&current_weather=true&temperature_unit=fahrenheit&timezone=America%2FNew_York";

    async function fetchWeather() {
        try {
            const response = await fetch(weatherApiUrl);
            if (!response.ok) throw new Error("Failed to fetch weather data");
            const data = await response.json();
            displayWeather(data);
        } catch (error) {
            weatherContainer.innerHTML = `<p>Error fetching weather data: ${error.message}</p>`;
        }
    }

    function displayWeather(data) {
        const temperature = data.current_weather.temperature;
        weatherContainer.innerHTML = `
            <h3>Current Weather in Pittsburgh</h3>
            <p>Temperature: ${temperature}°F</p>
        `;
    }

    fetchWeather();

    $("#openFormButton").on("click", () => {
        $("#contactForm").toggle();
    });
});
