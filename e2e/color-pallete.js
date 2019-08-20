import fs from 'fs'
import { File, RawJSONLayer, Artboard, Page } from '../lib'

const file = new File()
const page = new Page()
page.name = 'royal purple'
file.document.addPage(page)

file.document.addColor({red: 92, green: 37, blue: 127}, 'dark purple')
file.document.addColor({red: 214, green: 151, blue: 255}, 'light purple')
file.document.addColor({red: 184, green: 75, blue: 255}, 'pure purple')

file.toStream()
  .pipe(fs.createWriteStream('color-pallete.sketch'))
  .on('finish', function () {
      console.log("sketch file written");
  });
