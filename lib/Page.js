import id from './id'

export default class Page {
  id = id()
  name = 'Page'
  #layers = []
  get layers() {
    return [...this.#layers]
  }
  addLayer(layer) {
    this.#layers.push(layer)
  }

  toJSON () {
    return {
      _class: 'page',
      do_objectID: String(this.id),
      booleanOperation: -1,
      exportOptions: {
        _class: 'exportOptions',
        exportFormats: [],
        includedLayerIds: [],
        layerOptions: 0,
        shouldTrim: false
      },
      frame: {
        _class: 'rect',
        constrainProportions: false,
        height: 0,
        width: 0,
        x: 0,
        y: 0
      },
      isFixedToViewport: false,
      isFlippedHorizontal: false,
      isFlippedVertical: false,
      isLocked: false,
      isVisible: true,
      layerListExpandedType: 0,
      name: String(this.name),
      nameIsFixed: false,
      resizingConstraint: 63,
      resizingType: 0,
      rotation: 0,
      shouldBreakMaskChain: false,
      clippingMaskMode: 0,
      hasClippingMask: false,
      style: {
        _class: 'style',
        endMarkerType: 0,
        miterLimit: 10,
        startMarkerType: 0,
        windingRule: 1
      },
      groupLayout: { _class: 'MSImmutableFreeformGroupLayout' },
      hasClickThrough: true,
      layers: this.#layers.map(layer => layer.toJSON()),
      horizontalRulerData: { _class: 'rulerData', base: 0, guides: [] },
      includeInCloudUpload: true,
      verticalRulerData: { _class: 'rulerData', base: 0, guides: [] }
    }
  }
}
