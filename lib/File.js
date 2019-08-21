import Document from './Document'
import Meta from './Meta'
import User from './User'

export default class File {
  #meta = new Meta()
  #user = new User()
  #document = new Document()
  get document() {
    return this.#document;
  }
  toJSON () {
    return {
      meta: this.#meta.toJSON(),
      user: this.#user.toJSON(),
      document: this.#document.toJSON(),
      pages: this.#document.pages.map(page => page.toJSON())
    }
  }
}
