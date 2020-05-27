"use strict";
import { Minimatch } from "minimatch";
import { dirname, basename } from "path";

export default function plugin(options) {
  return function (files, _, done) {
    Object.keys(options).forEach(function (opt) {
      var matcher = Minimatch(options[opt].pattern);

      Object.keys(files).forEach(function (file) {
        if (!matcher.match(file)) {
          return;
        }

        var rename = options[opt].rename;
        var renamedEntry = dirname(file);

        // If file is at root of the `source` directory, strip the relative file path
        if (renamedEntry === ".") {
          renamedEntry = "";
        }

        if (typeof rename === "function") {
          renamedEntry += rename(basename(file));
        } else {
          renamedEntry += rename;
        }

        if (renamedEntry !== file) {
          files[renamedEntry] = files[file];
          delete files[file];
        }
      });
    });

    done();
  };
}
