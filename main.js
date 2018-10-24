

//Some Global variables

var longitude, latitude, timeHour, timeFull;

//Function to update weather information

function updateWeather (json) {

	longitude = json.coord.lon;
	latitude = json.coord.lat;

	//AJAX request

	$.getJSON('http://api.geonames.org/timezoneJSON?lat=' + latitude + '&lng=' + longitude + '&username=ayoisaiah', function(timezone) {
			var rawTimeZone = JSON.stringify(timezone);
			var parsedTimeZone = JSON.parse(rawTimeZone);
			var dateTime = parsedTimeZone.time;
			timeFull = dateTime.substr(11);
			$(".local-time").html(timeFull); //Update local time
			timeHour = dateTime.substr(-5, 2);
	});

	//Update Weather parameters and location

	$(".weather-condition").html(json.weather[0].description);
var temp = [(json.main.temp - 273.15).toFixed(0) + "°C", (1.8 * (json.main.temp - 273.15) + 32).toFixed(0) + "F"];
	$(".temp-celsius").html(temp[0]);
	$(".temp-fahrenheit").html(temp[1]);
	$(".temperature").click(function () {
		$(".temp-celsius").toggle();
		$(".temp-fahrenheit").toggle();
	});
	$(".location").html("for " + json.name);

	//Update Weather animation based on the returned weather description

	var weather = json.weather[0].description;
	
	if(weather.indexOf("rain") >= 0) {
		skycons.set("animated-icon", Skycons.RAIN);
	}

	else if (weather.indexOf("sunny") >= 0) {
		skycons.set("animated-icon", Skycons.CLEAR_DAY);
	}

	else if (weather.indexOf("clear") >= 0) {
		if (timeHour >= 7 && timeHour < 20) {
			skycons.set("animated-icon", Skycons.CLEAR_DAY);
		}

		else {
			skycons.set("animated-icon", Skycons.CLEAR_NIGHT);
		}		
	}

	else if (weather.indexOf("cloud") >= 0) {
		if (timeHour >= 7 && timeHour < 20) {
			skycons.set("animated-icon", Skycons.PARTLY_CLOUDY_DAY);
		}

		else {
			skycons.set("animated-icon", Skycons.PARTLY_CLOUDY_NIGHT);
		}	
	}

	else if (weather.indexOf("thunderstorm") >= 0) {
		skycons.set("animated-icon", Skycons.SLEET);
	}

	else if (weather.indexOf("snow") >= 0) {
		skycons.set("animated-icon", Skycons.SNOW);
	}
}

//Check for Geoloaction support 

if (navigator.geolocation) {

	//Return the user's longitude and latitude on page load using HTML5 geolocation API

	window.onload = function () {
	var currentPosition;
	function getCurrentLocation (position) {
		currentPosition = position;
		latitude = currentPosition.coords.latitude;
        longitude = currentPosition.coords.longitude;
        var proxy = 'https://cors-anywhere.herokuapp.com/';
        var apiKey = "530de0ed2ee426d55a42c30ae338d895";
        
        fetch(proxy+"https://api.darksky.net/forecast/"+ apiKey+"/"+ latitude+","+ longitude)
        .then(res =>res.json())
        .then(data => {
            let temp = document.getElementById("temp-fahrenheit hidden");
            let cond = document.getElementById("weather-condition");
            let time = document.getElementById("local-time");
            console.log(data);
            temp.innerHTML=Math.trunc(data.currently.apparentTemperature)+"°F";
            cond.innerHTML= data.currently.summary;
            setIcon(data.currently.summary);
            var d = new Date(data.currently.time*1000); // The 0 there is the key, which sets the date to the epoch
            console.log(d.toLocaleTimeString());
            time.innerHTML = d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
           
        })
        .catch(err => console.log(err));
 
    }
	navigator.geolocation.getCurrentPosition(getCurrentLocation);
	
	};

	//Find a Forcast
	
/*	$("form").on("submit", function(event) {
        event.preventDefault();
    
    console.log("HERE");

    var location = document.getElementById("location");
    var apiKey = "530de0ed2ee426d55a42c30ae338d895";
    var url = "https://api.darksky.net/forecast/";

    //https://api.darksky.net/forecast/530de0ed2ee426d55a42c30ae338d895/37.8267,-122.4233
  
    navigator.geolocation.getCurrentPosition(success, error);
  
    function success(position) {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
  
      location.innerHTML =
        "Latitude is " + latitude + "° Longitude is " + longitude + "°";
  
      $.getJSON(
        url + apiKey + "/" + latitude + "," + longitude + "?callback=?",
        function(data) {
            $(".temp-fahrenheit hidden").html(data.currently.temperature + "° F");
        //  $("#temp").html(data.currently.temperature + "° F");
         // $("#minutely").html(data.minutely.summary);
        }
      );
    
  
    function error() {
      location.innerHTML = "Unable to retrieve your location";
    }
  
    location.innerHTML = "Locating...";
  }
  
  weather();
  
  
	/*	var city = $(".find-forcast").val(); //Get value from form input
		document.getElementById("my-form").reset();
		
		//AJAX Request

		$.getJSON("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=188b68e6b443a5380ce7ee0f0bb49cfc", function (data) {
			var rawJson = JSON.stringify(data);
			var json = JSON.parse(rawJson);
			updateWeather(json); //Update Weather parameters
		});
    }
    );*/
}

//If Geolocation is not supported by the browser, alert the user

else { 
	alert("Geolocation is not supported by your browser, download the latest Chrome or Firefox to use this app");
}
function setIcon(summary){
    let imgIcon = document.getElementById("weathObj");
    if(summary.trim()==="Mostly Cloudy"){
        imgIcon.src="img/svg/wi-day-cloudy-high.svg";
    }
    else if(summary.trim()==="Partly Cloudy"){
        imgIcon.src="img/svg/wi-cloudy.svg";
    }
    
}

function subBut(){
	let input = document.getElementById("find-forcast");
	localStorage.setItem("searchParam",input.value);
	window.open ('daily.html','_self',false)
}

