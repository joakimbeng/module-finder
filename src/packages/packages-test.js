'use strict';
var path = require('path');
var test = require('tape');

var packages = require('./.');
var packagesPath = path.resolve(__dirname, '..', '..', 'node_modules');

test('packages() gets all package info\'s for packages in given folders', function (assert) {
  packages([packagesPath], function (err, result) {
    assert.error(err);
    assert.ok(Array.isArray(result), 'result should be an array');
    assert.ok(result.length, 'with contents');
    var names = result.map(pluck('name'));
    assert.ok(names.indexOf('tape') > -1, 'tape should be one of the packages');
    assert.end();
  });
});

test('packages() attaches the package\'s path to its info object', function (assert) {
  packages([packagesPath], function (err, result) {
    assert.ok(
      result.map(pluck('_path')).indexOf(path.join(packagesPath, 'tape')) > -1,
      'tape\'s path should exist'
    );
    assert.end();
  });
});

function pluck (prop) {
  return function (obj) {
    return obj[prop];
  };
}
