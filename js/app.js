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

const fetchCityWeatherInfo = async (cityName) => {
  const [{ Key, LocalizedName }] = await getCityData(cityName)
  const [{ WeatherText, Temperature, IsDayTime, WeatherIcon }] =
    await getCityWeather(Key)

  return { LocalizedName, WeatherText, Temperature, IsDayTime, WeatherIcon }
}

const showCityWeatherInfo = async (cityName) => {
  const { LocalizedName, WeatherText, Temperature, IsDayTime, WeatherIcon } =
    await fetchCityWeatherInfo(cityName)
  const timeIcon = `<img src="./src/icons/${WeatherIcon}.svg" />`

  timeImg.src = timeImgSrc(IsDayTime)
  timeIconContainer.innerHTML = timeIcon
  cityNameContainer.textContent = LocalizedName
  cityWeatherContainer.textContent = WeatherText
  cityTemperatureContainer.textContent = Temperature.Metric.Value
}

const handleCityForm = (event) => {
  event.preventDefault()

  const cityName = cityForm.city.value

  showCityCard()
  showCityWeatherInfo(cityName)
  cityForm.reset()
}

cityForm.addEventListener('submit', handleCityForm)