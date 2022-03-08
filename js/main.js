
async function getWeather(country)
{

    let apiResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=6074141f3a314970b4b130219221501&q=${country}&days=3`);
    let finalResponse = await apiResponse.json();
    FistDay(finalResponse)
    NextDay(finalResponse,"day2",1)
    NextDay(finalResponse,"day3",2)
    search();
}

//get today 
function FistDay(result){
    let exactdayName = new Date(result.forecast.forecastday[0].date).toLocaleString('default',{weekday:"long"});
    document.querySelector('.day').innerHTML=exactdayName;

    let exactDay=  new Date(result.forecast.forecastday[0].date).toLocaleString('default',{day:"numeric"}) ;
    document.querySelector('.test').innerHTML=exactDay;

    let exactMonth =  new Date(result.forecast.forecastday[0].date).toLocaleString('default',{month:"long"});
    document.querySelector('.test2').innerHTML=exactMonth;

    document.querySelector('.town').innerHTML=`${result.location.name}`;
    document.querySelector('.temp').innerHTML=`${result.current.temp_c}<sup>o</sup>C`;
    document.querySelector('.cond').innerHTML=`${result.current.condition.text}`;
    document.querySelector('.img-icon').setAttribute('src',`https:${result.current.condition.icon}`);
    }

//get nextday 
function NextDay(result,dayNum,i){
    document.querySelector(`${'.'+dayNum + '-icon'}`).setAttribute('src',`https:${result.forecast.forecastday[i].day.condition.icon}`)
    document.querySelector(`${'.'+dayNum + '-degree'}`).innerHTML=(`${result.forecast.forecastday[i].day.maxtemp_c}<sup>o</sup>C`)
    document.querySelector(`${'.'+dayNum + '-mdegree'}`).innerHTML=(`${result.forecast.forecastday[i].day.mintemp_c}<sup>o</sup>C`)
    document.querySelector(`${'.'+dayNum + '-desc'}`).innerHTML=(`${result.forecast.forecastday[i].day.condition.text}`);

    let exactdayName2 = new Date(result.forecast.forecastday[i].date).toLocaleString('default',{weekday:"long"});
    document.querySelector(`${'.'+dayNum}`).innerHTML=exactdayName2;
}

getWeather('cairo')

// search of city
function search(){
    let searchInput = document.querySelector('.search-input');
    let regex = /^[a-zA-Z]{3,}$/gm;
    searchInput.addEventListener('keyup',function(){
        if(this.value==""){
            getWeather('cairo')
        }else if(regex.test(this.value)){
            let country = this.value;
            getWeather(country)
        }
    })
}