import AbstractLayer from './Layer'

export default class Artboard extends AbstractLayer {
  #layers = []
  get layers() {
    return [...this.#layers]
  }
  addLayer(layer) {
    this.#layers.push(layer)
  }

  toJSON () {
    return {
      ...super.toJSON(),
      _class: 'artboard',
      layers: this.#layers.map(layer => layer.toJSON()),
    }
  }
}

[
  {
    offersLandscapeVariant: 1,
    height: 320,
    name: 'Mobile',
    width: 1024,
  },
  {
    offersLandscapeVariant: 1,
    height: 768,
    name: 'Tablet',
    width: 1024,
  },
  {
    height: 1024,
    name: 'Desktop',
    width: 1024,
  },
  {
    height: 1024,
    name: 'Desktop HD',
    width: 1440,
  },
].forEach(preset => {
  class Preset extends Artboard {
    #preset = {
      offersLandscapeVariant: 0,
      allowResizedMatching: 0,
        ...preset,
    }
    constructor() {
      super()
      this.isLandscape = !!preset.offersLandscapeVariant
      this.name = this.#preset.name
    }
    set isLandscape (bool) {
      if (bool) {
        this.width = this.#preset.width
        this.height = this.#preset.height
      } else {
        this.width = this.#preset.height
        this.height = this.#preset.width
      }
    }
    toJSON () {
      return {
        ...super.toJSON(),
        presetDictionary: this.#preset
      }
    }
  }
  Artboard[preset.name.replace(/[^a-zA-Z]/, '')] = Preset
})
