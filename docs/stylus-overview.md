# Overview

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