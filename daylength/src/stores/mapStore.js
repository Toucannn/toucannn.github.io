import { defineStore } from 'pinia'
import { ref } from 'vue'
import SunCalc from 'suncalc'

export const mapStore = defineStore('mapStore', () => {
  const selectedCoord = ref(null)
  const selectedDate = ref(new Date())
  const solarInfo = ref(null)

  function setCoord(lngLat) {
    selectedCoord.value = lngLat
    computeSolarInfo()
  }
  
  function setDate(date) {
    selectedDate.value = date
    computeSolarInfo()
  }

  function computeSolarInfo() {
    if (!selectedCoord.value) {
      solarInfo.value = null
      return
    }

    const { lng, lat } = selectedCoord.value
    const date = selectedDate.value

    const times = SunCalc.getTimes(date, lat, lng)

    const sunrise = times.sunrise
    const sunset = times.sunset
    const dayLengthSeconds = (sunset - sunrise) / 1000

    solarInfo.value = {
      sunrise,
      sunset,
      dayLengthSeconds
    }
  }

  function clear() {
    selectedCoord.value = null
    solarInfo.value = null
    selectedDate.value = new Date() // reset to today
  }

  return { selectedCoord, selectedDate,solarInfo, setCoord, setDate, clear }
})