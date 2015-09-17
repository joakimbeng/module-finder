'use strict';
var path = require('path');
var test = require('ava');

var packages = require('./.');
var packagesPath = path.resolve(__dirname, '..', '..', 'node_modules');

test('packages() gets all package info\'s for packages in given folders', function (assert) {
  return packages([packagesPath])
    .then(function (result) {
      assert.ok(Array.isArray(result), 'result should be an array');
      assert.ok(result.length, 'with contents');
      var names = result.map(pluck('pkg')).map(pluck('name'));
      assert.ok(names.indexOf('ava') > -1, 'ava should be one of the packages');
      assert.end();
    });
});

test('packages() attaches the package\'s `package.json` path to its info object', function (assert) {
  return packages([packagesPath])
    .then(function (result) {
      assert.ok(
        result.map(pluck('path')).indexOf(path.join(packagesPath, 'ava', 'package.json')) > -1,
        'ava\'s package.json path should exist'
      );
      assert.end();
    });
});

function pluck(prop) {
  return function (obj) {
    return obj[prop];
  };
}
