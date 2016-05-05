var path = require('path')
var read = require('read-directory')
var contents = read.sync(path.join(__dirname, 'files'))
