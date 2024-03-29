const img = document.createElement('img')
const weatherBtn = document.querySelector('.btn-weather')
const checkBox = document.querySelector('#converter')
let currentWeather = {}
let isCelsius

checkBox.addEventListener('change',()=> {
    const isChecked = checkBox.checked
    converter(isChecked)
})

weatherBtn.addEventListener('click',()=>{
    let inputValue = document.querySelector('input[type="text"]')
    if(inputValue.value){
        loadweather(inputValue.value)
    }
    inputValue.value= ""
})

async function loadweather(location) {
    const weatherKey = 'c7f099f4e3bb448791561817232212';
    try{
        const path = await fetch(`https://api.weatherapi.com/v1/current.json?key=${weatherKey}&q=${location}&aqi=no`,{mode: 'cors'})

        if(!path.ok){
            throw new Error(`Faile to Load weather data ${path.status}`)
        }
        const respone = await path.json()
        const result = respone.current.condition.text
        displayLocation(respone);
        fetchWeather(respone)
        getGif(result)
    } catch{
        console.log('Error while loadind');
        handleError()
    }
}

async function getGif(name) {
    if(name === 'Partly cloudy') name = 'cloudy'
    if(name === 'Clear') name = 'clear sky'
    if(name === 'Light drizzle') name = 'drizzle weather'
    const gif = document.querySelector('.gif-wrap')
    const result = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=eV8bEro9RWqY8fa5txBesSTQGfaNyFBB&s=${name}`,{mode: 'cors'})
    const respone = await result.json()
    img.classList.add('gif-img')
    img.src = respone.data.images.original.url
    gif.appendChild(img) 
}

function fetchWeather(respone) {
    currentWeather = {
        cloud: respone.current.cloud,
        temp: respone.current.temp_c,
        faren: respone.current.temp_f,
        humidity: respone.current.humidity,
        wind: respone.current.wind_kph
    }
    if(checkBox.checked){
        displayWeather(currentWeather,false)
    }else{
        displayWeather(currentWeather,true)
    }
}

function displayLocation(respone) {
    document.querySelector('.errmsg').textContent = '';
    const name  = respone.location.name
    const country = respone.location.country
    const wrap = document.querySelector('.location-wrap')
    while(wrap.firstChild){
        wrap.removeChild(wrap.firstChild)
    }

    const h1 = document.createElement('h1')
    const h3 = document.createElement('h3')
    h1.textContent = name
    h3.textContent = country
    wrap.appendChild(h1)
    wrap.appendChild(h3)
    
}


function converter(isChecked) {
    if(isChecked){
        displayWeather(currentWeather,!isChecked)
    }else{
        displayWeather(currentWeather,!isChecked)
    }
}

function displayWeather(currentWeather,isCelsius){
    const wrap = document.querySelector('.info-wrap')
    while(wrap.firstChild){
        wrap.removeChild(wrap.firstChild)
    }
    let heat
    let uniCode
    if(isCelsius){
        heat = currentWeather.temp
        uniCode = '\u00B0C'
    }
    else{
        heat = currentWeather.faren
        uniCode = '\u00B0F'
    }

    const cloud = document.createElement('p')
    const temp = document.createElement('p')
    const humidity = document.createElement('p')
    const wind = document.createElement('p')

    cloud.textContent = `cloud: ${currentWeather.cloud}`
    temp.textContent = `temp: ${heat}${uniCode}`
    humidity.textContent = `humidity: ${currentWeather.humidity}`
    wind.textContent = `wind: ${currentWeather.wind} Kph`

    wrap.appendChild(cloud)
    wrap.appendChild(temp)
    wrap.appendChild(humidity)
    wrap.appendChild(wind)
}


function handleError() {
    const msg = document.querySelector('.errmsg')
    msg.textContent = 'Error: Please Enter Valid Location'
}