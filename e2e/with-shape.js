import fs from 'fs'
import { File, RawJSONLayer, Artboard } from '../lib'

const file = new File()
const page = file.document.newPage()
page.name = 'dayne 1'

const desktopArtboard = new Artboard.Desktop()
page.addLayer(desktopArtboard)
desktopArtboard.addLayer(new RawJSONLayer(
  {
    "_class": "rectangle",
    "do_objectID": "BB2BEA2A-9289-475F-8C91-3C8042030B9C",
    "booleanOperation": -1,
    "exportOptions": {
      "_class": "exportOptions",
      "exportFormats": [],
      "includedLayerIds": [],
      "layerOptions": 0,
      "shouldTrim": false
    },
    "frame": {
      "_class": "rect",
      "constrainProportions": false,
      "height": 89,
      "width": 68,
      "x": 154,
      "y": 173
    },
    "isFixedToViewport": false,
    "isFlippedHorizontal": false,
    "isFlippedVertical": false,
    "isLocked": false,
    "isVisible": true,
    "layerListExpandedType": 0,
    "name": "Rectangle",
    "nameIsFixed": false,
    "resizingConstraint": 63,
    "resizingType": 0,
    "rotation": 0,
    "shouldBreakMaskChain": false,
    "clippingMaskMode": 0,
    "hasClippingMask": false,
    "style": {
      "_class": "style",
      "borders": [
        {
          "_class": "border",
          "isEnabled": true,
          "color": {
            "_class": "color",
            "alpha": 1,
            "blue": 0.5448932926829269,
            "green": 0.5448932926829269,
            "red": 1
          },
          "fillType": 0,
          "position": 0,
          "thickness": 1
        }
      ],
      "endMarkerType": 0,
      "fills": [
        {
          "_class": "fill",
          "isEnabled": true,
          "color": {
            "_class": "color",
            "alpha": 1,
            "blue": 0.9472179878048781,
            "green": 0.9472179878048781,
            "red": 1
          },
          "fillType": 0,
          "noiseIndex": 0,
          "noiseIntensity": 0,
          "patternFillType": 1,
          "patternTileScale": 1
        }
      ],
      "miterLimit": 10,
      "startMarkerType": 0,
      "windingRule": 1
    },
    "edited": false,
    "isClosed": true,
    "pointRadiusBehaviour": 1,
    "points": [
      {
        "_class": "curvePoint",
        "cornerRadius": 0,
        "curveFrom": "{0, 0}",
        "curveMode": 1,
        "curveTo": "{0, 0}",
        "hasCurveFrom": false,
        "hasCurveTo": false,
        "point": "{0, 0}"
      },
      {
        "_class": "curvePoint",
        "cornerRadius": 0,
        "curveFrom": "{1, 0}",
        "curveMode": 1,
        "curveTo": "{1, 0}",
        "hasCurveFrom": false,
        "hasCurveTo": false,
        "point": "{1, 0}"
      },
      {
        "_class": "curvePoint",
        "cornerRadius": 0,
        "curveFrom": "{1, 1}",
        "curveMode": 1,
        "curveTo": "{1, 1}",
        "hasCurveFrom": false,
        "hasCurveTo": false,
        "point": "{1, 1}"
      },
      {
        "_class": "curvePoint",
        "cornerRadius": 0,
        "curveFrom": "{0, 1}",
        "curveMode": 1,
        "curveTo": "{0, 1}",
        "hasCurveFrom": false,
        "hasCurveTo": false,
        "point": "{0, 1}"
      }
    ],
    "fixedRadius": 0,
    "hasConvertedToNewRoundCorners": true
  }))


file.toStream()
  .pipe(fs.createWriteStream('with-shape.sketch'))
  .on('finish', function () {
      console.log("sketch file written");
  });
