import fs from 'fs'
import { File, Page, fileToZip } from '../lib'

const file = new File()
file.document.addPage(new Page())


fileToZip(file)
  .pipe(fs.createWriteStream('blank.sketch'))
  .on('finish', function () {
      console.log("sketch file written");
  });
