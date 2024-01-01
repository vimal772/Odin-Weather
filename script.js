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
}