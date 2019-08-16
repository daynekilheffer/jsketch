import id from './id'

export default class Artboard {
  id = id()
  name = undefined
  #layers = []
  #bounds = {
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  }
  get layers() {
    return [...this.#layers]
  }
  addLayer(layer) {
    this.#layers.push(layer)
  }

  set width (width) { this.#bounds.width = width }
  get width () { return this.#bounds.width }
  set height (height) { this.#bounds.height = height }
  get height () { return this.#bounds.height }
  set x (x) { this.#bounds.x = x }
  set y (y) { this.#bounds.y = y }


  toJSON () {
    return {
      _class: 'artboard',
      name: String(this.name),
      do_objectID: String(this.id),
      frame: {
        _class: 'rect',
        constrainProportions: false,
        ...this.#bounds,
      },
      isVisible: true,
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
      const json = super.toJSON()
      return {
        ...json,
        presetDictionary: this.#preset
      }
    }
  }
  Artboard[preset.name.replace(/[^a-zA-Z]/, '')] = Preset
})
