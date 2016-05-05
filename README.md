# read-directory

Read a directory of files.

## Install

```bash
npm install --save read-directory
```

## Examples

### Async example:

```js
var read = require('read-directory')
read('./files', function (err, contents) {
  console.log(contents)
})
```

### Sync example:

```js
var read = require('read-directory')
var contents = read.sync('./files')
```

## Using in the browser with browserify & budo

Use the included [browserify transform module](transform.js) to convert calls to `read.sync` to the contents of the directory.

Note that to use the browserify transform you must use `read.sync`, and the path to the file directory can not be a variable.

### File that will be browserified & transformed:

```js
var path = require('path')
var read = require('read-directory')
var contents = read.sync(path.join(__dirname, 'files'))
```

### Browserify example:

```bash
browserify index.js -t read-directory/transform -o bundle.js 
```

### budo example:

```bash
budo index.js:bundle.js -- -t read-directory/transform
```

## License
[MIT](LICENSE.md)
