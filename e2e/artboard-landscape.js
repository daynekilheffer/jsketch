import fs from 'fs'
import { File, RawJSONLayer, Artboard } from '../lib'

const file = new File()
const page = file.document.newPage()
page.name = 'dayne 1'

const ab1 = new Artboard.Mobile()
const ab2 = new Artboard.Mobile()
page.addLayer(ab1)
page.addLayer(ab2)
ab2.isLandscape = false
ab2.x = ab1.width + 30

file.toStream()
  .pipe(fs.createWriteStream('artboard-landscape.sketch'))
  .on('finish', function () {
      console.log("sketch file written");
  });
