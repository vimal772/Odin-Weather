// fetch('http://api.weatherapi.com/v1/current.json?key=c7f099f4e3bb448791561817232212&q=London&aqi=no',{mode: 'cors'}).then((respone)=>{
//     return respone.json()
// }).then((result)=>{
//     console.log(result.location)
// })


const weatherBtn = document.querySelector('.btn-weather')

weatherBtn.addEventListener('click',()=>{
    let inputValue = document.querySelector('input[type="text"]')
    if(inputValue.value){
        loadweather(inputValue.value)
    }
    inputValue.value= ""
})

async function loadweather(location) {
    const weatherKey = 'c7f099f4e3bb448791561817232212';
    const path = await fetch(`http://api.weatherapi.com/v1/current.json?key=${weatherKey}&q=${location}&aqi=no`,{mode: 'cors'})
    const respone = await path.json()
    console.log(respone)
    const result = respone.current.condition.text
    console.log(result);
    setBackGroud(result)
}

function setBackGroud(result) {
    const body = document.querySelector('body')
    const gradient = findGradinet(result)
    console.log(gradient);
    body.style.background = "linear-gradient(to bottom, "+ gradient + ")";
}

function findGradinet(weatherCondition) {
    switch (weatherCondition) {
        case "Sunny": 
            return "#FFF7C9, #FFECB3";
        case "Partly cloudy": 
            return "#87CEFA, #FFFFFF";
        case "Cloudy": 
            return "#FFF7C9, #FFECB3";
        case "Rainy": 
            return "#FFF7C9, #FFECB3";
        case "Showers": 
            return "#FFF7C9, #FFECB3";
        case "Thunderstroms": 
            return "#FFF7C9, #FFECB3";
        case "Snowy": 
            return "#FFF7C9, #FFECB3";
        case "Foggy": 
            return "#FFF7C9, #FFECB3";
        case "Windy": 
            return "#FFF7C9, #FFECB3";
        case "Hazy": 
            return "#FFF7C9, #FFECB3";
        default:
            return "#FFFFFF, #FFFFFF"
    }
}