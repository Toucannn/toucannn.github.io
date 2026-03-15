import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMapSelectionStore = defineStore('mapSelection', () => {
  const selectedCoord = ref(null)

  function setCoord(lngLat) {
    selectedCoord.value = lngLat
  }

  function clear() {
    selectedCoord.value = null
  }

  return { selectedCoord, setCoord, clear }
})