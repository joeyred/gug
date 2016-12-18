# Gug

**Current Version:** 0.1.0

[gulp-pug]: https://www.npmjs.com/package/gulp-pug
[pug-api]: https://pugjs.org/api/reference.html

Currently this is a data handler for pug when using
[gulp-pug][gulp-pug].

For now, the future of this module is
rather uncertain, but the current intent is for this to evolve into a static site
generator, of sorts, powered by gulp and utilizing pug templating. Whether or not this
means that this module will handle compiling pug files in the future or not is completely
dependent on the needs of the projects this package is used on, and the limits of
`gulp-pug`.

_**AS OF NOW** THIS PACKAGE DOES NOT ACTUALLY COMPILE PUG FILES._

## Installation

```
npm install gug --save-dev
```

## How to Use

This module will accept all option parameters from both the [pug API][pug-api] and [gulp-pug][gulp-pug], as well as additional options specific to this module.

This module, however, does handle the `basedir` option on its own, if it is not passed.

If no options are passed to Gug, or the only options passed are not Gug specific, then
the file structure should look like this to work with gug:

```
.
├── src
│   ├── pug
│   │   ├── config
│   │   │   ├── collections.yml
│   │   │   └── site.yml
│   │   ├── includes
│   │   ├── layouts
│   │   └── index.pug
├── gulpfile.js
└── package.json
```
To use this with gulp and [gulp-pug][gulp-pug], instead of passing an `opts` object to
gulp-pug, pass this plugin's method with `.pug` added, and do the same with the `gulp.src`
value with `.src` added instead.

### Example

```js
var pug = require('gulp-pug');
var gug = require('gug');

/* Pug */
gulp.task('pug', function() {
  return gulp.src(gug().src)
  .pipe(pug(gug().pug))
  .pipe(gulp.dest('dist'));
});
```

### Gug Options

Gug takes a single options object as a parameter. Below is the list of keys that can be
passed in that object and the default values of those keys.

#### `sourceDir` - `(string)`
- Name of the directory for the site's/app's source files.
- **Default**: `'src'`

#### `pugDir` - `(string)`
- Name of the directory for pug files.
- **Default**: `'pug'`

#### `configDir` - `(string)`
- Name of the directory that contains all Gug config files.
- **Default**: `'config'`

#### `configFiles` - `(object)`
- An object containing the names of config files.

#### `configFiles.site` - `(string)`
- Name of the site config file. **Extension must be included**
- **Default**: `'site.yml'`

#### `configFiles.collections` - `(string)`
- Name of the collections config file. **Extension must be included**
- **Default**: `'collections.yml'`

Just pass the object into this plugin function as it's passed into the `gulp-pug`
function.
