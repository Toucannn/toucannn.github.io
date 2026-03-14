export class GlobeToggleControl {
  constructor(options = {}) {
    this.isGlobe = false
    this.map = null
    this.options = options
  }

  onAdd(map) {
    this.map = map
    console.log("map added")
    console.log(this.isGlobe, "this.isGlobe")

    this.container = document.createElement('div')
    this.container.className = 'maplibregl-ctrl maplibregl-ctrl-group'

    this.button = document.createElement('button')
    this.button.type = 'button'
    this.button.innerText = '🌍'
    this.button.title = this.chooseButtonTitle()

    this.button.onclick = () => this.toggle()

    this.container.appendChild(this.button)
    return this.container
  }

  toggle() {
    this.isGlobe = !this.isGlobe

    // Switch projection
    this.map.setProjection({
      type: this.isGlobe ? 'globe' : 'mercator'
    })
    
    this.map.setSky({
      "atmosphere-blend": [
        "interpolate", ["linear"], ["zoom"],
        0, 1,
        5, 1,
        7, 0
      ]
    })

    // add light position for realism
    this.map.setLight({
      anchor: "map",
      position: [1.5, 90, 80]
    })

    // Smooth animation
    this.map.easeTo({
      duration: 1200,
      pitch: this.isGlobe ? 0 : 0,
      bearing: this.isGlobe ? 0 : 0,
      zoom: this.isGlobe ? 2.7 : this.map.getZoom()
    })

    this.button.title = this.chooseButtonTitle()
  }

  chooseButtonTitle() {
    return this.isGlobe ? 'Show Map View' : 'Show Globe View'
  }

  onRemove() {
    if (this.container.parentNode) {
      this.container.parentNode.removeChild(this.container)
    }
    this.map = undefined
  }
}