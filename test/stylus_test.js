var grunt = require('grunt');

exports['stylus'] = {
  main: function(test) {
    'use strict';

    var expect, result;
    test.expect(2);

    expect = "body{font:Helvetica;font-size:10px}\n";
    result = grunt.file.read("tmp/stylus.css");
    test.equal(expect, result, "should compile stylus to css, handling includes and compression");

    expect = "body{font:Helvetica;font-size:10px}\n\n#header{font:Helvetica}\n";
    result = grunt.file.read("tmp/stylus_b.css");
    test.equal(expect, result, "should concat output when passed an array");

    test.done();
  }
};