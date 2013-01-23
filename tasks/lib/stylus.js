/*
 * grunt-contrib-stylus
 * https://gruntjs.com/
 *
 * Copyright (c) 2012 "Cowboy" Ben Alman, contributors
 * Licensed under the MIT license.
 */

'use strict';

// External libs.
var stylus = require('stylus');

exports.init = function(grunt) {
  var exports = {};

  exports.compileFile = function(srcFile, options, callback) {
    options = grunt.util._.extend({filename: srcFile}, options);

    exports.compile(grunt.file.read(srcFile), options, callback);
  };

  exports.compile = function(srcCode, options, callback) {
    // Never compress output in debug mode
    if (grunt.option('debug')) {
      options.compress = false;
    }

    var s = stylus(srcCode);

    grunt.util._.each(options, function(value, key) {
      if (key === 'urlfunc') {
        // Custom name of function for embedding images as Data URI
        s.define(value, stylus.url());
      } else if (key === 'use') {
        value.forEach(function(func) {
          if (typeof func === 'function') {
            s.use(func());
          }
        });
      } else {
        s.set(key, value);
      }
    });

    // Load Nib if available
    try {
      s.use(require('nib')());
    } catch (e) {}

    s.render(function(err, css) {
      if (err) {
        grunt.log.error(err);
        grunt.fail.warn('Stylus failed to compile.');

        callback(css, true);
      } else {
        callback(css, null);
      }
    });
  };

  return exports;
};
