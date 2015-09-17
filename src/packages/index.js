'use strict';
var reduce = require('promise-reduce');
var readPkg = require('read-pkg');
var readdirp = require('readdirp');

module.exports = exports = getPackageInfos;

function getPackageInfos(paths, opts) {
  return getPackages(paths, opts).then(readPackageInfos);
}

function readPackageInfos(files) {
  return reduce(function (result, file) {
    return readPkg(file).then(function (pkg) {
      result.push({pkg: pkg, path: file});
      return result;
    });
  }, [])(files);
}

function getPackages(paths, opts) {
  opts = opts || {};
  return reduce(function (result, path) {
    return new Promise(function (resolve, reject) {
      var error;
      readdirp({root: path, depth: opts.recursive ? null : 1, fileFilter: 'package.json'})
        .on('data', function (d) {
          result.push(d.fullPath);
        })
        .on('error', function (err) {
          error = err;
        })
        .on('end', function () {
          if (error && error.code !== 'ENOENT') {
            return reject(error);
          }
          resolve(result);
        });
    });
  }, [])(paths);
}
