# metalsmith-renamer

![Test](https://github.com/alex-ketch/metalsmith-renamer/workflows/Test/badge.svg)
![Release](https://github.com/alex-ketch/metalsmith-renamer/workflows/Release/badge.svg)

This is a plugin for [Metalsmith](http://www.metalsmith.io) which renames files matching a given `pattern`.

## ❄️ Project Status

This project is on somewhat of an auto-pilot which means:

- As I don't use Metalsmith any more, I'm not familiar enough with it to provide support with issues.
- I will accept fixes and feature PRs only if:
  - they come with tests and relevant documentation.
  - releases will happen automatically once merged, so you must use [Semantic Release style commit
    messages](https://semantic-release.gitbook.io/semantic-release/#commit-message-format).

Thanks for your understanding!

---

##  Usage

If using the CLI for Metalsmith, metalsmith-renamer can be used like any other plugin by including it in
`metalsmith.json`. For example:

For Metalscript's JavaScript API, metalsmith-renamer can be used like any other plugin, by attaching it to the function
invocation chain on the Metalscript object.  For example:

```js
import Metalsmith from "metalsmith";
import renamer from "metalsmith-renamer";

Metalsmith(__dirname)
  .use(
    renamer({
      "Markdown Files": { // this name is only used to help organize different settings
        pattern: "folder/**/*.md",
        rename: function (name) {
          return "renamed" + name;
        },
      },
      "HTML Pages": {
        pattern: "folder/about.html",
        rename: "index.html",
      }, // and as many more patterns as you want
    })
  )
  .build();
```

## Options

`metalsmith-renamer` has two options, both of which must be defined:

- `pattern`: option which uses [minimatch](https://github.com/isaacs/minimatch) to find files to rename.
- `rename`: which takes a `string` argument for what you'd like the files to be named, or a `function` that takes a
  matched file name and returns the new one to be used.

## Use cases
- I use it to simulate [metalsmith-permalinks](https://github.com/segmentio/metalsmith-permalinks) partially by renaming
  certain files `index.html`, allowing me to link straight to directories and not have to use the filename.
  metalsmith-permalink insists on enclosing files within a structured folder system, whereas I have folder already
  organized manually.

