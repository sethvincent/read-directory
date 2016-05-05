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
        var stream = through()
        stream.push(JSON.stringify(readDirectory.sync(dir, options)))
        stream.push(null)
        return stream
      }
    }
  }, { vars: vars, varModules: { path: path } })

  return sm
}
