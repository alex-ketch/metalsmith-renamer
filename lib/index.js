'use strict';
var minimatch = require('minimatch');

module.exports = plugin;

function plugin(options) {
  return function(files, metalsmith, done) {
    Object.keys(options).forEach(function(opt) {
      var matcher = minimatch.Minimatch(options[opt].pattern);

      Object.keys(files).forEach(function(file) {
        if (!matcher.match(file)) {
          return;
        }

        files[file].path.name = options[opt].rename;
        files[file].path.base = options[opt].rename;
        var renamedEntry = files[file].path.dir + "/" + options[opt].rename;
        files[renamedEntry] = files[file];
        delete files[file];
      });
    });
    done();
  };
}
