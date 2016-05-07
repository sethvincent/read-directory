var path = require('path')
var test = require('tape')
var browserify = require('browserify')
var read = require('../index')

test('read async', function (t) {
  read(path.join(__dirname, 'files'), function (err, contents) {
    t.notOk(err)
    t.ok(contents)
    t.equal(typeof contents, 'object')
    t.equal(Object.keys(contents).length, 3)
    t.end()
  })
})

test('read sync', function (t) {
  var contents = read.sync(path.join(__dirname, 'files'))
  t.ok(contents)
  t.equal(typeof contents, 'object')
  t.equal(Object.keys(contents).length, 3)
  t.end()
})

test('transform for the browser', function (t) {
  var b = browserify(path.join(__dirname, 'example.js'))
  b.on('error', console.log)
  b.transform(require('../transform'))
  b.bundle(function (err, buf) {
    t.notOk(err)
    t.ok(buf)
    t.end()
  })
})
