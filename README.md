# grunt-contrib-stylus [![Build Status](https://secure.travis-ci.org/gruntjs/grunt-contrib-stylus.png?branch=master)](http://travis-ci.org/gruntjs/grunt-contrib-stylus)

> Compile Stylus files to CSS.


## Getting Started
If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide, as it explains how to create a [gruntfile][Getting Started] as well as install and use grunt plugins. Once you're familiar with that process, install this plugin with this command:

```shell
npm install grunt-contrib-stylus --save-dev
```

[grunt]: http://gruntjs.com/
[Getting Started]: https://github.com/gruntjs/grunt/blob/devel/docs/getting_started.md


## Stylus task
_Run this task with the `grunt stylus` command._

_This task is a [multi task][] so any targets, files and options should be specified according to the [multi task][] documentation._
[multi task]: https://github.com/gruntjs/grunt/wiki/Configuring-tasks


This task comes preloaded with [nib](http://visionmedia.github.com/nib/).

### Options

#### basePath
Type: `String` (individual only)

Adjusts the folder structure when compiled to the destination directory. When not explicitly set, best effort is made to locate the basePath by comparing all source filepaths left to right for a common pattern. You can use *.{ext} as your destination filename to individually compile each file to the destination directory. Otherwise, when the source contains an array of multiple filepaths, the contents are concatenated in the order passed.  **This API will be changing**

#### compress
Type: `Boolean`
Default: false

Specifies if we should compress the compiled css.

#### flatten
Type: `Boolean` (individual only)

Performs a flat compile that dumps all the files into the root of the destination directory, overwriting files if they exist.

#### paths
Type: `String` `Array`

Specifies directories to scan for @import directives when parsing.

#### use
Type: `Array`

List of Stylus plugins.

### Examples

```js
stylus: {
  compile: {
    options: {
      compress: true,
      paths: ['path/to/import', 'another/to/import']
    },
    files: {
      'path/to/result.css': 'path/to/source.styl', // 1:1 compile
      'path/to/another.css': ['path/to/sources/*.styl', 'path/to/more/*.style'], // compile and concat into single file
      'path/to/*.css': ['path/to/sources/*.styl', 'path/to/more/*.styl'] // compile individually into dest, maintaining folder structure
    }
  },
  flatten: {
    options: {
      flatten: true,
      paths: ['path/to/import', 'another/to/import']
    },
    files: {
      'path/to/*.css': ['path/to/sources/*.styl', 'path/to/more/*.styl'] // compile individually into dest, flattening folder structure
    }
  },
  plugin: {
    options: {
      use: [
        require('fluidity')
      ]
    },
    files: {
      'tmp/plugin.css': 'test/fixtures/plugin/plugin.styl'
    }
  }
  
}
```

## Release History

 * 2012-10-12   v0.3.1   Rename grunt-contrib-lib dep to grunt-lib-contrib.
 * 2012-09-24   v0.3.0   Options no longer accepted from global config key. Individually compile into dest, maintaining folder structure.
 * 2012-09-17   v0.2.2   Tests refactored, better watch integration.
 * 2012-09-10   v0.2.0   Refactored from grunt-contrib into individual repo.

---

Task submitted by [Eric Woroshow](http://ericw.ca)

*This file was generated on Thu Dec 06 2012 10:37:03.*
