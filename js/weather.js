const APIKey = 'K3b0TSJMBfZY7QBV8pHavoowDXLCKXUH'
const baseUrl = 'http://dataservice.accuweather.com'

const getCityUrl = (cityName) => {
   return `${baseUrl}/locations/v1/cities/search?apikey=${APIKey}&q=${cityName}`
} 

const getWeatherUrl = (cityKey) => {
   return `${baseUrl}/currentconditions/v1/${cityKey}?apikey=${APIKey}&language=pt-br`
}

const fetchData = async (url) => {
   try {
      const response = await fetch(url)
      
      if (!response.ok) {
         throw new Error('Não foi possível obter os dados')
      }

      return response.json()
   } catch ({ name, message }) {
      alert(`${name}: ${message}`)
   }
}

const getCityData = (cityName) => {
   const cityUrl = getCityUrl(cityName)
   return fetchData(cityUrl)
}

const getCityWeather = (cityKey) => {
   return fetchData(getWeatherUrl(cityKey))
}