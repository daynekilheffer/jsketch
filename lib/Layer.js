import id from './id'

export class RawJSONLayer {
  #json = {}
  constructor(json) {
    this.#json = json
  }
  toJSON() {
    return this.#json
  }
}

export default class AbstractLayer {
  id = id()
  name = undefined
  #bounds = {
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  }

  set width (width) { this.#bounds.width = width }
  get width () { return this.#bounds.width }

  set height (height) { this.#bounds.height = height }
  get height () { return this.#bounds.height }

  set x (x) { this.#bounds.x = x }
  get x () { return this.#bounds.x }

  set y (y) { this.#bounds.y = y }
  get y () { return this.#bounds.y }


  toJSON () {
    return {
      name: String(this.name),
      do_objectID: String(this.id),
      frame: {
        _class: 'rect',
        constrainProportions: false,
        ...this.#bounds,
      },
      isVisible: true,
    }
  }
}

export class ContainmentLayer extends AbstractLayer {
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
      layers: this.#layers.map(layer => layer.toJSON()),
    }
  }
}
