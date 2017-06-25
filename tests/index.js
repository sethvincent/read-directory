var path = require('path')
var test = require('tape')
var browserify = require('browserify')
var read = require('../index')

test('async: read all files', function (t) {
  read(path.join(__dirname, 'files'), function (err, contents) {
    t.notOk(err)
    t.ok(contents)
    t.equal(typeof contents, 'object')
    t.equal(Object.keys(contents).length, 7)
    t.end()
  })
})

test('sync: read all files', function (t) {
  var contents = read.sync(path.join(__dirname, 'files'))
  t.ok(contents)
  t.equal(typeof contents, 'object')
  t.equal(Object.keys(contents).length, 7)
  t.end()
})

test('async: filter out .txt', function (t) {
  read(path.join(__dirname, 'files'), { filter: '**/*.md' }, function (err, contents) {
    t.notOk(err)
    t.ok(contents)
    t.equal(typeof contents, 'object')
    t.equal(Object.keys(contents).length, 6)
    t.end()
  })
})

test('sync: filter out .txt', function (t) {
  var contents = read.sync(path.join(__dirname, 'files'), { filter: '**/*.md' })
  t.ok(contents)
  t.equal(typeof contents, 'object')
  t.equal(Object.keys(contents).length, 6)
  t.end()
})

test('async: include extensions', function (t) {
  read(path.join(__dirname, 'files'), { extensions: true }, function (err, contents) {
    t.notOk(err)
    t.ok(contents)
    t.equal(typeof contents, 'object')
    var keys = Object.keys(contents)
    t.equal(keys.length, 7)
    keys.forEach(function (key) {
      t.equal(key.split('.').length, 2)
    })
    t.end()
  })
})

test('sync: include extensions', function (t) {
  var contents = read.sync(path.join(__dirname, 'files'), { extensions: true })
  t.ok(contents)
  t.equal(typeof contents, 'object')
  var keys = Object.keys(contents)
  t.equal(keys.length, 7)
  keys.forEach(function (key) {
    t.equal(key.split('.').length, 2)
  })
  t.end()
})

test('async: exclude extensions', function (t) {
  read(path.join(__dirname, 'files'), { extensions: true }, function (err, contents) {
    t.notOk(err)
    t.ok(contents)
    t.equal(typeof contents, 'object')
    var keys = Object.keys(contents)
    t.equal(keys.length, 7)
    t.end()
  })
})

test('sync: exclude extensions', function (t) {
  var contents = read.sync(path.join(__dirname, 'files'), { extensions: true })
  t.ok(contents)
  t.equal(typeof contents, 'object')
  var keys = Object.keys(contents)
  t.equal(keys.length, 7)
  keys.forEach(function (key) {
    t.equal(key.split('.').length, 2)
  })
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

test('alternate fs implementation', function (t) {
  var mirror = require('mirror-folder')
  var drive = require('hyperdrive')('./tmp/drive')
  var dir = path.join(__dirname, 'files')
  var progress = mirror(dir, { name: dir, fs: drive })

  progress.on('end', function () {
    read(dir, { fs: drive }, function (err, contents) {
      t.notOk(err)
      t.ok(contents)
      t.equal(typeof contents, 'object')
      t.equal(Object.keys(contents).length, 7)
      t.end()
    })
  })
})
