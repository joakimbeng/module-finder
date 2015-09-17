'use strict';
var test = require('ava');
var filter = require('./');

test('filter() should be able to filter packages by version', function (assert) {
  var pkgs = [
    {
      pkg: {
        name: 'a-module',
        version: '1.0.0'
      }
    },
    {
      pkg: {
        name: 'another',
        version: '0.9.5'
      }
    },
    {
      pkg: {
        name: 'third',
        version: '2.4.0'
      }
    }
  ];

  assert.plan(4);

  return filter(pkgs, {$version: '<1.0.0 || ^2.0.0'})
    .then(function (filtered) {
      assert.ok(Array.isArray(filtered), 'the result should be an array');
      assert.is(filtered.length, 2, 'two packages should match');
      assert.is(filtered[0].pkg.name, pkgs[1].pkg.name, '"another" module should match');
      assert.is(filtered[1].pkg.name, pkgs[2].pkg.name, '"third" module should match');
    });
});
