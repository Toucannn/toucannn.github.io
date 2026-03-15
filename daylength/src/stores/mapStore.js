import { defineStore } from 'pinia'
import { ref } from 'vue'
import SunCalc from 'suncalc'

export const mapStore = defineStore('mapStore', () => {
  const selectedCoord = ref(null)
  const solarInfo = ref(null)

  function setCoord(lngLat) {
    selectedCoord.value = lngLat
    computeSolarInfo(lngLat)
  }
  
  function computeSolarInfo({ lng, lat }) {
    const now = new Date()
    const times = SunCalc.getTimes(now, lat, lng)

    const sunrise = times.sunrise
    const sunset = times.sunset

    let dayLengthSeconds = (sunset - sunrise) / 1000

    solarInfo.value = {
      sunrise,
      sunset,
      dayLengthSeconds
    }
  }


  function clear() {
    selectedCoord.value = null
  }

  return { selectedCoord, solarInfo, setCoord, clear }
})