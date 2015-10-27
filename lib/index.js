'use strict';

// var debug = require('debug')('metalsmith-rename'),
var minimatch = require('minimatch');

module.exports = plugin;

function plugin(options) {
  return function(files, metalsmith, done) {
    var matcher = minimatch.Minimatch(options.pattern);

    Object.keys(files).forEach(function (file) {
      if (!matcher.match(file)) return;
      files[file].path.name = options.rename;
      files[file].path.base = options.rename;
      var renamedEntry = files[file].path.dir + "/" + options.rename;
      files[renamedEntry] = files[file];
      delete files[file];
    });

    done();
  };
}
