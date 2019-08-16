import JSZip from 'jszip'
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
  toStream () {
    const zip = new JSZip()
    zip.file('meta.json', JSON.stringify(this.#meta.toJSON()))
    zip.file('user.json', JSON.stringify(this.#user.toJSON()))
    zip.file('document.json', JSON.stringify(this.#document.toJSON()))
    this.#document.pages.forEach(page => {
      zip.file(`pages/${page.id}.json`, JSON.stringify(page.toJSON()), {createFolders: false})
    })

    return zip.generateNodeStream({
      platform: process.platform,
      compression: 'DEFLATE',
      compressionOptions:{level: 9},
      streamFiles:true
    })
  }
}
