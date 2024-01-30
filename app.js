const apiKey="&appid=b7774cf7af7ff3d9efc579d2587044c6";
const apiUrl="https://api.openweathermap.org/data/2.5/weather?";
let enter=document.querySelector("#search");
let boxdata=document.querySelector("#box");
let go=document.querySelector("#find");
let show=document.querySelector(".weather");
let error=document.querySelector(".err");
let noVal=document.querySelector(".noValue");

// for shake effect ...

go.addEventListener("click",function(){
    if(enter.value==""){
        show.style.display="none";
        noVal.style.display="block";
        error.style.display="none";
        boxdata.classList.add('errorFind');
        setTimeout(()=>{
            boxdata.classList.remove('errorFind');
        },1000);
    }
    
    // for shake effect...
    
    else{
        show.style.display="block";
        async function checkWeather(){
            let sre=("q="+enter.value);
            const response =await fetch(apiUrl+sre+apiKey);
            data=await response.json();
            // console.log(data);

            // error no match found ...

            if(data.cod=="404"){
                show.style.display="none";
                error.style.display="block";
                noVal.style.display="none";
                boxdata.classList.add('errorFind');
            setTimeout(()=>{
                boxdata.classList.remove('errorFind');
            },1000);
            }

            // wind speed and other data ...

            else{
            error.style.display="none";
            noVal.style.display="none";
            let location=document.querySelector(".place");
            location.innerHTML=data.name;
            let temperature=document.querySelector(".temp");
            let tempr=Math.floor(data.main.temp-273.15);
            temperature.innerHTML=(tempr+"° C");
            let humidity=document.querySelector(".humid");
            humidity.innerHTML=(data.main.humidity+" %");
            let pressure=document.querySelector(".pres");
            pressure.innerHTML=(data.main.pressure+" hPa");
            let windSpeed=document.querySelector(".wind");
            windSpeed.innerHTML=(data.wind.speed+" km/hr");
            let icon=document.querySelector(".weatherIcon");

            //for night icon....

            if(data.weather[0].icon[2]==="n"){
                if(data.weather[0].main =="Clear"){
                    icon.src="nightclear.png";
                }
                else if(data.weather[0].main =="Rain"){
                    icon.src="nightrain3.png";
                }
                else if(data.weather[0].main =="Dizzle"){
                    icon.src="nightdizzle.png";
                }
                else if(data.weather[0].main =="Smoke"){
                    icon.src="nightmist.png";
                }
                else if(data.weather[0].main =="Clouds"){
                    icon.src="cloudynight1.png";
                }
                else if(data.weather[0].main =="Mist"||data.weather[0].main =="Haze"){
                    icon.src="nightmist.png";
                }
                else if(data.weather[0].main =="Snow"){
                    icon.src="nightsnow.png";
                }
            }

            // for day icon ...

            else{
                if(data.weather[0].main =="Clear"){
                    icon.src="clear.png";
                }
                else if(data.weather[0].main =="Rain"){
                    icon.src="rain.png";
                }
                else if(data.weather[0].main =="Dizzle"){
                    icon.src="dizzle.png";
                }
                else if(data.weather[0].main =="Clouds"){
                    icon.src="cloudy.png";
                }
                else if(data.weather[0].main =="Smoke"){
                    icon.src="mist1.png";
                }
                else if(data.weather[0].main =="Mist"||data.weather[0].main =="Haze"){
                    icon.src="mist1.png";
                }
                else if(data.weather[0].main =="Snow"){
                    icon.src="snow.png";
                }
            }
        };
        }
        checkWeather();
    }
});


