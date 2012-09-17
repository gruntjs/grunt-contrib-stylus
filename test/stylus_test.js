var grunt = require('grunt');

exports.stylus = {
  compile: function(test) {
    'use strict';

    test.expect(2);

    var actual = grunt.file.read('tmp/stylus.css');
    var expected = grunt.file.read('test/expected/stylus.css');
    test.equal(expected, actual, 'should compile stylus to css, handling includes and compression');

    actual = grunt.file.read('tmp/stylus_b.css');
    expected = grunt.file.read('test/expected/stylus_b.css');
    test.equal(expected, actual, 'should concat output when passed an array');

    test.done();
  }
};