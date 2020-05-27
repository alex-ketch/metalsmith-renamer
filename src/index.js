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

        var rename = options[opt].rename;
        var renamedEntry = path.dirname(file) + '/';

        if (renamedEntry === './') {
          renamedEntry = '';
        }
        if (typeof rename === 'function') {
          renamedEntry += rename(path.basename(file));
        } else {
          renamedEntry += rename;
        }

        if (renamedEntry !== file) {
          files[renamedEntry] = files[file];
          delete files[file];
        }
      });
    });
    done();
  };
}
