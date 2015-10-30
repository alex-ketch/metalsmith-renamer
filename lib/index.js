'use strict';
var minimatch = require('minimatch'),
    path      = require('path');

module.exports = plugin;

function plugin(options) {
  return function(files, metalsmith, done) {
    Object.keys(options).forEach(function(opt) {
      var matcher = minimatch.Minimatch(options[opt].pattern);

      Object.keys(files).forEach(function(file) {
        if (!matcher.match(file)) {
          return;
        }

        var renamedEntry = path.dirname(file) + "/" + options[opt].rename;
        files[renamedEntry] = files[file];
        delete files[file];
      });
    });
    done();
  };
}
