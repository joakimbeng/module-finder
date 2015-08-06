'use strict';
var test = require('tape');

var folders = require('./.');

test('getExistingFolders() takes an array of paths and gives all existing folders among them', function (assert) {
  var paths = [
    __dirname,
    __filename
  ];

  folders.getExistingFolders(paths, function (err, dirs) {
    assert.error(err);
    assert.ok(Array.isArray(dirs), 'dirs should be an array');
    assert.equals(dirs.length, 1, 'and have length 1');
    assert.equals(dirs[0], __dirname, 'with current folder in it');
    assert.end();
  });
});
