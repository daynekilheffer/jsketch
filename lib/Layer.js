export class RawJSONLayer {
  #json = {}
  constructor(json) {
    this.#json = json
  }
  toJSON() {
    return this.#json
  }
}
