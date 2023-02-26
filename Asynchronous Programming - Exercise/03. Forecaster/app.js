function attachEvents() {
    const getWetherBtn = document.querySelector("#submit");
    const location = document.querySelector("#location");
    const forecastDiv = document.querySelector("#forecast");
    const currentDiv = document.querySelector("#current");
    const upcomingDiv = document.querySelector("#upcoming");
  
    const conditionSymbols = {
      Sunny: "&#x2600;",
      "Partly sunny": "&#x26C5;",
      Overcast: "&#x2601;",
      Rain: "&#x2614;",
      Degrees: "&#176;",
    };
  
    getWetherBtn.addEventListener("click", getWetherHendler);
  
    function getWetherHendler(event) {
      let currentLocation = location.value;
  
      fetch(`http://localhost:3030/jsonstore/forecaster/locations`)
        .then((response) => response.json())
        .then((data) => responseHendler(data, currentLocation))
        .catch((err) => console.log(err));
    }
  
    function responseHendler(data, currentLocation) {
      let match = false;
      data.forEach((item) => {
        if (item.name === currentLocation) {
          getCurrentConditions(item.code);
          get3Days(item.code);
          match = true;
        }
      });
    }
  
    function getCurrentConditions(code) {
      fetch(`http://localhost:3030/jsonstore/forecaster/today/${code}`)
        .then((res) => res.json())
        .then((data) => {
          let fullLocationName = data.name;
          let condition = data.forecast.condition;
          let high = data.forecast.high;
          let low = data.forecast.low;
          buildCurrentCondition(fullLocationName, condition, high, low);
        })
        .catch((err) => console.log(err));
    }
  
    function get3Days(code) {
      fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${code}`)
        .then((res) => res.json())
        .then((data) => {
          let name = data.name;
          let forecast = data.forecast;
          build3DaysForcast(name, forecast);
        })
        .catch((err) => console.log(err));
    }
  
    function build3DaysForcast(name, forecast) {
      const mainDiv = document.createElement("div");
      mainDiv.classList.add("forecast-info");
      upcomingDiv.appendChild(mainDiv);
      for (let item in forecast) {
        let condition = forecast[item].condition;
        let high = forecast[item].high;
        let low = forecast[item].low;
  
        let upcomingSpan = document.createElement("span");
        
        let symbolSpan = document.createElement("span"); 
        let forcastDataSpan1 = document.createElement("span");
        let forcastDataSpan2 = document.createElement("span");
  
        upcomingSpan.classList.add("upcoming"); 
        symbolSpan.classList.add("symbol");
        forcastDataSpan1.classList.add("forecast-data");
        forcastDataSpan2.classList.add("forecast-data");
  
        symbolSpan.innerHTML = conditionSymbols[condition];
        forcastDataSpan1.innerHTML = `${low}${conditionSymbols["Degrees"]}/${high}${conditionSymbols["Degrees"]}`
        forcastDataSpan2.innerHTML = `${condition}`;
  
        upcomingSpan.appendChild(symbolSpan);
        upcomingSpan.appendChild(forcastDataSpan1);
        upcomingSpan.appendChild(forcastDataSpan2);
  
        mainDiv.appendChild(upcomingSpan);
      }
    }
  
    function buildCurrentCondition(fullLocationName, condition, high, low) {
      
  
      forecastDiv.style.display = "block";
  
      const mainDiv = document.createElement("div");
      const symbolSpan = document.createElement("span");
      const conditionSpan = document.createElement("span");
      const spanDate1 = document.createElement("span");
      const spanDate2 = document.createElement("span");
      const spanDate3 = document.createElement("span");
  
      mainDiv.classList.add("forecasts");
      symbolSpan.classList.add("condition");
      symbolSpan.classList.add("symbol");
      conditionSpan.classList.add("condition");
      spanDate1.classList.add("forecast-data");
      spanDate2.classList.add("forecast-data");
      spanDate3.classList.add("forecast-data");
  
      symbolSpan.innerHTML = conditionSymbols[condition];
      spanDate1.textContent = fullLocationName;
      spanDate2.innerHTML = `${low}${conditionSymbols["Degrees"]}/${high}${conditionSymbols["Degrees"]}`;
      spanDate3.textContent = condition;
  
      conditionSpan.appendChild(spanDate1);
      conditionSpan.appendChild(spanDate2);
      conditionSpan.appendChild(spanDate3);
  
      mainDiv.appendChild(symbolSpan);
      mainDiv.appendChild(conditionSpan);
  
      currentDiv.appendChild(mainDiv);
    }
  }
  
  attachEvents();
  
 