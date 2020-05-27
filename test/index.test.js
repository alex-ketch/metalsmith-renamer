import { renamer } from "../src";
import Metalsmith from "metalsmith";

const test = (opts = {}) =>
  new Promise((resolve, reject) => {
    return Metalsmith(__dirname)
      .source("__fixtures__")
      .use(renamer(opts))
      .process((err, files) => {
        if (err !== null) {
          reject(err);
        }
        resolve(files);
      });
  });

describe("metalsmith-renamer", () => {
  it("does note rename un-matched files", async () => {
    const files = await test({
      "Markdown Files": {
        pattern: "*.md",
        rename: "home.html",
      },
    });

    expect(files).toHaveProperty(["page.html"]);
  });

  it("renames matched files using a string", async () => {
    const files = await test({
      "Markdown Files": {
        pattern: "*.md",
        rename: "home.html",
      },
    });

    expect(files).toHaveProperty(["home.html"]);
  });

  it("only keeps one file when matching multiple files", async () => {
    const files = await test({
      "Markdown Files": {
        pattern: "*.md",
        rename: "home.html",
      },
    });

    expect(Object.keys(files)).toHaveLength(2);
  });

  it("renames matched files using a function", async () => {
    const files = await test({
      "Markdown Files": {
        pattern: "*.md",
        rename: (file) => `/new/directory/${file}`,
      },
    });

    expect(files).toHaveProperty(["/new/directory/index.md"]);
  });

  it("does not remove file if renamed output is same as input filename", async () => {
    // https://github.com/alex-ketch/metalsmith-renamer/issues/4
    const files = await test({
      "Markdown Files": {
        pattern: "*.md",
        rename: "index.md",
      },
    });

    expect(files).toHaveProperty(["index.md"]);
  });

  it("accepts multiple configuration options", async () => {
    const files = await test({
      "Markdown Files": {
        pattern: "*.md",
        rename: "index.md",
      },
      "HTML files": {
        pattern: "*.html",
        rename: "pageRenamed.html",
      },
    });

    expect(files).toHaveProperty(["index.md"]);
    expect(files).toHaveProperty(["pageRenamed.html"]);
  });
});
