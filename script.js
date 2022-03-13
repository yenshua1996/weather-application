(() => {
  //Target Element
  const formPanel = document.querySelector(".form-panel");
  const cityInput = document.querySelector("#city");
  const weatherDetail = document.querySelector(".weather-detail");
  const defaultCity = "manila";

  //Fetch City
  const fetchCityWeather = async (city, fn) => {
    //Api key
    const api_key = "7e52ce2a91312e9d6fac34c0b8c660b8";

    //Check
    if (!city) {
      alert("Please put the city you want to find.");
    } else {
      //fetch
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`
      );

      //parse
      const data = await response.json();

      //callback fn
      fn(data);
    }
  };

  //Render function
  const renderToView = (data, parentElement) => {
    //empty parent html
    parentElement.innerHTML = "";

    //construct html markup
    const html = ` 
    <div class="weather-content">
        <h2 class="city-name">${data.name} City - ${data.sys.country}</h2>

        <p class="city-temp">${data.main.temp} 🌡</p>
    </div>
    `;

    //append html markup to parent
    parentElement.insertAdjacentHTML("afterbegin", html);
  };

  //DOM load event
  document.addEventListener("DOMContentLoaded", () => {
    //empty parent element
    weatherDetail.innerHTML = "";

    //fetch
    fetchCityWeather(defaultCity, (response) => {
      renderToView(response, weatherDetail);
    });
  });

  //Listen to submit event
  formPanel.addEventListener("submit", (e) => {
    //prevent default
    e.preventDefault();

    //check
    if (!cityInput.value) {
      alert("Please put the city you want to find!");
    } else {
      //transform string
      const query = cityInput.value.replaceAll(" ", "+");

      //call fetch function
      fetchCityWeather(query, (response) => {
        renderToView(response, weatherDetail);
      });

      //empty input
      cityInput.value = "";
    }
  });
})();
