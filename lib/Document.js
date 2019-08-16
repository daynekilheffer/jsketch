import id from './id'
import Page from './Page'

export default class Document {
  #id = id()
  #pages = []
  get pages() {
    return [...this.#pages]
  }
  newPage() {
    const page = new Page()
    this.#pages.push(page)
    return page
  }
  toJSON () {
    return {
      _class: 'document',
      do_objectID: this.#id,
      assets: {
        _class: 'assetCollection',
        colorAssets: [],
        gradientAssets: [],
        imageCollection: {
          _class: 'imageCollection',
          images: {}
        },
        images: [],
        colors: [],
        gradients: []
      },
      colorSpace: 0,
      currentPageIndex: 0,
      foreignLayerStyles: [],
      foreignSymbols: [],
      foreignTextStyles: [],
      layerStyles: { _class: 'sharedStyleContainer', objects: [] },
      layerSymbols: { _class: 'symbolContainer', objects: [] },
      layerTextStyles: { _class: 'sharedTextStyleContainer', objects: [] },
      pages: this.#pages.map(page => ({
        _class: 'MSJSONFileReference',
        _ref_class: 'MSImmutablePage',
        _ref: 'pages/' + page.id
      }))
    }
  }
}
