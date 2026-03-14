<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

const mapContainer = ref(null)
let map

onMounted(() => {
  map = new maplibregl.Map({
    container: mapContainer.value,
    style: 'https://demotiles.maplibre.org/style.json',
    center: [24.7536, 59.4370], // Example: Tallinn
    zoom: 10
  })

  // Optional: add zoom and rotation controls
  map.addControl(new maplibregl.NavigationControl())
})

onBeforeUnmount(() => {
  if (map) {
    map.remove()
  }
})
</script>

<template>
  <div
    ref="mapContainer"
    style="width: 100vw; height: 100vh; margin: 0px;"
  ></div>
</template>

<style scoped>
/* Optional: ensure map takes full space if parent is flex/grow */
:host, .map {
  display: block;
}
</style>
``