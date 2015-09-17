'use strict';
var sift = require('sift');
var semver = require('semver');

sift.use({
  $version: function (a, b) {
    return semver.satisfies(b.version, a);
  }
});

module.exports = exports = function filter(arr, f) {
  return Promise.resolve(sift({pkg: f || {}}, arr));
};
