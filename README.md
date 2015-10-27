# metalsmith-rename

This is a plugin for [Metalsmith][http://www.metalsmith.io] that renames files matching a given `pattern`

##  Usage

If using the CLI for Metalsmith, metalsmith-rename can be used like any other plugin by including it in `metalsmith.json`.  For example:

```json
{
  "plugins": {
    "metalsmith-rename": {
      "pattern": "folder/*.md",
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
    }
  })
  .build();
```

## Options

metalsmith-rename only requires a `pattern` option.
