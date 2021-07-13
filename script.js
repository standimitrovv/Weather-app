'use strict';

const btnSubmit = document.querySelector('#btn-submit');
const inputField = document.querySelector('.search__field');
const cityContainer = document.querySelector('#results');
const body = document.body;

const renderCountry = function (data) {
  const { name, sys, main, weather } = data;
  const { country } = data.sys;
  const { temp, temp_min, temp_max } = data.main;

  const formattedTemp = Math.round(temp);
  const formattedTempMin = Math.round(temp_min);
  const formattedTempMax = Math.round(temp_max);

  const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0].icon}.svg`;

  const weatherDescription = data.weather[0].description;
  const formattedWD = weatherDescription
    .split(' ')
    .map((el) => el[0].toUpperCase() + el.slice(1).toLowerCase())
    .join(' ');

  const li = document.createElement('li');
  li.innerHTML = `
  <li class="city-1">
    <h2 class="city__title">
      <p class="city__title-city">${name}</p>
      <sup class="city__title-capital">${country}</sup>
    </h2>
    <h3 class="city__temperature">
      <span class="city__temperature-digits">${formattedTemp}&deg;C </span>
      <div class="city__temperature-mm">
        <span class="city__temperature-min">${formattedTempMin} &deg; C</span>
        <span class="city__temperature-max">${formattedTempMax} &deg; C</span>
      </div>
    </h3>
    <figure class="city-description">
      <img
        src=${icon}
        alt="Description of the temperature at the moment"
        class="city-icon"
      />
      <figcaption class="city-temp-description">${formattedWD}</figcaption>
    </figure>
  </li>;
  `;
  results.appendChild(li);
};

// Function that happens when the users input is incorrect
const renderError = function () {
  const div = document.createElement('div');
  div.innerHTML = `
  
  <div class= 'fetch-error'>
    <p class= 'error-message'>Type error occurred, please type the correct name of the city you are looking for!</p>
    <button class='error-message-btn'>Understood!</button>  
  </div>
  <div class = 'overlay'></div>`;
  body.append(div);

  const btnSubmit = document.querySelector('.error-message-btn');
  btnSubmit.addEventListener('click', function () {
    div.classList.add('hidden');
    window.location.reload();
  });
};

// OLD WAY
// const Ajax = function (country) {
//   const apiKey = `YOUR API KEY GOES HERE`; //openweathermap.org is where you can get your key

//   fetch(
//     `https://api.openweathermap.org/data/2.5/weather?q=${country}&units=metric&appid=${apiKey}`
//   )
//     .then((res) => res.json())
//     .then((data) => {
//       renderCountry(data);
//     })
//     .catch(() => renderError());
// };

// NEW WAY
const Ajax = async function (country) {
  try {
    const apiKey = `YOUR API KEY GOES HERE`; //openweathermap.org is where you can get your key
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${country}&units=metric&appid=${apiKey}`
    );
    const data = await res.json();
    renderCountry(data);
  } catch {
    renderError();
  }
};

btnSubmit.addEventListener('click', function (e) {
  e.preventDefault();
  Ajax(inputField.value);
  inputField.value = '';
});
