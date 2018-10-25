let weathData;
let locData;
let count = 0;
let endCount = count+7;


let searchInput = localStorage.getItem("searchParam");

var geocoder = new google.maps.Geocoder();

geocoder.geocode({'address': searchInput}, function(results, status) {
    if (status === 'OK') {
        console.log(results[0]);
        getWeather(results);
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });


function getWeather(data){
    let proxy = 'https://cors.io/?';
    var apiKey = "530de0ed2ee426d55a42c30ae338d895";
    
    fetch(proxy+"https://api.darksky.net/forecast/"+ apiKey+"/"+ data[0].geometry.location.lat()+","+ data[0].geometry.location.lng())
    .then(res =>res.json())
    .then(weathDat => {
        console.log(weathDat);
        weathData = weathDat;
        let titleEd = document.getElementById("headline");
      //  console.log("Weekly Forecast For: " + data[0].address.city +", "+ data[0].address.state);
        titleEd.innerHTML = "5-Day Forecast For: " + data[0].formatted_address;  // Add day summary
        populate();
        

        

      /*  let temp = document.getElementById("temp-fahrenheit hidden");
        let cond = document.getElementById("weather-condition");
        let time = document.getElementById("local-time");
        console.log(data);
        temp.innerHTML=Math.trunc(data.currently.apparenttemperatureHigh)+"°F";
        cond.innerHTML= data.currently.summary;
        setIcon(data.currently.summary);
        var d = new Date(data.currently.time*1000); // The 0 there is the key, which sets the date to the epoch
        console.log(d.toLocaleTimeString());
        time.innerHTML = d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});*/
        
    })
    .catch(err => console.log(err));
}

function populate(){
    let mainDiv= document.getElementById("transbox");
    for(count; count<endCount; count++){
        let div = document.createElement("div");
        let hDay = document.createElement('h2');
        let hDate = document.createElement("h1");
        let summary = document.createElement('h4');
        let precip = document.createElement('h4');
        let humid = document.createElement('h4');
        let temperatureHigh = document.createElement('h1');
        let temperatureLow = document.createElement('h2');
        let imgIcon = document.createElement('img');


        div.style.width = "12%";
        div.style.height = "24%";
        div.style.marginRight = "2%";
        div.style.marginBottom = "2%";
        div.style.color = "white";
        div.style.background = "background: #141414;";
        div.style.boxShadow = "0 0 15px 10px #141414";
        div.style.cssFloat = "right";
        div.style.opacity = "0.6";
        div.style.position = "relative";
        div.style.left = "20%";

        mainDiv.parentNode.insertBefore(div,mainDiv.nextSibling);

        let d = new Date(weathData.daily.data[count].time *1000); 
        let timeText = d.toLocaleTimeString([], {hour: '2-digit'});

        var timestamp = Number(new Date()) //1479895361931

        var date = new Date(timestamp)

        let str = d.toDateString();
        let lastIndex = str.lastIndexOf(" ");
        let finalDate = str.substring(0, lastIndex);

        var words = finalDate.split(" ");

        hDay.style.textAlign="center";
        hDay.style.marginTop="-35px";
        hDate.style.textAlign="center";
        div.appendChild(hDate);
        div.appendChild(hDay);
        hDay.innerHTML=words[0];
        hDate.innerHTML=words[1] + " "+ words[2];

        if(weathData.daily.data[count].icon.trim()==="partly-cloudy-day"){
            imgIcon.src="img/svg/wi-day-cloudy.svg";
        }
        else if(weathData.daily.data[count].icon.trim()==="partly-cloudy-night"){
            imgIcon.src="img/svg/wi-night-cloudy.svg";
        }
        else if(weathData.daily.data[count].icon.trim()==="clear-day"){
            imgIcon.src="img/svg/wi-day-sunny.svg";
        }
        else if(weathData.daily.data[count].icon.trim()==="wind"){
            imgIcon.src="img/svg/wi-windy.svg";
        }
        else if(weathData.daily.data[count].icon.trim()==="rain"){
            imgIcon.src="img/svg/wi-rain.svg";
        }
        else if(weathData.daily.data[count].icon.trim()==="cloudy"){
            imgIcon.src="img/svg/wi-cloud.svg";
        }

        imgIcon.style.alignContent="center";
        imgIcon.style.marginTop = "-30px";
        div.appendChild(imgIcon);

        temperatureHigh.style.textAlign = "center";
        temperatureHigh.style.marginTop = "-30px";
        div.appendChild(temperatureHigh);
        temperatureHigh.innerHTML ="High: " + Math.trunc(weathData.daily.data[count].temperatureHigh)+"°F";

        temperatureLow.style.textAlign = "center";
        temperatureLow.style.marginTop = "-30px";
        div.appendChild(temperatureLow);
        temperatureLow.innerHTML ="Low: " + Math.trunc(weathData.daily.data[count].temperatureLow)+"°F";

        summary.style.textAlign = "center";
        div.appendChild(summary);
        summary.innerHTML = weathData.daily.data[count].summary;

        precip.style.textAlign = "center";
        div.appendChild(precip);
        precip.innerHTML ="Precipitation: " + Math.trunc(weathData.daily.data[count].precipProbability*100) +"%";

        humid.style.textAlign = "center";
        div.appendChild(humid);
        humid.innerHTML ="Humidity: " + Math.trunc(weathData.daily.data[count].humidity*100) +"%";

    }
    endCount = endCount + 5;
}

function subWeek(){
    window.open ('week.html','_self',false)
}