// API anahtarınızı buraya ekleyin
const API_KEY = '61e5ca145b2a29a6720c45b8cf71dab7';

// DOM elementleri
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const cityName = document.getElementById('city-name');
const dateElement = document.getElementById('date');
const tempElement = document.getElementById('temp');
const weatherIcon = document.getElementById('weather-icon');
const weatherDesc = document.getElementById('weather-desc');
const windElement = document.getElementById('wind');
const humidityElement = document.getElementById('humidity');
const feelsLikeElement = document.getElementById('feels-like');
const pressureElement = document.getElementById('pressure');
const forecastContainer = document.getElementById('forecast-container');
const hourlyContainer = document.getElementById('hourly-container');

// Varsayılan şehir
let currentCity = 'İstanbul';

// Sayfa yüklendiğinde varsayılan şehir için hava durumunu getir
document.addEventListener('DOMContentLoaded', () => {
    getWeatherData(currentCity);
    updateDate();
    // Kullanıcının sistem temasını kontrol et
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-theme');
    }
});

// Arama butonu event listener
searchBtn.addEventListener('click', () => {
    const city = searchInput.value.trim();
    if (city) {
        currentCity = city;
        getWeatherData(city);
        searchInput.value = '';
    }
});

// Enter tuşu ile arama yapma
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = searchInput.value.trim();
        if (city) {
            currentCity = city;
            getWeatherData(city);
            searchInput.value = '';
        }
    }
});

// Hava durumu verilerini getirme fonksiyonu
async function getWeatherData(city) {
    try {
        // Mevcut hava durumu
        const currentWeatherResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}&lang=tr`
        );
        
        if (!currentWeatherResponse.ok) {
            throw new Error('Şehir bulunamadı');
        }
        
        const currentWeatherData = await currentWeatherResponse.json();
        displayCurrentWeather(currentWeatherData);
        
        // 5 günlük tahmin
        const forecastResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}&lang=tr`
        );
        
        const forecastData = await forecastResponse.json();
        displayForecast(forecastData);
        displayHourlyForecast(forecastData);
        
    } catch (error) {
        alert(error.message);
        console.error('Hava durumu verileri alınırken hata:', error);
    }
}

// Mevcut hava durumunu gösterme fonksiyonu
function displayCurrentWeather(data) {
    cityName.textContent = data.name;
    tempElement.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDesc.textContent = data.weather[0].description;
    windElement.textContent = `${(data.wind.speed * 3.6).toFixed(1)} km/s`;
    humidityElement.textContent = `${data.main.humidity}%`;
    feelsLikeElement.textContent = `${Math.round(data.main.feels_like)}°C`;
    pressureElement.textContent = `${data.main.pressure} hPa`;
    
    // Hava durumu ikonu
    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    weatherIcon.alt = data.weather[0].description;
    
    // Temayı hava durumuna göre ayarla
    setWeatherTheme(data.weather[0].main);
    
    // Particles.js animasyonunu hava durumuna göre güncelle
    initParticles(data.weather[0].main);
}

// 5 günlük tahmini gösterme fonksiyonu
function displayForecast(data) {
    forecastContainer.innerHTML = '';
    
    // Her gün için bir tahmin kartı oluştur
    for (let i = 0; i < data.list.length; i += 8) {
        const forecast = data.list[i];
        const date = new Date(forecast.dt * 1000);
        const dayName = getDayName(date.getDay());
        
        const forecastDayElement = document.createElement('div');
        forecastDayElement.className = 'forecast-day';
        
        forecastDayElement.innerHTML = `
            <p>${dayName}</p>
            <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png" alt="${forecast.weather[0].description}">
            <p>${forecast.weather[0].description}</p>
            <div class="forecast-temp">
                <span>${Math.round(forecast.main.temp_max)}°</span>
                <span>${Math.round(forecast.main.temp_min)}°</span>
            </div>
        `;
        
        forecastContainer.appendChild(forecastDayElement);
    }
}

