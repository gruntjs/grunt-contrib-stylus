var grunt = require('grunt');
var childProcess = require('child_process');

function execGrunt (target, cb) {
  'use strict';
  childProcess.exec('./node_modules/.bin/grunt --no-color '+target, cb);
}

exports.errors = {
  syntax: function(test) {
    'use strict';

    test.expect(1);

    execGrunt('stylus:errors', function(err, stdout, stderr) {
      test.notEqual(err.code, 0, 'should exit on syntax error with non-zero code by default');
      test.done();
    });
  },

  nofailonerror: function(test) {
    'use strict';

    test.expect(2);

    execGrunt('stylus:nofailonerror', function(err, stdout, stderr) {
      test.ok(/ParseError.*styl/.test(stdout), 'should log the stylus syntax error');
      test.equal(err, null, 'should exit without error');
      test.done();
    });
  }
};
