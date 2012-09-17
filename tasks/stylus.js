/*
 * grunt-contrib-stylus
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 Eric Woroshow, contributors
 * Licensed under the MIT license.
 * https://github.com/gruntjs/grunt-contrib-stylus/blob/master/LICENSE-MIT
 */

module.exports = function(grunt) {
  'use strict';

  // TODO: ditch this when grunt v0.4 is released
  grunt.util = grunt.util || grunt.utils;

  var _ = grunt.util._;

  grunt.registerMultiTask('stylus', 'Compile Stylus files into CSS', function() {
    var async = grunt.util.async;
    var helpers = require('grunt-contrib-lib').init(grunt);
    var options = helpers.options(this);

    grunt.verbose.writeflags(options, 'Options');

    // TODO: ditch this when grunt v0.4 is released
    this.files = this.files || helpers.normalizeMultiTaskFiles(this.data, this.target);

    var done = this.async();

    var srcFiles;
    var sourceCode;
    var helperOptions;

    async.forEachSeries(this.files, function(file, next) {
      srcFiles = grunt.file.expandFiles(file.src);

      async.concatSeries(srcFiles, function(srcFile, nextConcat) {
        helperOptions = _.extend({filename: srcFile}, options);
        sourceCode = grunt.file.read(srcFile);

        compileStylus(sourceCode, helperOptions, function(css, err) {
          if(!err) {
            nextConcat(null, css);
          } else {
            done();
          }
        });
      }, function(err, css) {
        grunt.file.write(file.dest, css.join('\n') || '');
        grunt.log.writeln('File ' + file.dest + ' created.');

        next();
      });
    }, function() {
      done();
    });
  });

  var compileStylus = function(source, options, callback) {
    var s = require('stylus')(source);

    // load nib if available
    try {
      s.use(require('nib')());
    } catch (e) {}

    _.each(options, function(value, key) {
      s.set(key, value);
    });

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