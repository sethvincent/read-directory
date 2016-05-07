var fs = require('fs')
var path = require('path')
var each = require('each-async')
var glob = require('glob')

function readDirectory (dir, options, callback) {
  if (typeof options === 'function') {
    callback = options
    options = {}
  }

  options = options || {}
  var extensions = options.extensions === true
  var encoding = options.encoding || 'utf8'
  var filter = options.filter || '*.md'
  var ignore = options.ignore
  var contents = {}

  glob(filter, { cwd: dir, ignore: ignore }, function (err, files) {
    if (err) return callback(err)
    readAllFiles(files)
  })

  function readAllFiles (filenames) {
    each(filenames, readFile, end)

    function end (err) {
      if (err) return callback(err)
      callback(null, contents)
    }
  }

  function readFile (filepath, i, done) {
    var fullpath = path.join(dir, filepath)
    fs.readFile(fullpath, encoding, function (err, file) {
      if (err) return done(err)
      if (!extensions) filepath = removeExtension(filepath)
      contents[filepath] = file
      done()
    })
  }
}

module.exports = module.exports.async = readDirectory
module.exports.sync = function readDirectorySync (dir, options) {
  options = options || {}
  var extensions = options.extensions === true
  var encoding = options.encoding || 'utf8'
  var filter = options.filter || '*.md'
  var ignore = options.ignore
  var files = glob.sync(filter, { cwd: dir, ignore: ignore })
  var contents = {}

  files.forEach(function (filepath, i) {
    var fullpath = path.join(dir, filepath)
    if (!extensions) filepath = removeExtension(filepath)
    contents[filepath] = fs.readFileSync(fullpath, encoding)
  })

  return contents
}

function removeExtension (filename) {
  return filename.replace(/\.[^/.]+$/, '')
}
