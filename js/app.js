const cityForm = document.querySelector('[data-js="change-location"]')

const cityNameContainer = document.querySelector('[data-js="city-name"]')
const cityWeatherContainer = document.querySelector('[data-js="city-weather"]')
const cityTemperatureContainer = document.querySelector('[data-js="city-temperature"]')
const cityCard = document.querySelector('[data-js="city-card"]')
const timeIconContainer = document.querySelector('[data-js="time-icon"]')
let timeImg = document.querySelector('[data-js="time"]')

const timeImgSrc = (isDayTime) => {
   const dayPeriod = isDayTime ? 'day' : 'night'
   return `./src/${dayPeriod}.svg`
}

const showCityCard = () => {
   if (cityCard.classList.contains('d-none')) {
      cityCard.classList.remove('d-none')
   }
}

const showCityWeatherInfo = async (inputValue) => {
   const [{ Key, LocalizedName }] = await getCityData(inputValue)
   const [{
      WeatherText,
      Temperature,
      IsDayTime,
      WeatherIcon
   }] = await getCityWeather(Key)
   const timeIcon = `<img src="./src/icons/${WeatherIcon}.svg" />`
   
   timeImg.src = timeImgSrc(IsDayTime)
   timeIconContainer.innerHTML = timeIcon
   cityNameContainer.textContent = LocalizedName
   cityWeatherContainer.textContent = WeatherText
   cityTemperatureContainer.textContent = Temperature.Metric.Value
}

cityForm.addEventListener('submit', (event) => {
   event.preventDefault()
   
   const inputValue = cityForm.city.value
   
   showCityCard()
   showCityWeatherInfo(inputValue)
   cityForm.reset()
})