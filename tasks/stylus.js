/*
 * grunt-contrib-stylus
 * http://gruntjs.com/
 *
 * Copyright (c) 2016 Eric Woroshow, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  var async = require('async');
  var _ = require('lodash');
  var compileStylus = function(srcFile, options, callback) {
    options = _.extend({filename: srcFile}, options);

    // Never compress output in debug mode
    if (grunt.option('debug')) {
      options.compress = false;
    }

    var srcCode = grunt.file.read(srcFile);
    var stylus = require('stylus');
    var s = stylus(srcCode);

    if (options.rawDefine) {
      // convert string option to an array with single value.
      if (_.isString(options.rawDefine)) {
        options.rawDefine = [options.rawDefine];
      }
    }

    function shouldUseRawDefine(key) {
      if (options.rawDefine === true) {
        return true;
      } else if (_.isArray(options.rawDefine)) {
        return _.includes(options.rawDefine, key);
      }
      return false;
    }

    _.each(options, function(value, key) {
      if (key === 'urlfunc') {
        // Custom name of function for embedding images as Data URI
        if (_.isString(value)) {
          s.define(value, stylus.url());
        } else {
          s.define(value.name, stylus.url({
            limit: value.limit !== null ? value.limit : 30000,
            paths: value.paths ? value.paths : []
          }));
        }
      } else if (key === 'use') {
        value.forEach(function(func) {
          if (_.isFunction(func)) {
            s.use(func());
          }
        });
      } else if (key === 'define') {
        for (var defineName in value) {
          s.define(defineName, value[defineName], shouldUseRawDefine(defineName));
        }
      } else if (key === 'rawDefine') {
        // do nothing.
      } else if (key === 'import') {
        value.forEach(function(stylusModule) {
          s.import(stylusModule);
        });
      } else if (key === 'resolve url') {
        s.define('url', stylus.resolver());
      } else if (key === 'resolve url nocheck') {
        s.define('url', stylus.resolver({nocheck: true}));
      } else {
        s.set(key, value);
      }
    });

    // Load Nib if available
    try {
      s.use(require('nib')());
    } catch (e) {}

    s.render(function(err, css) {
      var map = s.sourcemap ? JSON.stringify(s.sourcemap) : null;
      if (err) {
        grunt.log.error(err);
        grunt.fail.warn('Stylus failed to compile.');
      }
      callback(css, map, err ? err : false);
    });
  };

  grunt.registerMultiTask('stylus', 'Compile Stylus files into CSS', function() {
    var done = this.async();
    var path = require('path');
    var chalk = require('chalk');
    var sourceMapUrl = require("source-map-url");

    var options = this.options({
      banner: '',
      compress: true
    });

    var banner = options.banner;

    var filesCreatedCount = 0;
    var sourcemapsCreated = 0;

    if (options.basePath || options.flatten) {
      grunt.fail.warn('Experimental destination wildcards are no longer supported. Please refer to README.');
    }

    async.forEachSeries(this.files, function(f, n) {
      var destFile = path.normalize(f.dest);

      if (options.relativeDest) {
        destFile = path.dirname(f.dest) + '/' + options.relativeDest + '/' + path.basename(f.dest);
        destFile = destFile.replace('//', '/');
      }

      options.dest = destFile;

      var srcFiles = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        }
        return true;
      });

      if (srcFiles.length === 0) {
        // No src files, goto next target. Warn would have been issued above.
        return n();
      }

      var compiled = [];
      var sourcemaps = [];
      async.concatSeries(srcFiles, function(file, next) {
        compileStylus(file, options, function(css, map, err) {
          if (!err) {
            compiled.push(css);
            if (map) {
              sourcemaps.push(map);
            }
            next(null);
          } else {
            n(false);
          }
        });
      }, function() {
        if (compiled.length < 1) {
          grunt.log.warn('Destination not written because compiled files were empty.');
        } else {

          if (options.sourcemap && !options.sourcemap.inline) {
            if(sourcemaps.length > 1) {
              grunt.fail.warn('Must use 1:1 compile when using sourcemaps');
            }
            grunt.file.write(destFile + '.map', sourcemaps.join(grunt.util.normalizelf(grunt.util.linefeed)));
            grunt.verbose.writeln('File ' + chalk.cyan(destFile + '.map') + ' created.');
            if(options.sourcemap.comment) {
              compiled[0] = sourceMapUrl.removeFrom(compiled[0]);
              compiled[0] += '/*# sourceMappingURL=' + path.basename(destFile) + '.map */';
            }
            sourcemapsCreated++;
          }
          grunt.file.write(destFile, banner + compiled.join(grunt.util.normalizelf(grunt.util.linefeed)));
          grunt.verbose.writeln('File ' + chalk.cyan(destFile) + ' created.');
          filesCreatedCount++;
        }
        n();
      });
    }, function() {
      grunt.log.ok(filesCreatedCount + ' ' + grunt.util.pluralize(filesCreatedCount, 'file/files') + ' created.');

      if (sourcemapsCreated) {
        grunt.log.ok(sourcemapsCreated + ' ' + grunt.util.pluralize(sourcemapsCreated, 'sourcemap/sourcemaps') + ' created.');
      }

      done();
    });
  });
};
