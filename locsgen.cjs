const fs = require("fs");
const path = require("path");
const Book = require("./src/book").default;
const { pathToFileURL } = require("url");

(async () => {
  // save compact locations (data.json)
  const time = Date.now();
  //const Book = require("./src/book").default;
  const absolutePath = path.resolve("./assets/alice/");
  const directoryUrl = pathToFileURL(absolutePath).href + "/";
  const book = new Book(directoryUrl);
  await book.opened;
  await book.locations.generate(880); // chars/pages -- 880/66
  const data = book.locations.save(1);
  const outp = path.resolve(__dirname, "test/data.json");
  fs.writeFile(outp, data, "utf8", (err) => {
    if (err) {
      console.error("Error writeFile:", err);
      return;
    }
  });
  const t = (Date.now() - time).toString().padStart(3);
  console.log("output [time:%s ms, path:%s]", t, outp);
})();
