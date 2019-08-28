import AbstractLayer from './Layer'
const characters = '0123456789abcdef'

const pseudoSha = () => {
  let psha = ''
  for (let i = 0; i < 40; i++) {
      psha += characters.charAt(Math.floor(Math.random() * characters.length) % characters.length);
   }
   return psha
}

export default class Image {
  id = pseudoSha()
  #data
  constructor(data) {
    this.#data = data
  }
  createBitmap() {
    return new Bitmap(this)
  }
  get extension() {
    return 'png'
  }
  toJSON () {
    return {
      id: String(this.id),
      data: this.#data,
    }
  }
}


class Bitmap extends AbstractLayer {
  #image
  constructor(image) {
    super()
    this.#image = image
  }

  toJSON () {
    return {
      ...super.toJSON(),
      _class: 'bitmap',
      name: this.name || this.#image.id,
      image: {
        _class: 'MSJSONFileReference',
        _ref_class: 'MSImageData',
        _ref: `images/${this.#image.id}.${this.#image.extension}`
      }
    }
  }
}
