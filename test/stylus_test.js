var grunt = require('grunt');
var fs = require('fs');

exports.stylus = {
  compile: function(test) {
    'use strict';

    test.expect(3);

    var actual = grunt.file.read('tmp/stylus.css');
    var expected = grunt.file.read('test/expected/stylus.css');
    test.equal(expected, actual, 'should compile stylus to css, handling includes and compression');

    actual = grunt.file.read('tmp/concat.css');
    expected = grunt.file.read('test/expected/concat.css');
    test.equal(expected, actual, 'should concat output when passed an array');

    actual = fs.readdirSync('tmp/individual').sort();
    expected = fs.readdirSync('test/expected/individual').sort();
    test.deepEqual(expected, actual, 'should individually compile files');

    test.done();
  },
  flatten: function(test) {
    'use strict';

    test.expect(1);

    var actual = fs.readdirSync('tmp/individual_flatten').sort();
    var expected = fs.readdirSync('test/expected/individual_flatten').sort();
    test.deepEqual(expected, actual, 'should individually compile files (to flat structure)');

    test.done();
  },
  nib: function(test) {
    'use strict';

    test.expect(1);

    var actual = grunt.file.read('tmp/nib_.css');
    var expected = grunt.file.read('test/expected/nib_/nib_.css');
    test.equal(expected, actual, 'Nib should be available to include');

    test.done();
  },
  autocompress: function(test) {
    'use strict';

    test.expect(1);

    var actual = grunt.file.read('tmp/autocompress.css');
    var expected = grunt.file.read('test/expected/autocompress.css');
    test.equal(expected, actual, 'output should be compressed when `compress` option not defined');

    test.done();
  },
  plugin: function(test) {
    'use strict';

    test.expect(1);

    var actual = grunt.file.read('tmp/plugin.css');
    var expected = grunt.file.read('test/expected/plugin/plugin.css');
    test.equal(expected, actual, 'variable defined via plugin should be accessible in stylesheet');

    test.done();
  },
  embedurl: function(test) {
    'use strict';

    test.expect(1);

    var actual = grunt.file.read('tmp/embedurl.css');
    var expected = grunt.file.read('test/expected/embedurl/embedurl.css');
    test.equal(expected, actual, '`embedurl` mixin should embed image as Data URI');

    test.done();
  }
};
