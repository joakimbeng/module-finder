'use strict';
var join = require('path').join;
var dirname = require('path').dirname;
var reduce = require('async-reduce');
var readJson = require('read-package-json');
var isExistingFile = require('is-existing-file');
var readdirs = require('readdirs-absolute');

module.exports = exports = getPackageInfos;

function getPackageInfos (paths, cb) {
  readdirs(paths, function (err, folders) {
    if (err) {
      return cb(err);
    }
    getOnlyPackages(folders, function (err, pkgs) {
      if (err) {
        return cb(err);
      }
      readPackageInfos(pkgs, cb);
    });
  });
}

function getOnlyPackages (files, done) {
  reduce(files, [], function (result, file, cb) {
    var pkg = join(file, 'package.json');
    isExistingFile(pkg, function (yes) {
      if (yes) {
        result.push(pkg);
      }
      cb(null, result);
    });
  }, done);
}

function readPackageInfos (files, done) {
  reduce(files, [], function (result, file, cb) {
    readJson(file, function (err, pkg) {
      if (err) {
        return cb(err);
      }
      if (pkg) {
        pkg._path = dirname(file);
        result.push(pkg);
      }
      cb(null, result);
    });
  }, done);
}

