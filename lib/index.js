'use strict';

var debug = require('debug')('metalsmith-rename'),
    path = require('path'),
    minimatch = require('minimatch');

module.exports = plugin;

function plugin(options) {
  var matcher = minimatch.Minimatch(options.pattern);
  if (!matcher.match(file)) return;
  console.log(file);
}
