<script setup>
import { mapStore } from '@/stores/mapStore'

const store = mapStore()

function close() {
  store.clear()
}
</script>

<template>
  <div 
    v-if="store.selectedCoord"
    class="location-overlay"
  >
    <div class="header">
      <strong>Selected Location</strong>
      <button class="close-btn" @click="close">×</button>
    </div>

    <div class="content">
      <p>Longitude: {{ store.selectedCoord.lng.toFixed(6) }}</p>
      <p>Latitude: {{ store.selectedCoord.lat.toFixed(6) }}</p>
    </div>
  </div>
</template>

<style scoped>
.location-overlay {
  position: absolute;
  left: 16px;
  top: 16px;
  width: 260px;
  background: white;
  border-radius: 6px;
  padding: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  z-index: 9999;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-btn {
  border: none;
  background: none;
  font-size: 20px;
  cursor: pointer;
}

.content {
  margin-top: 8px;
}
</style>