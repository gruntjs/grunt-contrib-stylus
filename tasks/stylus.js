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

  var path = require('path');

  // TODO: remove if/when we officially drop node <= 0.7.9
  path.sep = path.sep || path.normalize('/');

  grunt.registerMultiTask('stylus', 'Compile Stylus files into CSS', function() {
    var async = grunt.util.async;
    var helpers = require('grunt-contrib-lib').init(grunt);
    var options = helpers.options(this, {
      basePath: false,
      flatten: false
    });

    if (options.basePath) {
      options.basePath = path.normalize(options.basePath);
      options.basePath = grunt.util._(options.basePath).trim(path.sep);
    }

    grunt.verbose.writeflags(options, 'Options');

    // TODO: ditch this when grunt v0.4 is released
    this.files = this.files || helpers.normalizeMultiTaskFiles(this.data, this.target);

    var done = this.async();

    var basePath;
    var destType;
    var newFileDest;

    var srcFiles;

    async.forEachSeries(this.files, function(file, next) {
      srcFiles = grunt.file.expandFiles(file.src);

      if (srcFiles.length === 0) {
        grunt.fail.warn('Unable to compile; no valid source files were found.');
      }

      destType = detectDestType(file.dest);

      if (destType === 'individual') {
        basePath = options.basePath || findBasePath(srcFiles);

        async.forEachSeries(srcFiles, function(srcFile, nextFile) {
          newFileDest = getNewFileDest(file.dest, srcFile, basePath, options.flatten);

          compileStylus(srcFile, options, function(css, err) {
            if(!err) {
              grunt.file.write(newFileDest, css || '');
              grunt.log.writeln('File ' + newFileDest + ' created.');

              nextFile(null);
            } else {
              done();
            }
          });
        }, function(err) {
          next();
        });
      } else {
        async.concatSeries(srcFiles, function(srcFile, nextConcat) {
          compileStylus(srcFile, options, function(css, err) {
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
      }
    }, function() {
      done();
    });
  });

  var compileStylus = function(srcFile, options, callback) {
    options = grunt.util._.extend({filename: srcFile}, options);
    delete options.basePath;
    delete options.flatten;

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

  var detectDestType = function(dest) {
    var destFile = path.basename(dest);

    if (grunt.util._.startsWith(destFile, '*')) {
      return 'individual';
    } else {
      return 'single';
    }
  };

  var getNewFileDest = function(dest, srcFile, basePath, flatten) {
    srcFile = path.normalize(srcFile);

    var newDest = path.dirname(dest);
    var newName = path.basename(srcFile, path.extname(srcFile)) + path.extname(dest);
    var relative = path.dirname(srcFile);

    if (flatten) {
      relative = '';
    } else if (basePath && basePath.length > 1) {
      relative = grunt.util._(relative).chain().strRight(basePath).trim(path.sep).value();
    }

    // make paths outside grunts working dir relative
    relative = relative.replace(/\.\.(\/|\\)/g, '');

    return path.join(newDest, relative, newName);
  };

  var findBasePath = function(srcFiles) {
    var basePaths = [];
    var dirName;

    srcFiles.forEach(function(srcFile) {
      srcFile = path.normalize(srcFile);
      dirName = path.dirname(srcFile);

      basePaths.push(dirName.split(path.sep));
    });

    basePaths = grunt.util._.intersection.apply([], basePaths);

    return path.join.apply(path, basePaths);
  };
};