'use strict';
var sift = require('sift');
var semver = require('semver');

sift.use({
  $version: function (a, b) {
    return semver.satisfies(b.version, a);
  }
});

module.exports = exports = function filter (arr, f, cb) {
  f = f || {};
  cb(null, sift(f, arr));
};
