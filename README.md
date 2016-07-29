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

## API

### readDirectory

Read the contents of a directory asynchronously

**Parameters**

-   `dir` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** – The directory to read
-   `options` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
    -   `options.extensions` **[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** – include or exclude file extensions in keys of returned object
    -   `options.dirnames` **[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** – include or exclude subdirectory names in keys of returned object
    -   `options.encoding` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** – encoding of files, default: utf8
    -   `options.filter` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** – glob pattern for filtering files, examples: `*.md`, `*.css`
    -   `options.ignore` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** – glob pattern for ignoring files
    -   `options.ignore` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** – array of glob patterns for ignoring files
    -   `options.transform` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** – A function you can use to transform the contents of files after they are read

**Examples**

```javascript
var read = require('read-directory')
read('./files', function (err, contents) {
  console.log(contents)
})
```

### readDirectory.sync

Read the contents of a directory asynchronously

**Parameters**

-   `dir` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** – The directory to read
-   `options` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
    -   `options.extensions` **[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** – include or exclude file extensions in keys of returned object
    -   `options.dirnames` **[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** – include or exclude subdirectory names in keys of returned object
    -   `options.encoding` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** – encoding of files, default: utf8
    -   `options.filter` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** – glob pattern for filtering files, examples: `*.md`, `*.css`
    -   `options.ignore` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** – glob pattern for ignoring files
    -   `options.ignore` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** – array of glob patterns for ignoring files
    -   `options.transform` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** – A function you can use to transform the contents of files after they are read

**Examples**

```javascript
var read = require('read-directory')
var contents = read.sync('./files')
```

## License

[MIT](LICENSE.md)
