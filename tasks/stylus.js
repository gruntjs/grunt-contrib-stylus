/*
 * grunt-contrib-stylus
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 Eric Woroshow, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  grunt.registerMultiTask('stylus', 'Compile Stylus files into CSS', function() {
    var done = this.async();
    var path = require('path');

    var options = this.options({
      compress: true
    });

    if (options.basePath || options.flatten) {
      grunt.fail.warn('experimental destination wildcards are no longer supported. please refer to readme.');
    }

    grunt.verbose.writeflags(options, 'Options');

    // Get files
    var files = this.file.src;
    var destFile = path.normalize(this.file.dest);

    if (files.length === 0) {
      grunt.fail.warn('Unable to compile; no valid source files were found.');
      done();
    }

    var compiled = [];
    grunt.util.async.concatSeries(files, function(file, next) {
      compileStylus(file, options, function(css, err) {
        if (!err) {
          compiled.push(css);
          next(null);
        } else {
          done(false);
        }
      });
    }, function() {
      grunt.file.write(destFile, compiled.join('\n'));
      grunt.log.writeln('File ' + destFile.cyan + ' created.');
      done();
    });
  });

  var compileStylus = function(srcFile, options, callback) {
    options = grunt.util._.extend({filename: srcFile}, options);

    // Never compress output in debug mode
    if (grunt.option('debug')) {
      options.compress = false;
    }

    var srcCode = grunt.file.read(srcFile);
    var stylus = require('stylus');
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
};
