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

_Version `0.4.x` of this plugin is compatible with Grunt `0.4.x`. Version `0.3.x` of this plugin is compatible with Grunt `0.3.x`._

### Options

#### compress
Type: `Boolean`
Default: true

Specifies if we should compress the compiled css. Compression is always disabled when `--debug` flag is passed to grunt.

#### paths
Type: `String` `Array`

Specifies directories to scan for @import directives when parsing.

#### urlfunc
Type: `String`

Specifies function name that should be used for embedding images as Data URI.

#### use
Type: `Array`

Allows passing of stylus plugins to be used during compile.

Learn more about `use`: https://github.com/LearnBoost/stylus/blob/master/docs/js.md#usefn

#### import
Type: `Array`

Import given stylus packages into every compiled `.styl` file, as if you wrote `@import '...'`
in every single one of said files.

Learn more about `import`: https://github.com/LearnBoost/stylus/blob/master/docs/js.md#importpath

### Examples

```js
stylus: {
  compile: {
    options: {
      paths: ['path/to/import', 'another/to/import'],
      urlfunc: 'embedurl', // use embedurl('test.png') in our code to trigger Data URI embedding
      use: [
        require('fluidity') // use stylus plugin at compile time
      ]
      import: [    //  @import 'foo', 'bar/moo', etc. into every .styl file
      'foo',       //  that is compiled. These might be findable based on values you gave
      'bar/moo'    //  to `paths`, or a plugin you added under `use`
      ]
    },
    files: {
      'path/to/result.css': 'path/to/source.styl', // 1:1 compile
      'path/to/another.css': ['path/to/sources/*.styl', 'path/to/more/*.styl'] // compile and concat into single file
    }
  }
}
```


## Release History

 * 2013-01-22   v0.4.0rc7   Updating grunt/gruntplugin dependencies to rc7. Changing in-development grunt/gruntplugin dependency versions from tilde version ranges to specific versions.
 * 2013-01-08   v0.4.0rc5   Updating to work with grunt v0.4.0rc5. Switching to this.file api.
 * 2012-12-14   v0.4.0a   Conversion to grunt v0.4 conventions. Remove node v0.6 and grunt v0.3 support. Merge grunt-stylus features (plugin loading, embedding). Remove experimental destination wildcards.
 * 2012-10-11   v0.3.1   Rename grunt-contrib-lib dep to grunt-lib-contrib.
 * 2012-09-23   v0.3.0   Options no longer accepted from global config key. Individually compile into dest, maintaining folder structure.
 * 2012-09-16   v0.2.2   Tests refactored, better watch integration.
 * 2012-09-09   v0.2.0   Refactored from grunt-contrib into individual repo.

---

Task submitted by [Eric Woroshow](http://ericw.ca)

*This file was generated on Thu Jan 24 2013 20:02:48.*
