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

    var newFileDest, srcFiles;
    var done = this.async();
    var path = require('path');
    var helpers = require('grunt-lib-contrib').init(grunt);

    var options = this.options({
      basePath: false,
      flatten: false
    });

    grunt.verbose.writeflags(options, 'Options');

    // get files
    var files = this.file.src;
    var destFile = path.normalize(this.file.dest);

    if (files.length === 0) {
      grunt.fail.warn('Unable to compile; no valid source files were found.');
      done();
    }

    // hack by chris to support compiling individual files
    if (helpers.isIndividualDest(destFile)) {
      var basePath = helpers.findBasePath(files, options.basePath);
      grunt.util.async.forEachSeries(files, function(file, next) {
        var newFileDest = helpers.buildIndividualDest(destFile, file, basePath, options.flatten);
        compileStylus(file, options, function(css, err) {
          if(!err) {
            grunt.file.write(newFileDest, css || '');
            grunt.log.writeln('File ' + newFileDest.cyan + ' created.');
            next(null);
          } else {
            done(false);
          }
        });
      }, function() {

        done();
      });
    } else {
      // normal execution
      var compiled = [];
      grunt.util.async.concatSeries(files, function(file, next) {
        compileStylus(file, options, function(css, err) {
          if(!err) {
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
    }
  });

  var compileStylus = function(srcFile, options, callback) {
    options = grunt.util._.extend({filename: srcFile}, options);
    delete options.basePath;
    delete options.flatten;

    // Compress output by default but never in debug mode
    if (grunt.option('debug')) {
      options.compress = false;
    } else if (options.compress === undefined) {
      options.compress = true;
    }

    var srcCode = grunt.file.read(srcFile);
    var s = require('stylus')(srcCode);

    try {
      s.use(require('nib')());
    } catch (e) {}

    grunt.util._.each(options, function(value, key) {
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
