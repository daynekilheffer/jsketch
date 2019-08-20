import id from './id'

import AbstractLayer, { ContainmentLayer } from './Layer'

export default class SymbolMaster extends ContainmentLayer {
  symbolId = id()
  #layers = []
  get layers() {
    return [...this.#layers]
  }
  addLayer(layer) {
    this.#layers.push(layer)
  }

  createInstance () {
    return new SymbolInstance(this)
  }

  toJSON () {
    return {
      ...super.toJSON(),
      _class: 'symbolMaster',
      layers: this.#layers.map(layer => layer.toJSON()),
      symbolID: String(this.symbolId),
    }
  }
}

class SymbolInstance extends AbstractLayer {
  #master
  constructor(master) {
    super()
    this.#master = master
  }

  toJSON () {
    return {
      ...super.toJSON(),
      _class: 'symbolInstance',
      name: this.name || this.#master.name,
      symbolID: this.#master.symbolId,
    }
  }
}
