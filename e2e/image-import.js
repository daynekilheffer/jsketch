import fs from 'fs'
import { File, Artboard, Page, Image, fileToZip } from '../lib'
import imageData from './assets/smile-data-uri'

const file = new File()
const page = new Page()
page.name = 'image'
file.document.addPage(page)

const artboard = new Artboard.Desktop()
page.addLayer(artboard)

const img = new Image(imageData)
file.addImage(img)

const bitmap = img.createBitmap()
bitmap.width = 96
bitmap.height = 96
artboard.addLayer(bitmap)

fileToZip(file)
  .pipe(fs.createWriteStream('image-import.sketch'))
  .on('finish', function () {
      console.log("sketch file written");
  });
