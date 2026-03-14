<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { GlobeToggleControl } from '../js/GlobeToggleControl.js'

const mapContainer = ref(null)
let map

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
})

onBeforeUnmount(() => {
  if (map) map.remove()
})
</script>

<template>
  <div
    ref="mapContainer"
    id="map"
    style="width: 100vw; height: 100vh; margin: 0"
  >
  </div>
</template>

<style scoped>
#map {
  background: hsl(0, 0%, 2%); /* recommended for globe view contrast */
}
</style>