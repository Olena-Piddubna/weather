

class Weather{
    constructor(){
        this.city_name = document.querySelector(".header h1");
        this.degrees = document.querySelector(".degrees p");
        this.cloud = document.querySelector(".first-section span");
        this.humidity = document.querySelector(".second-section span");
        this.wind = document.querySelector(".third-section span");
        this.changeCK = document.querySelector(".change-ck");
        this.changeKC = document.querySelector(".change-kc");
        this.globalData;
        this.searchButton = document.querySelector(".button");
        this.input = document.querySelector(".search input");
        this.wrapper = document.querySelector(".wrapper");
        this.api_key = "bf35cac91880cb98375230fb443a116f";
        this.api_keyDays = "d3bbd74d135807f557aaf0bfa3ec6365";
        
        this.weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

        this.day = document.querySelectorAll(".day p");
        this.dayDegrees = document.querySelectorAll(".day span");
        
        this.init();
    }
    
    convertDegree(mainTempK) {
        return Math.round(mainTempK - 273.15);
    }

    init() {
            this.changeKC.addEventListener("click", e => {
                let mainTempK = this.globalData.main.temp;
                let mainTempC = this.convertDegree(mainTempK) + "&deg";
                console.log(mainTempC);
                this.degrees.innerHTML = mainTempC;
                e.preventDefault();
            })
    
            this.changeCK.addEventListener("click", e => {
                this.degrees.innerHTML = Math.round(this.globalData.main.temp) + "&deg";
                e.preventDefault();
                
            })
           
            this.searchButton.addEventListener("click", () => {
                let city = this.input.value;
                this.request(city);
                this.wrapper.classList.add("sample-wrapper");
                if(this.input.value === "Kyiv"){
                    this.wrapper.classList.add("reverse-wrapper");
                }
                this.input.value = "";
    
            })
    }   

    dayRequest() {
        let lat = this.globalData.coord.lat;
        let lon = this.globalData.coord.lon;

        // let url = "https://api.openweathermap.org/data/3.0/onecall?lat="+lat+"&lon="+lon+"&exclude=hourly&appid="+this.api_keyDays;

        let url = "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&exclude=hourly&appid="+this.api_keyDays;

        fetch(url)
        .then (response => response.json())
        .then (data => {
            console.log("WEEK DATA ", data);
            
            let j = 0;
            for (let i = 0; i < 40; i+=8) {
                let numberDay = new Date(data.list[i].dt * 1000).getDay(); 
                // Метод getDay()возвращает день недели (от 0 до 6) даты
                console.log(numberDay); 
                let nameDay = this.weekday[numberDay]; 
                console.log(nameDay);
                let temperature = data.list[i].main.temp;
                console.log(temperature);

                this.day[j].innerHTML = nameDay;
                this.dayDegrees[j].innerHTML = this.convertDegree(temperature);

                j++;


            }
        });

    }

    request(city){
        let url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+this.api_key
        fetch(url)
            .then (response => response.json())
            .then (data => {
                this.globalData = data;
                console.log(data);
                this.city_name.innerHTML = data.name;
                this.degrees.innerHTML = this.convertDegree(data.main.temp) + "&deg";
                this.cloud.innerHTML = data.weather[0].description;
                this.humidity.innerHTML = data.main.humidity;
                this.wind.innerHTML = data.wind.speed;
                this.dayRequest();

                console.log(data);
            })
    }
}    

    let weather = new Weather();
    weather.request("Kyiv");