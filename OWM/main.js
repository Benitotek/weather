"use strict";
const URL = "https://api.openweathermap.org/data/2.5/group?id=264371,2950159,3060972,2800866,3054643,2618425,2964574,658225,2267057,3196359,3117735,2988507,3067696,456172,3169070,2673730,588409,2761369,593116,756135&units=metric&lang=fr&mode=json&appid=aeec1a499fc3cabb60a097381a3f7355";
//const:APIKEY:*************

fetch(URL)
    .then(response => response.ok ? response.json() : Promise.reject(new Error("Network error!")))
    .then(obj => {
        console.log(obj);
        let out = document.querySelector('#out');
        // CONTAINER
        let container = document.createElement('div');
        container.id = 'container';
        obj.list.forEach(city => {
            // HTML Pattern :
            //
            // DIV#container (racine)
            //   DIV.tile (pour chaque ville)
            //     H1.cityName
            //     IMG
            //     P.description
            //     P.temp
            //
            //     DIV.details (tile's child)
            //       P.wind
            //         IMG
            //         SPAN
            //       P.humidity
            //         IMG
            //         SPAN
            //       P.fellsLike
            //
            // DIV.tile
            let front = document.createElement('div');
            front.classList.add('tile');
            // H1.cityName
            let cityName = document.createElement('h1');
            cityName.classList.add('cityName');
            cityName.textContent = city.name;
            front.append(cityName);
            // IMG icône
            let icon = new Image(100, 100);
            icon.src = `https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`;
            front.append(icon);
            // P.description
            let description = document.createElement('p');
            description.classList.add('description');
            description.textContent = city.weather[0].description;
            front.append(description);
            // P.temps
            let tempFront = document.createElement('p');
            tempFront.classList.add('temp');
            let tempMin = Math.round(city.main.temp_min);
            let tempMax = Math.round(city.main.temp_max);
            tempFront.textContent = `${tempMin}°C / ${tempMax}°C`;
            front.append(tempFront);
            // DETAILS
            let details = document.createElement('div');
            details.classList.add('details', 'off');
            // P.wind
            let wind = document.createElement('p');
            let imgWind = new Image(36, 20);
            imgWind.src = 'img/wind_36x20px.png';
            let txtWind = document.createElement('span');
            txtWind.textContent = `${Math.round(city.wind.deg)}° , ${Math.round(city.wind.speed)}m/s`;
            wind.append(imgWind, txtWind);
            details.append(wind);
            // P.humidity
            let humidity = document.createElement('p');
            let imgHumidity = new Image(13, 20);
            imgHumidity.src = 'img/humidity_13x20px.png';
            let txtHumidity = document.createElement('span');
            txtHumidity.textContent = `${Math.round(city.main.humidity)}%`;
            humidity.append(imgHumidity, txtHumidity);
            details.append(humidity);
            // P.fellsLike
            let feelsLike = document.createElement('p');
            feelsLike.textContent = `(${Math.round(city.main.feels_like)}°)`;
            feelsLike.classList.add('feelsLike');
            details.append(feelsLike);
            front.append(details);
            container.append(front);
            //AddEventListener()
            front.addEventListener('click', () => details.classList.toggle('off'));
        })
        out.append(container);
    })
    .catch((error) => console.log(error.message));




