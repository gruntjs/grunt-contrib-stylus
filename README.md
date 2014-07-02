# grunt-contrib-stylus v0.18.0 [![Build Status: Linux](https://travis-ci.org/gruntjs/grunt-contrib-stylus.png?branch=master)](https://travis-ci.org/gruntjs/grunt-contrib-stylus) <a href="https://ci.appveyor.com/project/gruntjs/grunt-contrib-stylus"><img src="https://ci.appveyor.com/api/projects/status/3f708w3tww2lem3o/branch/master" alt="Build Status: Windows" height="18" /></a>

> Compile Stylus files to CSS.



## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-contrib-stylus --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-contrib-stylus');
```

*This plugin was designed to work with Grunt 0.4.x. If you're still using grunt v0.3.x it's strongly recommended that [you upgrade](http://gruntjs.com/upgrading-from-0.3-to-0.4), but in case you can't please use [v0.3.1](https://github.com/gruntjs/grunt-contrib-stylus/tree/grunt-0.3-stable).*



## Stylus task
_Run this task with the `grunt stylus` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

This task comes preloaded with [nib](http://visionmedia.github.com/nib/).
### Options

#### compress
Type: `Boolean`  
Default: `true`

Specifies if we should compress the compiled css. Compression is always disabled when `--debug` flag is passed to grunt.

#### linenos
Type: `Boolean`  
Default: `false`

Specifies if the generated CSS file should contain comments indicating the corresponding stylus line.

#### firebug
Type: `Boolean`  
Default: `false`

Specifies if the generated CSS file should contain debug info that can be used by the FireStylus Firebug plugin

#### paths
Type: `Array`

Specifies directories to scan for @import directives when parsing.

#### define
Type: `Object`

Allows you to define global variables in Gruntfile that will be accessible in Stylus files.

#### rawDefine
Type: `Boolean|Array|String`

If set to "true", defines global variables in Gruntfile without casting objects to Stylus lists. Allows using a JavaScript object in Gruntfile to be accessible as a Stylus Hash. See Stylus's issue tracker for details. [LearnBoost/stylus#1286](https://github.com/LearnBoost/stylus/issues/1286)

Allows passing an array or string to specify individual keys to define "raw", casting all other keys as default Stylus behavior.

#### urlfunc
Type: `String|Object`

If `String`: specifies function name that should be used for embedding images as Data URI.

If `Object`:
* `name` - Type: `String`. Function name that should be used for embedding images as Data URI.
* [ `limit` ] - Type: `Number|Boolean` Default: `30000`. Bytesize limit defaulting to 30Kb (30000), use false to disable the limit.
* [ `[paths` ] - Type: `Array`, Default: `[]`. Image resolution path(s).

See [url()](http://learnboost.github.io/stylus/docs/functions.url.html) for details.


#### [use](https://github.com/LearnBoost/stylus/blob/master/docs/js.md#usefn)
Type: `Array`

Allows passing of stylus plugins to be used during compile.

#### [import](https://github.com/LearnBoost/stylus/blob/master/docs/js.md#importpath)
Type: `Array`

Import given stylus packages into every compiled `.styl` file, as if you wrote `@import '...'`
in every single one of said files.

#### include css
Type: `Boolean`  
Default: `false`

When including a css file in your app.styl by using @import "style.css", by default it will not include the full script, use `true` to compile into one script.
( **NOTICE:** the object key contains a space `"include css"` )

#### [resolve url](http://learnboost.github.io/stylus/docs/executable.html#resolving-relative-urls-inside-imports)
Type: `Boolean`  
Default: `false`

Telling Stylus to generate `url("bar/baz.png")` in the compiled CSS files accordingly from `@import "bar/bar.styl"` and `url("baz.png")`, which makes relative pathes work in Stylus.
( **NOTICE:** the object key contains a space `"resolve url"` and Stylus resolves the url only if it finds the provided file )

#### banner
Type: `String`  
Default: `''`

This string will be prepended to the beginning of the compiled output.

### Examples

```js
stylus: {
  compile: {
    options: {
      paths: ['path/to/import', 'another/to/import'],
      urlfunc: 'embedurl', // use embedurl('test.png') in our code to trigger Data URI embedding
      use: [
        require('fluidity') // use stylus plugin at compile time
      ],
      import: [      //  @import 'foo', 'bar/moo', etc. into every .styl file
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

 * 2014-07-02   v0.18.0   Bump stylus to 0.47.
 * 2014-06-04   v0.17.0   Bump stylus to 0.46.
 * 2014-05-12   v0.16.0   Bump stylus to 0.45.
 * 2014-05-01   v0.15.1   Add support for rawDefine.
 * 2014-04-23   v0.15.0   Bump stylus to 0.44
 * 2014-04-08   v0.14.0   Bump stylus to 0.43
 * 2014-03-01   v0.13.2   Fix limit option for urlfunc. Update copyright to 2014
 * 2014-02-27   v0.13.1   grunt.template.process is not needed
 * 2014-02-22   v0.13.0   Adds Data URI Image Inlining options. Fix "resolve url" option. Use chalk module to colorize terminal output. Emphasize spaces in object keys in the README.
 * 2014-01-08   v0.12.0   Update to stylus 0.42.0
 * 2013-12-02   v0.11.0   Update to stylus 0.41.0
 * 2013-11-07   v0.10.0   Update to stylus 0.40.0 and nib 1.0.1
 * 2013-10-20   v0.9.0   Update to stylus 0.38.0
 * 2013-08-20   v0.8.0   Update to stylus 0.37.0 and nib to 1.0.0
 * 2013-07-31   v0.7.0   Update to stylus 0.35
 * 2013-07-11   v0.6.0   Update to stylus 0.33
 * 2013-03-10   v0.5.0   Upgrade to stylus 0.32.1
 * 2013-02-22   v0.4.1   Support stylus `define` option.
 * 2013-02-15   v0.4.0   First official release for Grunt 0.4.0.
 * 2013-01-23   v0.4.0rc7   Updating grunt/gruntplugin dependencies to rc7. Changing in-development grunt/gruntplugin dependency versions from tilde version ranges to specific versions.
 * 2013-01-09   v0.4.0rc5   Updating to work with grunt v0.4.0rc5. Switching to this.file api.
 * 2012-12-15   v0.4.0a   Conversion to grunt v0.4 conventions. Remove node v0.6 and grunt v0.3 support. Merge grunt-stylus features (plugin loading, embedding). Remove experimental destination wildcards.
 * 2012-10-12   v0.3.1   Rename grunt-contrib-lib dep to grunt-lib-contrib.
 * 2012-09-24   v0.3.0   Options no longer accepted from global config key. Individually compile into dest, maintaining folder structure.
 * 2012-09-17   v0.2.2   Tests refactored, better watch integration.
 * 2012-09-10   v0.2.0   Refactored from grunt-contrib into individual repo.

---

Task submitted by [Eric Woroshow](http://ericw.ca)

*This file was generated on Wed Jul 02 2014 14:38:29.*
