let weathData;
let locData;
let count = 0;
let endCount = count +5;


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
        titleEd.innerHTML = "Hourly Forecast For: " +  data[0].formatted_address;  
        populate();
        
    })
    .catch(err => console.log(err));
}

function populate(){
    let rect = document.getElementById("rectBox");
    let summary = document.createElement("h2");
    let summaryText = document.createElement("h3");
    summary.style.textAlign = "center";
    summaryText.style.textAlign = "center";
    summary.innerHTML = "Day Summary";
    summaryText.innerHTML = weathData.hourly.summary;
    let imgIcon = document.createElement("img");
    
    setImage(imgIcon, weathData.hourly.icon);
    imgIcon.style.width = "70%";
    imgIcon.style.margin = "auto";
    imgIcon.style.display = "block";
    rect.appendChild(summary);
    rect.appendChild(imgIcon);
    rect.appendChild(summaryText);

    let mainDiv= document.getElementById("transbox");
    for(count; count<endCount; count++){
        let div = document.createElement("div");
        let hTime = document.createElement('h2');
        let summary = document.createElement('h4');
        let precip = document.createElement('h4');
        let humid = document.createElement('h4');
        let temperature = document.createElement('h1');
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
        div.style.right = "5%";

        mainDiv.parentNode.insertBefore(div,mainDiv.nextSibling);

        let d = new Date(weathData.hourly.data[count].time *1000); 
        let timeText = d.toLocaleTimeString([], {hour: '2-digit'});
        hTime.style.textAlign="center";
        div.appendChild(hTime);
        hTime.innerHTML=timeText;

        setImage(imgIcon, weathData.hourly.data[count].icon.trim())

    

        imgIcon.style.alignContent="center";
        div.appendChild(imgIcon);

        temperature.style.textAlign = "center";
        div.appendChild(temperature);
        temperature.innerHTML = Math.trunc(weathData.hourly.data[count].temperature)+"°F";

        summary.style.textAlign = "center";
        div.appendChild(summary);
        summary.innerHTML = weathData.hourly.data[count].summary;

        precip.style.textAlign = "center";
        div.appendChild(precip);
        precip.innerHTML ="Precipitation: " + Math.trunc(weathData.hourly.data[count].precipProbability*100) +"%";

        humid.style.textAlign = "center";
        div.appendChild(humid);
        humid.innerHTML ="Humidity: " + Math.trunc(weathData.hourly.data[count].humidity*100) +"%";

    }
    endCount = endCount + 5;
}

function subWeek(){
    window.open ('week.html','_self',false)
}

function home(){
    window.open ('index.html','_self',false)
}

function setImage(imgIcon, dat){
    if(dat==="partly-cloudy-day"){
        imgIcon.src="img/svg/wi-day-cloudy.svg";
    }
    else if(dat==="partly-cloudy-night"){
        imgIcon.src="img/svg/wi-night-cloudy.svg";
    }
    else if(dat==="clear-day"){
        imgIcon.src="img/svg/wi-day-sunny.svg";
    }
    else if(dat==="wind"){
        imgIcon.src="img/svg/wi-windy.svg";
    }
    else if(dat==="rain"){
        imgIcon.src="img/svg/wi-rain.svg";
    }
    else if(dat==="cloudy"){
        imgIcon.src="img/svg/wi-cloud.svg";
    }
    else if(dat==="clear-night"){
        imgIcon.src="img/svg/wi-night-clear.svg";
    }
    else if(dat==="fog"){
        imgIcon.src="img/svg/wi-fog.svg";
    }
    else if(dat==="snow"){
		imgIcon.src="img/svg/wi-snow.svg";
	}
}