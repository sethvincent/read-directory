var fs = require('fs')
var path = require('path')
var each = require('each-async')
var glob = require('glob')
var defaults = require('defaults')

var defaultOptions = {
  encoding: 'utf8',
  filter: '**/*',
  dirnames: false
}

/**
* Read the contents of a directory asynchronously
* @name readDirectory
* @param {String} dir – The directory to read
* @param {Object} options
* @param {Object} options.fs – alternate fs implementation, optional
* @param {Boolean} options.dirnames – include or exclude subdirectory names in keys of returned object
* @param {String} options.encoding – encoding of files, default: utf8
* @param {String} options.filter – glob pattern for filtering files, examples: `*.md`, `*.css`
* @param {String} options.ignore – glob pattern for ignoring files
* @param {Array} options.ignore – array of glob patterns for ignoring files
* @param {Function} options.transform – A function you can use to transform the contents of files after they are read
* @example
* var read = require('read-directory')
* read('./files', function (err, contents) {
*   console.log(contents)
* })
**/
module.exports = module.exports.async = function readDirectory (dir, options, callback) {
  // browserify transform
  if (typeof dir === 'string' && !/\n/.test(dir) && options && options._flags) {
    var args = Array.prototype.slice.apply(arguments)
    return require('./transform.js').apply(this, args)
  }

  if (typeof options === 'function') {
    callback = options
    options = {}
  }

  options = defaults(options, defaultOptions)

  var xfs = options.fs || fs
  var transform = options.transform
  var dirnames = options.dirnames
  var encoding = options.encoding
  var filter = options.filter
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
    xfs.stat(fullpath, function (err, stats) {
      if (err) return done(err)
      if (!stats.isFile()) return done()

      xfs.readFile(fullpath, encoding, function (err, file) {
        if (err) return done(err)
        var parsed = path.parse(filepath)
        if (transform) file = transform(file, parsed)
        if (dirnames) filepath = parsed.dir.length ? parsed.dir + '/' + filepath : filepath
        contents[filepath] = file
        done()
      })
    })
  }
}

/**
* Read the contents of a directory asynchronously
* @name readDirectory.sync
* @param {String} dir – The directory to read
* @param {Object} options
* @param {Object} options.fs – alternate fs implementation, optional
* @param {Boolean} options.dirnames – include or exclude subdirectory names in keys of returned object
* @param {String} options.encoding – encoding of files, default: utf8
* @param {String} options.filter – glob pattern for filtering files, examples: `*.md`, `*.css`
* @param {String} options.ignore – glob pattern for ignoring files
* @param {Array} options.ignore – array of glob patterns for ignoring files
* @param {Function} options.transform – A function you can use to transform the contents of files after they are read
* @example
* var read = require('read-directory')
* var contents = read.sync('./files')
*/
module.exports.sync = function readDirectorySync (dir, options) {
  options = defaults(options, defaultOptions)

  var xfs = options.fs || fs
  var transform = options.transform
  var dirnames = options.dirnames
  var encoding = options.encoding
  var filter = options.filter
  var ignore = options.ignore

  var files = glob.sync(filter, { cwd: dir, ignore: ignore })
  var contents = {}

  files.forEach(function (filepath, i) {
    var fullpath = path.join(dir, filepath)
    var parsed = path.parse(filepath)
    var stats = xfs.statSync(fullpath)

    if (stats.isFile()) {
      var file = xfs.readFileSync(fullpath, encoding)
      if (transform) file = transform(file, parsed)
      if (dirnames) filepath = parsed.dir.length ? parsed.dir + '/' + filepath : filepath
      contents[filepath] = file
    }
  })

  return contents
}
