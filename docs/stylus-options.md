# Options

## separator
Type: `String`
Default: linefeed

Concatenated files will be joined on this string.

## compress
Type: `Boolean`
Default: true

Specifies if we should compress the compiled css. Compression is always disabled when `--debug` flag is passed to grunt.

## paths
Type: `String` `Array`

Specifies directories to scan for @import directives when parsing.

## urlfunc
Type: `String`

Specifies function name that should be used for embedding images as Data URI.

## use
Type: `Array`

Allows passing of stylus plugins to be used during compile.