// Saatlik tahmini gösterme fonksiyonu
function displayHourlyForecast(data) {
    hourlyContainer.innerHTML = '';
    
    // Sonraki 12 saat için tahmin göster
    for (let i = 0; i < 12; i++) {
        const forecast = data.list[i];
        const date = new Date(forecast.dt * 1000);
        const hours = date.getHours().toString().padStart(2, '0') + ':00';
        
        const hourlyItem = document.createElement('div');
        hourlyItem.className = 'hourly-item';
        
        hourlyItem.innerHTML = `
            <p>${hours}</p>
            <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png" alt="${forecast.weather[0].description}">
            <p class="hourly-temp">${Math.round(forecast.main.temp)}°</p>
            <p><i class="fas fa-tint"></i> ${forecast.main.humidity}%</p>
        `;
        
        hourlyContainer.appendChild(hourlyItem);
    }
}

// Hava durumuna göre tema ayarla
function setWeatherTheme(weatherType) {
    const body = document.body;
    body.className = ''; // Tüm tema class'larını temizle
    
    const weatherTypeLower = weatherType.toLowerCase();
    
    if (weatherTypeLower.includes('clear')) {
        body.classList.add('weather-sunny');
    } else if (weatherTypeLower.includes('rain') || weatherTypeLower.includes('drizzle')) {
        body.classList.add('weather-rainy');
    } else if (weatherTypeLower.includes('snow')) {
        body.classList.add('weather-snowy');
    } else if (weatherTypeLower.includes('thunderstorm')) {
        body.classList.add('weather-stormy');
    } else if (weatherTypeLower.includes('cloud')) {
        body.classList.add('weather-cloudy');
    } else {
        body.classList.add('weather-sunny'); // Varsayılan tema
    }
}

// Gün adını Türkçe olarak döndürme fonksiyonu
function getDayName(dayIndex) {
    const days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
    return days[dayIndex];
}

// Tarihi güncelleme fonksiyonu
function updateDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = now.toLocaleDateString('tr-TR', options);
}

// Particles.js konfigürasyonu
function initParticles(weatherType) {
    const weatherTypeLower = weatherType.toLowerCase();
    let particlesConfig = {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
            move: { enable: true, speed: 2, direction: "none", random: false, straight: false, out_mode: "out", bounce: false }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "grab" },
                onclick: { enable: true, mode: "push" },
                resize: true
            },
            modes: {
                grab: { distance: 140, line_linked: { opacity: 1 } },
                push: { particles_nb: 4 }
            }
        },
        retina_detect: true
    };

    // Hava durumuna göre partikül ayarları
    if (weatherTypeLower.includes('rain')) {
        particlesConfig.particles.number.value = 100;
        particlesConfig.particles.color.value = "#a8d0e6";
        particlesConfig.particles.move.speed = 5;
        particlesConfig.particles.line_linked.color = "#374785";
    } else if (weatherTypeLower.includes('snow')) {
        particlesConfig.particles.number.value = 150;
        particlesConfig.particles.color.value = "#ffffff";
        particlesConfig.particles.move.speed = 2;
        particlesConfig.particles.line_linked.color = "#a8d0e6";
    } else if (weatherTypeLower.includes('clear')) {
        particlesConfig.particles.number.value = 80;
        particlesConfig.particles.color.value = "#f8e9a1";
        particlesConfig.particles.move.speed = 3;
        particlesConfig.particles.line_linked.color = "#f8e9a1";
    } else if (weatherTypeLower.includes('cloud')) {
        particlesConfig.particles.number.value = 60;
        particlesConfig.particles.color.value = "#d3d3d3";
        particlesConfig.particles.move.speed = 1;
        particlesConfig.particles.line_linked.color = "#b1b1b1";
    }

    particlesJS("particles-js", particlesConfig);
}