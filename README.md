# jsketch

## overview

There are tools available to convert mark-up to something that sketch can understand, but I wanted a set of domain objects that would allow me to create a sketch file

## quick start

```js
import fs from 'fs'
import { File, Page, fileToZip } from 'jsketch'

// a "File" is the base building block
const file = new File()
// a File has a Document inside of it and we add a Page to it
file.document.addPage(new Page())

// we provide a utility to convert a File object into
// the raw stream needed to write to the filesystem
fileToZip(file)
  .pipe(fs.createWriteStream('blank.sketch'))
```

## api

### File

* `new File()` - constructor
* `document` - (read-only) a `Document` instance that represents the contents of the file
* `images` - array of `Image` instances added to the file for reference inside of the `document`
  * mutating this array does not alter the internal array of the File instance
* `addImage(image)` - add an `Image` to the `images` array
* `toJSON()` - generates JSON representing this file

### Page

* `id` - the identifier used to represent this page in the document
* `name` - the display name of this page
* `layers` - array of `Layer` instances
  * mutating this array does not alter the internal array of the Page instance
* `addLayer(layer)` - add a `Layer` to the `layers` array
* `toJSON()` - generates JSON representing this page

### Layer
This class is not exposed, but is extended internally

* `id` - the identifier used to represent this page in the document
* `name` - the display name of this page
* `width` - the width of the layer
* `height` - the height of the layer
* `x` - the x position of the layer relative to its container
* `y` - the y position of the layer relative to its container
* `toJSON()` - generates JSON representing this layer

### ContainmentLayer extends `Layer`

* `layers` - array of `Layer` instances
* `addLayer(layer)` - add a `Layer` to the `layers` array

### Artboard extends `ContainmentLayer`
represents an artboard in the sketch document

4 predefined types exists:
* Mobile* - 320x1024
* Tablet* - 768x1024
* Desktop - 1024x1024
* DesktopHD - 1440x1024

_*_ supports alterations to `isLandscape` property to toggle landscape mode

### RawJSONLayer
represents an unknown type of layer

The goal of this class is to allow consumers to implement new layer types from sketch before this library is published

* `new RawJSONLayer(json)` - constructor
* `toJSON()` - generates JSON representing this layer

### Image
An image that once stored in a `File` can be referenced as a `Layer`

* `new Image(data)` - constructor
* `createBitmap()` - create a new bitmap instance to be used inside of a `Layer`
* `extension` - (read-only) the extension of the image
* `toJSON()` - generates JSON representing this image

_Note: only supports png image data_

#### Bitmap extends `Layer`

* `toJSON()` - generates JSON representing this bitmap image

### SymbolMaster extends `ContainmentLayer`

* `symbolId` - identifier of this symbol inside the sketch document
* `layers` - array of `Layer` instances
* `addLayer(layer)` - add a `Layer` to the `layers` array
* `createInstance()` - create a new instance of this symbol
* `toJSON()` - generates JSON representing this symbol master

#### SymbolInstance extends `Layer`

* `toJSON()` - generates JSON representing this symbol instance


### fileToZip

helper function that can convert a `File` instance to a stream of the compressed file for filesystem storage
