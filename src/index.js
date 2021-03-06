"use strict";
import { Minimatch } from "minimatch";
import { dirname, basename } from "path";
import { join } from "path";

const renamer = (options) => {
  return (files, _, done) => {
    Object.keys(options).map((opt) => {
      const matcher = Minimatch(options[opt].pattern);

      Object.keys(files).map((file) => {
        if (!matcher.match(file)) {
          return;
        }

        const nameTransformer = options[opt].rename;
        let newFilename = dirname(file);

        // If file is at root of the `source` directory, strip the relative file path
        if (newFilename === ".") {
          newFilename = "";
        }

        if (typeof nameTransformer === "function") {
          newFilename = join(newFilename, nameTransformer(basename(file)));
        } else {
          newFilename = join(newFilename, nameTransformer);
        }

        if (newFilename !== file) {
          files[newFilename] = files[file];
          delete files[file];
        }
      });
    });

    done();
  };
};

export default renamer;
