'use strict';
var assign = require('object-assign');
var filter = require('./src/filter');
var folders = require('./src/folders');
var packages = require('./src/packages');

module.exports = function moduleFinder(opts) {
  opts = assign({
    cwd: process.cwd(),
    local: false,
    global: false,
    recursive: false,
    filter: {}
  }, opts);

  return folders(opts)
    .then(function (dirs) {
      return packages(dirs, opts);
    })
    .then(function (pkgs) {
      return filter(pkgs, opts.filter);
    });
};
