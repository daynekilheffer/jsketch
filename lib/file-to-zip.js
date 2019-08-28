import JSZip from 'jszip'

export default (file) => {
  const { meta, user, document, pages, images } = file.toJSON()
  const zip = new JSZip()

  zip.file('meta.json', JSON.stringify(meta))
  zip.file('user.json', JSON.stringify(user))
  zip.file('document.json', JSON.stringify(document))

  pages.forEach(page => {
    zip.file(`pages/${page.do_objectID}.json`, JSON.stringify(page), {createFolders: false})
  })

  images.forEach(image => {
    const [, type, data] = image.data.match(/^data:image\/(.*);base64,(.*)/)
    const buf = new Buffer(data, 'base64')
    zip.file(`images/${image.id}.${type}`, buf, {base64: true})
  })

  return zip.generateNodeStream({
    platform: process.platform,
    compression: 'DEFLATE',
    compressionOptions:{level: 9},
    streamFiles:true
  })
}
