import fs from 'fs'
import { File, RawJSONLayer, Artboard, Page, fileToZip } from '../lib'

const file = new File()
const page = new Page()
page.name = 'shared layer styles'
file.document.addPage(page)

file.document.addSharedLayerStyle('pink-shape', {
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
})

fileToZip(file)
  .pipe(fs.createWriteStream('shared-layer-styles.sketch'))
  .on('finish', function () {
      console.log("sketch file written");
  });
