import fs from 'fs'
import { File, Page } from '../lib'

const file = new File()
file.document.addPage(new Page())


file.toStream()
  .pipe(fs.createWriteStream('blank.sketch'))
  .on('finish', function () {
      console.log("sketch file written");
  });
