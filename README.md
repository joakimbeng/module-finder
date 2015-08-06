# module-finder

[![NPM version][npm-image]][npm-url] [![js-semistandard-style][codestyle-image]][codestyle-url]

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
// version numbers below 1.0.0 and which has
// "test" as one of their keywords:
moduleFinder(
  {
    local: true,
    filter: {
      $version: '<1.0.0',
      keywords: {$in: ['test']}
    }
  },
  function (err, modules) {
    console.log(modules);
  }
);
```

## API

### `moduleFinder(options, cb)`

| Name | Type | Description |
|------|------|-------------|
| options | `Object` | Options, [see below](#options) |
| cb | `Function` | Callback function |

Finds all installed modules according to given `options`.

#### Options

| Key | Type | Default | Description
|------|------|-------------|---------|
| local | `Boolean` | `false` | Specifies if module-finder will search for local modules |
| global | `Boolean` | `false` | Specifies if module-finder will search for global modules |
| cwd | `String` | `NULL` | Set current working directory, affects what counts as local modules |
| filter | `Object` | `{}` | A MongoDB like query object to filter modules by, [see below](#optionsfilter) |

##### options.filter

The passed filter object is passed to [Sift](https://www.npmjs.com/package/sift) which filters the found modules by their `package.json` contents accordingly.

A special Sift operator exists: `$version` (see the code example above) which takes a string to use as the range argument to [`semver.satisfies()`](https://www.npmjs.com/package/semver).

## License

MIT

[npm-url]: https://npmjs.org/package/module-finder
[npm-image]: https://badge.fury.io/js/module-finder.svg
[codestyle-url]: https://github.com/Flet/semistandard
[codestyle-image]: https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat
