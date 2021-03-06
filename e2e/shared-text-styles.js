import fs from 'fs'
import { File, Page, fileToZip } from '../lib'

const file = new File()
const page = new Page()
page.name = 'shared text styles'
file.document.addPage(page)

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

fileToZip(file)
  .pipe(fs.createWriteStream('shared-text-styles.sketch'))
  .on('finish', function () {
      console.log("sketch file written");
  });
