# grunt-contrib-stylus [![Build Status](https://secure.travis-ci.org/gruntjs/grunt-contrib-stylus.png?branch=master)](http://travis-ci.org/gruntjs/grunt-contrib-stylus)

> Compile Stylus files to CSS.

_Note that this plugin has not yet been released, and only works with the latest bleeding-edge, in-development version of grunt. See the [When will I be able to use in-development feature 'X'?](https://github.com/gruntjs/grunt/blob/devel/docs/faq.md#when-will-i-be-able-to-use-in-development-feature-x) FAQ entry for more information._

## Getting Started
_If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide._

From the same directory as your project's [Gruntfile][Getting Started] and [package.json][], install this plugin with the following command:

```bash
npm install grunt-contrib-stylus --save-dev
```

Once that's done, add this line to your project's Gruntfile:

```js
grunt.loadNpmTasks('grunt-contrib-stylus');
```

If the plugin has been installed correctly, running `grunt --help` at the command line should list the newly-installed plugin's task or tasks. In addition, the plugin should be listed in package.json as a `devDependency`, which ensures that it will be installed whenever the `npm install` command is run.

[grunt]: http://gruntjs.com/
[Getting Started]: https://github.com/gruntjs/grunt/blob/devel/docs/getting_started.md
[package.json]: https://npmjs.org/doc/json.html


## The stylus task

### Overview

In your project's Gruntfile, add a section named `stylus` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  stylus: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

This task comes preloaded with [nib](http://visionmedia.github.com/nib/).
### Options

## files
Type: `object`

Defines what files this task will process and should contain key:value pairs.

The key (destination) should be an unique filepath (supports [grunt.template](https://github.com/gruntjs/grunt/blob/master/docs/api_template.md)) and the value (source) should be a filepath or an array of filepaths (supports [minimatch](https://github.com/isaacs/minimatch)).

You can use *.{ext} as your destination filename to individually compile each file to the destination directory. Otherwise, when the source contains an array of multiple filepaths, the contents are concatenated in the order passed.  **This API will be changing**

## options.basePath
Type: `String` (individual only)

Adjusts the folder structure when compiled to the destination directory. When not explicitly set, best effort is made to locate the basePath by comparing all source filepaths left to right for a common pattern.

## options.compress
Type: `Boolean`
Default: false

Specifies if we should compress the compiled css.

## options.flatten
Type: `Boolean` (individual only)

Performs a flat compile that dumps all the files into the root of the destination directory, overwriting files if they exist.

## options.paths
Type: `String|Array`

Specifies directories to scan for @import directives when parsing.
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
  }
}
```

## Release History

 * 2012-10-11 - v0.3.1 - Rename grunt-contrib-lib dep to grunt-lib-contrib.
 * 2012-09-23 - v0.3.0 - Options no longer accepted from global config key. Individually compile into dest, maintaining folder structure.
 * 2012-09-16 - v0.2.2 - Tests refactored, better watch integration.
 * 2012-09-09 - v0.2.0 - Refactored from grunt-contrib into individual repo.

--
Task submitted by <a href="http://ericw.ca">Eric Woroshow</a>.

*Generated on Thu Oct 18 2012 19:01:17.*
