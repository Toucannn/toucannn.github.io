<script setup>
import { mapStore } from '@/stores/mapStore'

const store = mapStore()

function close() {
  store.clear()
}

function onDateChange(e) {
  const newDate = new Date(e.target.value)
  store.setDate(newDate)
}

function formatTime(date) {
  if (!date) return '--'
  // Format with local timezone (your TZ is GMT+02:00)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

function formatDuration(seconds) {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`
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
      
      <hr>
      
      <!-- date selector -->
      <label>
        <strong>Select date:</strong><br>
        <input
          type="date"
          :value="store.selectedDate.toISOString().slice(0,10)"
          @change="onDateChange"
        >
      </label>

      <hr>

      <p><strong>Sunrise:</strong> {{ formatTime(store.solarInfo?.sunrise) }}</p>
      <p><strong>Sunset:</strong> {{ formatTime(store.solarInfo?.sunset) }}</p>
      <p>
        <strong>Day length:</strong>
        {{ formatDuration(store.solarInfo?.dayLengthSeconds || 0) }}
      </p>
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