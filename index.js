'use strict';
var filter = require('./src/filter');
var folders = require('./src/folders');
var packages = require('./src/packages');

module.exports = exports = moduleFinder;

function moduleFinder (opts, cb) {
  opts = opts || {};
  opts.cwd = opts.cwd || process.cwd();
  opts.local = !!opts.local;
  opts.global = !!opts.global;

  folders(opts, function (err, dirs) {
    if (err) {
      return cb(err);
    }
    packages(dirs, function (err, pkgs) {
      if (err) {
        return cb(err);
      }
      filter(pkgs, opts.filter, cb);
    });
  });
};
