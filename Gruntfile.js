/*
 * grunt-contrib-stylus
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 Eric Woroshow, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      test: ['tmp']
    },

    // Configuration to be run (and then tested).
    stylus: {
      compile: {
        files: {
          'tmp/stylus.css': ['test/fixtures/stylus.styl'],
          'tmp/concat.css': ['test/fixtures/stylus.styl', 'test/fixtures/stylus2.styl'],
          'tmp/individual/*.css': ['test/fixtures/*.styl', 'test/fixtures/level2/*.styl']
        },
        options: {
          paths: ['test/fixtures/include'],
          compress: true
        }
      },
      flatten: {
        files: {
          'tmp/individual_flatten/*.css': ['test/fixtures/*.styl', 'test/fixtures/level2/*.styl']
        },
        options: {
          paths: ['test/fixtures/include'],
          compress: true,
          flatten: true
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-internal');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['stylus', 'test', 'build-contrib']);

};