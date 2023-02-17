const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

//事件監聽點擊觸發功能
search.addEventListener("click", () => {
  const APIKey = "8c15f5127fda7e875b24210217dc35cc";
  const city = document.querySelector(".search-box input").value;
  //如輸入空值則直接return
  if (city === "") return;

  //api
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      //如回傳404，將天氣資訊隱藏，顯示錯誤頁面
      if (json.cod === "404") {
        container.style.height = "400px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error404.style.display = "block";
        error404.classList.add("fade-in");
        return;
      }

      //輸入值正確，隱藏404頁面，已添加fade-in移除
      error404.style.display = "none";
      error404.classList.remove("fade-in");
      const date = document.querySelector(".weather-box .date");
      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");

      //依據傳回資訊顯示對應的天氣圖片
      switch (json.weather[0].main) {
        case "Clear":
          image.src = "images/clear.png";
          break;

        case "Rain":
          image.src = "images/rain.png";
          break;

        case "Snow":
          image.src = "images/snow.png";
          break;

        case "Clouds":
          image.src = "images/cloud.png";
          break;

        case "Haze":
          image.src = "images/mist.png";
          break;

        default:
          image.src = "";
      }
      //依據傳回資訊顯示對應的數值
      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
      //天氣資訊不隱藏，顯示天氣頁面
      weatherBox.style.display = "";
      weatherDetails.style.display = "";
      weatherBox.classList.add("fade-in");
      weatherDetails.classList.add("fade-in");
      container.style.height = "590px";
    });
});
