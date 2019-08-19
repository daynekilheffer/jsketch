import fs from 'fs'
import { File, RawJSONLayer, Artboard } from '../lib'

const file = new File()
const page = file.document.newPage()
page.name = 'shared text styles'

file.document.addSharedTextStyle('sample-style', {
  "_class": "style",
  "endMarkerType": 0,
  "miterLimit": 10,
  "startMarkerType": 0,
  "textStyle": {
    "_class": "textStyle",
    "encodedAttributes": {
      "underlineStyle": 0,
      "MSAttributedStringTextTransformAttribute": 0,
      "paragraphStyle": {
        "_class": "paragraphStyle",
        "alignment": 0,
        "lineHeightMultiple": 1,
        "maximumLineHeight": 20,
        "minimumLineHeight": 20
      },
      "strikethroughStyle": 0,
      "MSAttributedStringFontAttribute": {
        "_class": "fontDescriptor",
        "attributes": { "name": "Helvetica", "size": 14 }
      },
      "MSAttributedStringColorAttribute": {
        "_class": "color",
        "alpha": 1,
        "blue": 0.2,
        "green": 0.2,
        "red": 0.2
      }
    },
    "verticalAlignment": 0
  },
  "windingRule": 1
})

file.toStream()
  .pipe(fs.createWriteStream('shared-text-styles.sketch'))
  .on('finish', function () {
      console.log("sketch file written");
  });
