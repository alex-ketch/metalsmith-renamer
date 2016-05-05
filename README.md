# metalsmith-renamer

This is a plugin for [Metalsmith](http://www.metalsmith.io) that renames files matching a given `pattern`.
Presently it only accepts files, not folders, but folder renaming is planned for the near future.

##  Usage

If using the CLI for Metalsmith, metalsmith-renamer can be used like any other plugin by including it in `metalsmith.json`. For example:

For Metalscript's JavaScript API, metalsmith-renamer can be used like any other plugin, by attaching it to the function invocation chain on the Metalscript object.  For example:

```js
var renamer = require('metalsmith-renamer');
require('metalsmith')(__dirname)
  .use(renamer({
    filesToRename: {
      pattern: 'folder/**/*.md',
      rename: function(name) {
        return 'renamed' + name;
      }
    },
    moreFiles: {
      pattern: 'folder/about.html',
      rename: 'index.html'
    }, //and as many more patterns as you want
  }
})
.build();
```

## Options

metalsmith-renamer has two options, both of which must be defined:
- `pattern` option which uses [minimatch](https://github.com/isaacs/minimatch) to filter files.
- `rename` which takes a string argument for what you'd like the files to be named, or a function that takes a matched file name and returns the new one to be used.

## Use cases
- I use it to simulate [metalsmith-permalinks](https://github.com/segmentio/metalsmith-permalinks) partially by renaming certain files `index.html`, allowing me to link straight to directories and not have to use the filename. metalsmith-permalink insists on enclosing files within a structured folder system, whereas I have folder already organized manually.
<!-- - Use it to rename folder names for preprocessor stylesheets, allowing you to keep a Stylus/SCSS/Less folder in your `src` folder, and then rename it to `css` in production build. -->



## Roadmap
- [x] v0.1 Core renaming functionality
- [x] v0.2 Allow specifying multiple inputs, avoiding the need to call the plugin multiple times.
- [ ] v0.3 Allow renaming of directories.
- [ ] v0.4 Clean up declaration method to take named objects, or a single unnamed one.
