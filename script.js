const img = document.createElement('img')
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
    displayLocation(respone);
    displayWeather(respone)
    const result = respone.current.condition.text
    getGif(result)
}

function displayWeather(respone) {
    const currentWeather = {
        cloud: respone.current.cloud,
        temp: respone.current.temp_c,
        humidity: respone.current.humidity,
        wind: respone.current.wind_kph
    }
    console.log(currentWeather);
    const wrap = document.querySelector('.info-wrap')
    while(wrap.firstChild){
        wrap.removeChild(wrap.firstChild)
    }

    const cloud = document.createElement('p')
    const temp = document.createElement('p')
    const humidity = document.createElement('p')
    const wind = document.createElement('p')

    cloud.textContent = `cloud: ${currentWeather.cloud}`
    temp.textContent = `temp: ${currentWeather.temp}\u00B0C`
    humidity.textContent = `humidity: ${currentWeather.humidity}`
    wind.textContent = `wind: ${currentWeather.wind} Kph`

    wrap.appendChild(cloud)
    wrap.appendChild(temp)
    wrap.appendChild(humidity)
    wrap.appendChild(wind)
}

function displayLocation(respone) {
    const name  = respone.location.name
    const country = respone.location.country
    console.log(name, country);
    const wrap = document.querySelector('.location-wrap')

    while(wrap.firstChild){
        wrap.removeChild(wrap.firstChild)
    }

    const h1 = document.createElement('h1')
    h1.textContent = name
    const h3 = document.createElement('h3')
    h3.textContent = country
    wrap.appendChild(h1)
    wrap.appendChild(h3)
    
}

async function getGif(name) {
    if(name === 'Partly cloudy') name = 'cloudy'
    if(name === 'Clear') name = 'weather clear'
    if(name === 'Light drizzle') name = 'drizzle weather'
    const result = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=eV8bEro9RWqY8fa5txBesSTQGfaNyFBB&s=${name}`,{mode: 'cors'})
    const respone = await result.json()
    img.classList.add('gif-img')
    img.src = respone.data.images.original.url
    const gif = document.querySelector('.gif-wrap')
    gif.appendChild(img) 
}
