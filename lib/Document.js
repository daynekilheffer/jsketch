import id from './id'
import Page from './Page'

export default class Document {
  #id = id()
  #pages = []
  #colors = []
  get pages() {
    return [...this.#pages]
  }
  addPage (page) {
    if (!page instanceof Page) {
      throw new Error('unknown page instance type')
    }
    this.#pages.push(page)
  }
  newPage () {
    const page = new Page()
    page.name = `Page ${this.#pages.length + 1}`
    this.addPage(page)
    return page
  }
  get colors() {
    return [...this.#colors]
  }
  addColor ({ red, green, blue, alpha = 1 }, name) {
    this.#colors.push({
      name,
      red,
      green,
      blue,
      alpha
    })
  }
  toJSON () {
    return {
      _class: 'document',
      do_objectID: this.#id,
      assets: {
        _class: 'assetCollection',
        colorAssets: this.#colors.map(({name, red, green, blue, alpha}) => {
          const asset = {
            _class: 'MSImmutableColorAsset',
            color: {
              _class: 'color',
              red: red / 255,
              green: green / 255,
              blue: blue / 255,
              alpha,
            }
          }
          if (name) {
            asset.name = name
          }
          return asset
        }),
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
