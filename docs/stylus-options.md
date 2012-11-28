# Options

## basePath
Type: `String` (individual only)

Adjusts the folder structure when compiled to the destination directory. When not explicitly set, best effort is made to locate the basePath by comparing all source filepaths left to right for a common pattern. You can use *.{ext} as your destination filename to individually compile each file to the destination directory. Otherwise, when the source contains an array of multiple filepaths, the contents are concatenated in the order passed.  **This API will be changing**

## compress
Type: `Boolean`
Default: false

Specifies if we should compress the compiled css.

## flatten
Type: `Boolean` (individual only)

Performs a flat compile that dumps all the files into the root of the destination directory, overwriting files if they exist.

## paths
Type: `String` `Array`

Specifies directories to scan for @import directives when parsing.
