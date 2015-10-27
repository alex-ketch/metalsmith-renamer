# metalsmith-rename

This is a plugin for [Metalsmith](http://www.metalsmith.io) that renames files matching a given `pattern`

##  Usage

If using the CLI for Metalsmith, metalsmith-rename can be used like any other plugin by including it in `metalsmith.json`.  For example:

```json
{
  "plugins": {
    "metalsmith-rename": {
      "pattern": "folder/*.md",
      "rename": "folder/newName.md"
    }
  }
}
```

For Metalscript's JavaScript API, metalsmith-rename can be used like any other plugin, by attaching it to the function invocation chain on the Metalscript object.  For example:

```js
var rename = require('metalsmith-rename');
require('metalsmith')(__dirname)
  .use(copy({
    pattern: 'folder/*.md',
    rename: 'folder/newName.md'
    }
  })
  .build();
```

## Options

metalsmith-rename has two options, both of which must be defined:
- `pattern` option which uses [minimatch](https://github.com/isaacs/minimatch) to filter files.
- `rename` which takes a string argument for what you'd like the files to be named.

## Use cases
- I use it to simulate [metalsmith-permalinks](https://github.com/segmentio/metalsmith-permalinks) partially by renaming certain files `index.html`, allowing me to link straight to directories and not have to use the filename. metalsmith-permalink insists on enclosing files within a structured folder system, whereas I have folder already organized manually.
- Use it to rename folder names for preprocessor stylesheets, allowing you to keep a Stylus/SCSS/Less folder in your `src` folder, and then rename it to `css` in production build.



## Roadmap
- v0.1 ~~Core renaming functionality~~
- v0.2: Allow specifying multiple inputs, avoiding the need to call the plugin multiple times.
