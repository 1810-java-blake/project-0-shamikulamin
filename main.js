

//Some Global variables

var longitude, latitude, timeHour, timeFull;

//Function to update weather information

//Check for Geoloaction support 

if (navigator.geolocation) {

	//Return the user's longitude and latitude on page load using HTML5 geolocation API

	window.onload = function () {
	var currentPosition;
	function getCurrentLocation (position) {
		
		currentPosition = position;
		latitude = currentPosition.coords.latitude;
		longitude = currentPosition.coords.longitude;
		var geocoder = new google.maps.Geocoder;
		var latlng = {lat: parseFloat(latitude), lng: parseFloat(longitude)};
        geocoder.geocode({'location': latlng}, function(results, status) {
          if (status === 'OK') {
            if (results[0]) {
			  console.log(results[0]);
			  let headLine = document.getElementById("headline");
			  headLine.innerHTML = " Current Conditions for: "+ results[0].address_components[3].long_name+", "+results[0].address_components[5].long_name;
            } else {
              window.alert('No results found');
            }
          } else {
            window.alert('Geocoder failed due to: ' + status);
          }
        });
		
		
		
	    var proxy = 'https://cors.io/?';
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
            setIcon(data.currently.icon);
            var d = new Date(data.currently.time*1000); // The 0 there is the key, which sets the date to the epoch
            console.log(d.toLocaleTimeString());
            time.innerHTML = d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
           
        })
        .catch(err => console.log(err));
 
    }
	navigator.geolocation.getCurrentPosition(getCurrentLocation);
	
	};
 
}

//If Geolocation is not supported by the browser, alert the user

else { 
	alert("Geolocation is not supported by your browser, download the latest Chrome or Firefox to use this app");
}
function setIcon(summary){
    let imgIcon = document.getElementById("weathObj");
    if(summary==="partly-cloudy-day"){
        imgIcon.src="img/svg/wi-day-cloudy.svg";
    }
    else if(summary==="partly-cloudy-night"){
        imgIcon.src="img/svg/wi-night-cloudy.svg";
    }
    else if(summary==="clear-day"){
        imgIcon.src="img/svg/wi-day-sunny.svg";
    }
    else if(summary==="wind"){
        imgIcon.src="img/svg/wi-windy.svg";
    }
    else if(summary==="rain"){
        imgIcon.src="img/svg/wi-rain.svg";
    }
    else if(summary==="cloudy"){
        imgIcon.src="img/svg/wi-cloud.svg";
    }
    else if(summary==="clear-night"){
        imgIcon.src="img/svg/wi-night-clear.svg";
    }
    else if(summary==="fog"){
        imgIcon.src="img/svg/wi-fog.svg";
	}
	else if(summary==="snow"){
		imgIcon.src="img/svg/wi-snow.svg";
	}
    
}

function subBut(){
	let input = document.getElementById("find-forcast");
	localStorage.setItem("searchParam",input.value);
	window.open ('daily.html','_self',false)
}

