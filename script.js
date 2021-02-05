/*
Project Outline:
    3 Components:
      1. Side bar (Search, list of last cities saved in local storage);
      2. Main forecast window for today;
      3. The 5 day forecast

What is needed for each component:
    1) Define query selectors to grab all elements within the aside tag (Seach bar, seach button, list under)
       Save input into local storage and use it to call and API for a selected city;
       Display previously searched cities into the list below
    2,3) Define query selectors and grab all elements within the main tag (main card, all other cards and contents within them)
    
    */
   // 2 Event Listeners: 1. Search button event listener. 
//                      citySearch.addEventListener("click", function(){
                        //  returnWeather(cityInput.value)                      
//                      })

// 2. List selection event listeners
                    //  selectionSearch.addEventListener("click", function(event){
                        // var selection = event.target.value
                        // returnWeather(selection)
                    //  })
// 1 Function(Contents): 

var cityInput = document.querySelector("#cityInput");
var citySearch = document.querySelector("#citySearch");
var cityList = document.querySelector(".list-group")
var listElements = document.querySelectorAll(".list-group-item")
var now = dayjs().format('M/D/YYYY');
var latitude;
var longtitude;

// Event listener for the search button
citySearch.addEventListener("click", function(){
    
    if(!cityInput.value){
        return false
    } else {
        document.querySelector(".container").removeAttribute("hidden")
    }
    var listChildren = cityList.childElementCount 
    if(listChildren < 8){
       var listEl = document.createElement("li");
       listEl.setAttribute("class", "list-group-item");
       cityList.appendChild(listEl)
       listEl.innerText = cityInput.value;
    }

    returnWeather(cityInput.value)
    
})


cityList.addEventListener("click", function(event){
    var selection = event.target.innerText
    returnWeather(selection)
})


function returnWeather(city){
    var mycurrentApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=1a405d4fc9d4c973885993e6c7f9787c`
fetch(mycurrentApi).then(function(response){
    return response.json()
}).then(function(data){
    document.querySelector("#mainIcon").removeAttribute("hidden")
    document.getElementById("mainIcon").setAttribute("src",`http://openweathermap.org/img/w/${data.weather[0].icon}.png`)
    document.querySelector(".card-title").innerText = data.name + ' ' + '(' + now + ')';
    document.querySelector("#temperature").innerText = 'Temperature - ' + data.main.temp + ' Farenheit'
    document.querySelector("#humidity").innerText = 'Humidity - ' + data.main.humidity + '%'
    document.querySelector("#windSpeed").innerText = 'Wind speed - ' + data.wind.speed + 'MPH'
    
    latitude = parseFloat(data.coord.lat)
    longtitude = parseFloat(data.coord.lon)
    returnUVindex(latitude,longtitude)
    
});
var idS = ['1','2','3','4','5']
var myfutureApi;
for( var i = 0; i < idS.length; i++ ){
    myfutureApi = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&cnt=${8*idS[i]}&appid=1a405d4fc9d4c973885993e6c7f9787c`
}
fetch(myfutureApi).then(function(response){
    return response.json();
 }).then(function(data){ 
    //  console.log(data.list[8*idS[i]]
    for(var i = 0; i < idS.length; i++ ){
    //console.log(8*idS[i]-1)
    document.getElementById('icon'+idS[i]).setAttribute("src",`http://openweathermap.org/img/w/${data.list[8*idS[i]-1].weather[0].icon}.png`)
    document.getElementById('date'+idS[i]).innerText = dayjs.unix(data.list[8*idS[i]-1].dt).format(`M/D/YYYY`)
    document.getElementById('temp'+idS[i]).innerText = 'Temp: ' + data.list[8*idS[i]-1].main.temp + ' Farenheit'
    document.getElementById('humid'+idS[i]).innerText = 'Humidity: ' + data.list[8*idS[i]-1].main.humidity + '%'
    }
 })
}

function returnUVindex(lat,lon){
    var mycurrentApi = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=1a405d4fc9d4c973885993e6c7f9787c`
    fetch(mycurrentApi).then(function(response){
        return response.json()
    }).then(function(data){
        
        document.querySelector("#uvIndex").textContent = 'UV Index: ' + data.value
        
    });
}

 
    
   
