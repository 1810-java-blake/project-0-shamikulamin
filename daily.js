let searchInput = localStorage.getItem("searchParam");
let proxy = 'https://cors-anywhere.herokuapp.com/';
fetch(proxy+"https://nominatim.openstreetmap.org/search?q="+searchInput+"&format=json&polygon=1&addressdetails=1")
.then(res =>res.json())
.then(data => {
    getWeather(data);
    
    
})
.catch(err => console.log(err));

function getWeather(data){
    var proxy = 'https://cors-anywhere.herokuapp.com/';
    var apiKey = "530de0ed2ee426d55a42c30ae338d895";
    
    fetch(proxy+"https://api.darksky.net/forecast/"+ apiKey+"/"+ data[0].lat+","+ data[0].lon)
    .then(res =>res.json())
    .then(weathDat => {
        console.log(weathDat);
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