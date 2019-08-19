import id from './id'
import Page from './Page'

export default class Document {
  #id = id()
  #pages = []
  #colors = []
  #sharedLayerStyles = []
  #sharedTextStyles = []
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
  get sharedTextStyles() {
    return [...this.#sharedTextStyles]
  }
  addSharedTextStyle(name, style, id) {
    this.#sharedTextStyles.push({
      name,
      style,
      id,
    })
  }
  get sharedLayerStyles() {
    return [...this.#sharedLayerStyles]
  }
  addSharedLayerStyle(name, style, id) {
    this.#sharedLayerStyles.push({
      name,
      style,
      id,
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
      layerStyles: {
        _class: 'sharedStyleContainer',
        objects: this.#sharedLayerStyles.map(({name, id: identifier, style}) => ({
          _class: 'sharedStyle',
          do_objectID: id || id(),
          name,
          value: style,
        }))
      },
      layerSymbols: { _class: 'symbolContainer', objects: [] },
      layerTextStyles: {
        _class: 'sharedTextStyleContainer',
        objects: this.#sharedTextStyles.map(({name, id: identifier, style}) => ({
          _class: 'sharedStyle',
          do_objectID: identifier || id(),
          name,
          value: style,
        }))
      },
      pages: this.#pages.map(page => ({
        _class: 'MSJSONFileReference',
        _ref_class: 'MSImmutablePage',
        _ref: 'pages/' + page.id
      }))
    }
  }
}
