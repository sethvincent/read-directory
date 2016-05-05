var fs = require('fs')
var path = require('path')
var each = require('each-async')

function readDirectory (dir, options, callback) {
  if (typeof options === 'function') {
    callback = options
    options = {}
  }

  options = options || {}
  options.encoding = options.encoding || 'utf8'
  var contents = {}

  fs.readdir(dir, function (err, files) {
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
    fs.readFile(fullpath, options.encoding, function (err, file) {
      if (err) return done(err)
      contents[filepath] = file
      done()
    })
  }
}

module.exports = module.exports.async = readDirectory
module.exports.sync = function readDirectorySync (dir, options) {
  options = options || {}
  options.encoding = options.encoding || 'utf8'
  var files = fs.readdirSync(dir)
  var contents = {}

  files.forEach(function (filepath, i) {
    var fullpath = path.join(dir, filepath)
    contents[filepath] = fs.readFileSync(fullpath, options.encoding)
  })

  return contents
}
