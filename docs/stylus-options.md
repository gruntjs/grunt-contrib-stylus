# Options

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