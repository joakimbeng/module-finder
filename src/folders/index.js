'use strict';
var root = require('npm-root');
var isExistingFolder = require('is-existing-folder');
var reduce = require('async-reduce');

module.exports = exports = function folders (opts, cb) {
  getPaths(opts, function (err, paths) {
    if (err) {
      return cb(err);
    }
    exports.getExistingFolders(paths, cb);
  });
};

function getPaths (options, done) {
  var rootOptions = [];

  if (options.global) {
    rootOptions.push({global: true});
  }

  if (options.local) {
    rootOptions.push({cwd: options.cwd});
  }

  reduce(rootOptions, [], function (paths, opts, cb) {
    root(opts, function (err, path) {
      if (!err) {
        paths.push(path);
      }
      cb(err, paths);
    });
  }, done);
}

exports.getExistingFolders = function getExistingFolders (paths, done) {
  reduce(paths, [], function (result, path, cb) {
    isExistingFolder(path, function (yes) {
      if (yes) {
        result.push(path);
      }
      cb(null, result);
    });
  }, done);
};
