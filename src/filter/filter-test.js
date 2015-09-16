'use strict';
var test = require('ava');
var filter = require('./');

test('filter() should be able to filter packages by version', function (assert) {
  var pkgs = [
    {
      name: 'a-module',
      version: '1.0.0'
    },
    {
      name: 'another',
      version: '0.9.5'
    },
    {
      name: 'third',
      version: '2.4.0'
    }
  ];

  return filter(pkgs, {$version: '<1.0.0 || ^2.0.0'})
    .then(function (filtered) {
      assert.ok(Array.isArray(filtered), 'the result should be an array');
      assert.is(filtered.length, 2, 'two packages should match');
      assert.is(filtered[0].name, pkgs[1].name, '"another" module should match');
      assert.is(filtered[1].name, pkgs[2].name, '"third" module should match');
      assert.end();
    });
});
