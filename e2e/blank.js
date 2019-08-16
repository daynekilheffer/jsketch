import fs from 'fs'
import { File } from '../lib'

const file = new File()
file.document.newPage()


file.toStream()
  .pipe(fs.createWriteStream('blank.sketch'))
  .on('finish', function () {
      console.log("sketch file written");
  });
