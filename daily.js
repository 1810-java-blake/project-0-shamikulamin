let weathData;
let locData;
let count = 0;
let endCount = count +5;


let searchInput = localStorage.getItem("searchParam");
let proxy = 'https://cors-anywhere.herokuapp.com/';
//let proxy = 'https://cors.io/?';
fetch(proxy+"https://nominatim.openstreetmap.org/search?q="+searchInput+"&format=json&polygon=1&addressdetails=1")
.then(res =>res.json())
.then(data => {
    console.log(data);
    locData=data;
    getWeather(data);  
    
})
.catch(err => console.log(err));

function getWeather(data){
    let proxy = 'https://cors-anywhere.herokuapp.com/';
    //let proxy = 'https://cors.io/?';
    var apiKey = "530de0ed2ee426d55a42c30ae338d895";
    
    fetch(proxy+"https://api.darksky.net/forecast/"+ apiKey+"/"+ data[0].lat+","+ data[0].lon)
    .then(res =>res.json())
    .then(weathDat => {
        console.log(weathDat);
        weathData = weathDat;
        let titleEd = document.getElementById("headline");
        console.log("Hourly Forecast For: " + data[0].address.city +", "+ data[0].address.state);
        titleEd.innerHTML = "Hourly Forecast For: " + data[0].address.city +", "+ data[0].address.state;  // Add day summary
        populate();
        

        

      /*  let temp = document.getElementById("temp-fahrenheit hidden");
        let cond = document.getElementById("weather-condition");
        let time = document.getElementById("local-time");
        console.log(data);
        temp.innerHTML=Math.trunc(data.currently.apparentTemperature)+"°F";
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
        let hTime = document.createElement('h2');
        let summary = document.createElement('h4');
        let precip = document.createElement('h4');
        let humid = document.createElement('h4');
        let temperature = document.createElement('h1');
        let imgIcon = document.createElement('img');


        div.style.width = "225px";
        div.style.height = "550px";
        div.style.marginRight = "50px";
        div.style.marginBottom = "50px";
        div.style.color = "white";
        div.style.background = "background: #141414;";
        div.style.boxShadow = "0 0 15px 10px #141414";
        div.style.cssFloat = "right";
        div.style.opacity = "0.6";
     //   myimg.parentNode.insertBefore(text, myimg.nextSibling)
        mainDiv.parentNode.insertBefore(div,mainDiv.nextSibling);

        let d = new Date(weathData.hourly.data[count].time *1000); // The 0 there is the key, which sets the date to the epoch
        let timeText = d.toLocaleTimeString([], {hour: '2-digit'});
        hTime.style.textAlign="center";
        div.appendChild(hTime);
        hTime.innerHTML=timeText;
        if(weathData.hourly.data[count].summary.trim()==="Mostly Cloudy"){
            imgIcon.src="img/svg/wi-day-cloudy-high.svg";
        }
        else if(weathData.hourly.data[count].summary.trim()==="Partly Cloudy"){
            imgIcon.src="img/svg/wi-cloudy.svg";
        }
        else if(weathData.hourly.data[count].summary.trim()==="Rain"){
            imgIcon.src="img/svg/wi-rain.svg";
        }
        else if(weathData.hourly.data[count].summary.trim()==="Light Rain"){
            imgIcon.src="img/svg/wi-showers.svg";
        }

        imgIcon.style.alignContent="center";
        div.appendChild(imgIcon);
        /*********Picture Element NEXT!!! */
        /******************************** */
        /******************************** */
        /******************************** */
        /******************************** */
        /******************************** */

        temperature.style.textAlign = "center";
        div.appendChild(temperature);
        temperature.innerHTML = Math.trunc(weathData.hourly.data[count].temperature)+"°F";

        summary.style.textAlign = "center";
        div.appendChild(summary);
        summary.innerHTML = weathData.hourly.data[count].summary;

        precip.style.textAlign = "center";
        div.appendChild(precip);
        precip.innerHTML ="Precipitation: " + weathData.hourly.data[count].precipProbability*100 +"%";

        humid.style.textAlign = "center";
        div.appendChild(humid);
        humid.innerHTML ="Humidity: " + weathData.hourly.data[count].humidity*100 +"%";


        /* #transbox{
            margin: 25px 10px;
            width: 100px;
            height: 100px;
            background: #141414;
            opacity: 0.6;
            box-shadow: 0 0 15px 10px #141414;
} */
    }
    endCount = endCount + 5;
}