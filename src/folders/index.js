'use strict';
var pify = require('pify');
var root = pify(require('npm-root'));

module.exports = function folders(opts) {
  var rootOptions = [];

  if (opts.global) {
    rootOptions.push({global: true});
  }

  if (opts.local) {
    rootOptions.push({cwd: opts.cwd});
  }

  return Promise.all(rootOptions.map(function (opts) {
    return root(opts);
  }));
};
