# module-finder

[![Build status][travis-image]][travis-url] [![NPM version][npm-image]][npm-url] [![js-xo-style][codestyle-image]][codestyle-url]

> Finds and filters locally and/or globally installed modules using MongoDB like queries.

## Installation

Install `module-finder` using [npm](https://www.npmjs.com/):

```bash
npm install --save module-finder
```

## Usage

### Module usage

```javascript
var moduleFinder = require('module-finder');

// Example:
// find all locally installed modules with
// version numbers below 1.0.0, which has
// "test" as one of their keywords and
// that has XO as a `devDependency`:
moduleFinder({
  local: true,
  filter: {
    $version: '<1.0.0',
    keywords: {$in: ['test']},
    devDependencies: {xo: {$exists: true}}
  }
})
.then(function (modules) {
    console.log(modules);
    /*
      [
        {
          pkg: {
            name: 'a-package',
            version: '1.0.0',
            ...
          },
          path: '/Users/joakimbeng/project/node_modules/a-package'
        },
        ...
      ]
    */
});
```

## API

### `moduleFinder(options)`

| Name | Type | Description |
|------|------|-------------|
| options | `Object` | Options, [see below](#options) |

Returns: `Promise`, which resolves to all found modules according to given `options`.

#### Options

| Key | Type | Default | Description
|------|------|-------------|---------|
| local | `Boolean` | `false` | Specifies if module-finder will search for local modules |
| global | `Boolean` | `false` | Specifies if module-finder will search for global modules |
| recursive | `Boolean` | `false` | If set all nested `node_modules` folders will be searched as well |
| cwd | `String` | `NULL` | Set current working directory, affects what counts as local modules |
| filter | `Object` | `{}` | A MongoDB like query object to filter modules by, [see below](#optionsfilter) |

##### options.filter

The passed filter object is passed to [Sift](https://www.npmjs.com/package/sift) which filters the found modules by their `package.json` contents accordingly.

A special Sift operator exists: `$version` (see the code example above) which takes a string to use as the range argument to [`semver.satisfies()`](https://www.npmjs.com/package/semver).

## License

MIT © Joakim Carlstein

[npm-url]: https://npmjs.org/package/module-finder
[npm-image]: https://badge.fury.io/js/module-finder.svg
[travis-url]: https://travis-ci.org/joakimbeng/module-finder
[travis-image]: https://travis-ci.org/joakimbeng/module-finder.svg?branch=master
[codestyle-url]: https://github.com/sindresorhus/xo
[codestyle-image]: https://img.shields.io/badge/code%20style-xo-brightgreen.svg?style=flat
