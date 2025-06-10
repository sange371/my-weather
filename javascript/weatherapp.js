function updateTemperature(response){
    console.log(response.data);

    let heading=document.querySelector("h1");
    let exactDay=document.querySelector(".day");
    let exactTime=document.querySelector(".time");
    let theDescription=document.querySelector(".description");
    let theHumidity=document.querySelector(".humidity");
    let theWindspeed=document.querySelector(".wind-speed");
    let theIcon=document.querySelector(".weather-icon");
    let theTemperature=document.querySelector(".temperature");
    let temperature=Math.round(response.data.current.temp_c);
    
    
    let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let now=new Date(response.data.location.localtime.replace(" ","T"));
    let day=days[now.getDay()];
    let minutes=now.getMinutes().toString().padStart(2,"0");
    let hours=now.getHours().toString().padStart(2,"0");


    heading.innerHTML=response.data.location.name;
    exactDay.innerHTML=day;
    exactTime.innerHTML=`${hours}:${minutes}`;
    theDescription.innerHTML=`, ${response.data.current.condition.text}`;
    theHumidity.innerHTML=`${response.data.current.humidity}%`;
    theWindspeed.innerHTML=`${response.data.current.wind_kph}km/h`;
    theIcon.setAttribute("src", `https:${response.data.current.condition.icon}`);
    theIcon.setAttribute("alt",response.data.current.condition.text);

    theTemperature.innerHTML=temperature;




}
function changeCity(event){
    event.preventDefault();


    let cityInput=document.querySelector("#city-name-input");
    let city=cityInput.value.trim();
    let apiKey="b22ddf4e40834df1a40195805250906";
    let apiUrl=`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    axios.get(apiUrl).then(updateTemperature).catch((error)=>{
        alert("AN ERROR OCCURRED");
        console.error(error);
    });

}
let button=document.querySelector(".submit-button");
button.addEventListener("click",changeCity);