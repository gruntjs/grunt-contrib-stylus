# grunt-contrib-stylus
> Compile Stylus files to CSS (part of the [grunt-contrib](https://github.com/gruntjs/grunt-contrib) collection). Submitted by [Eric Woroshow](https://github.com/errcw).

## Getting Started
Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: `npm install grunt-contrib-stylus`

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-contrib-stylus');
```

[grunt]: https://github.com/cowboy/grunt
[getting_started]: https://github.com/cowboy/grunt/blob/master/docs/getting_started.md

### Overview

Inside your `grunt.js` file add a section named `stylus`. This section specifies the files to compile and the options passed to [stylus](http://learnboost.github.com/stylus/).

This task comes preloaded with [nib](http://visionmedia.github.com/nib/).

#### Parameters

##### files ```object```

This defines what files this task will process and should contain key:value pairs.

The key (destination) should be an unique filepath (supports [grunt.template](https://github.com/cowboy/grunt/blob/master/docs/api_template.md)) and the value (source) should be a filepath or an array of filepaths (supports [minimatch](https://github.com/isaacs/minimatch)).

Note: When the value contains an array of multiple filepaths, the contents are concatenated in the order passed.

##### options ```object```

This controls how this task (and its helpers) operate and should contain key:value pairs, see options below.

#### Options

##### compress ```boolean```

This specifies if we should compress the compiled css.

##### paths ```string|array```

This specifies directories to scan for @import directives when parsing.

#### Config Example

``` javascript
stylus: {
  compile: {
    options: {
      compress: true,
      paths: ['path/to/import', 'another/to/import']
    },
    files: {
      'path/to/result.css': 'path/to/source.styl',
      'path/to/another.css': ['path/to/sources/*.styl', 'path/to/more/*.style'],
    }
  }
}
```

## Release History

* 2012/09/17 - v0.2.2 - tests refactored. better watch integration.
* 2012/08/10 - v0.2.0 - Refactored from grunt-contrib into individual repo.