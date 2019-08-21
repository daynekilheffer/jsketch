import JSZip from 'jszip'

export default (file) => {
  const {meta, user, document, pages} = file.toJSON()
  const zip = new JSZip()

  zip.file('meta.json', JSON.stringify(meta))
  zip.file('user.json', JSON.stringify(user))
  zip.file('document.json', JSON.stringify(document))

  pages.forEach(page => {
    zip.file(`pages/${page.do_objectID}.json`, JSON.stringify(page), {createFolders: false})
  })

  return zip.generateNodeStream({
    platform: process.platform,
    compression: 'DEFLATE',
    compressionOptions:{level: 9},
    streamFiles:true
  })
}
