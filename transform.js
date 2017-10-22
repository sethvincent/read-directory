var path = require('path')
var through = require('through2')
var staticModule = require('static-module')
var readDirectory = require('./index')

module.exports = function readDirectoryTransform (filename) {
  if (/\.json$/.test(filename)) return through()

  var basedir = path.dirname(filename)
  var vars = {
    __filename: filename,
    __dirname: basedir
  }

  var sm = staticModule({
    'read-directory': {
      sync: function (dir, options) {
        dir = path.isAbsolute(dir) ? dir : path.resolve(dir)

        var stream = through(write, end)
        var obj = readDirectory.sync(dir, options)
        stream.push(JSON.stringify(obj))
        stream.end()

        return stream

        function write (buf, enc, next) {
          this.push(buf)
          next()
        }

        // Make sure all files are watched
        function end (next) {
          filenames(dir, obj).forEach(function (filename) {
            sm.emit('file', filename)
          })
          next()
        }
      }
    }
  }, { vars: vars, varModules: { path: path } })

  return sm
}

function filenames (base, obj) {
  return Object.keys(obj).map(function (filename) {
    return path.join(base, filename)
  })
}
