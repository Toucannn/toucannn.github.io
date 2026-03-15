<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import LocationOverlay from '@/components/LocationOverlay.vue'
import { GlobeToggleControl } from '../js/GlobeToggleControl.js'
import { useMapSelectionStore } from '@/stores/useMapSelectionStore'

const mapContainer = ref(null)
const mapSelection = useMapSelectionStore()
let map
let markerEl = null

const satelliteStyle =
  "https://api.maptiler.com/maps/hybrid-v4/style.json?key=pXqsGu6NnuPAWZjZz7Lm"

onMounted(() => {
  map = new maplibregl.Map({
    container: mapContainer.value,
    style: satelliteStyle,
    center: [25.2, 58.6],
    zoom: 6.5
  })

  map.addControl(new maplibregl.NavigationControl(), 'top-right')

  map.on('style.load', () => {
    // Start in flat mode
    map.setProjection({ type: 'mercator' })

    // Add our custom globe toggle
    map.addControl(new GlobeToggleControl(), 'top-right')
  })

  map.on('click', (e) => {
    const { lng, lat } = e.lngLat

    // Save selection to store
    mapSelection.setCoord({ lng, lat })

    updateMarkerPosition()
  })
})

onBeforeUnmount(() => {
  if (map) map.remove()
})

/* 
    HELPER FUNCTIONS
*/

function updateMarkerPosition() {
  const { lng, lat } = mapSelection.selectedCoord

  if (!markerEl || !mapSelection.selectedCoord ) {
    markerEl = new maplibregl.Marker()
    .setLngLat([lng, lat])
    .addTo(map)
  } else {
    markerEl.remove()
    markerEl = null
    updateMarkerPosition()
  }
}
</script>

<template>
  <div
    ref="mapContainer"
    id="map"
    style="width: 100vw; height: 100vh; margin: 0; position: relative;"
  >
  </div>

  <LocationOverlay />
</template>

<style scoped>
#map {
  background: hsl(0, 0%, 2%); /* recommended for globe view contrast */
}
</style>