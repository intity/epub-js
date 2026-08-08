const fs = require("fs");
const path = require("path");
const JSZip = require("jszip");
const { pathToFileURL } = require("url");
const setup = require("./setup.cjs");

setup.init(); // pre-init jsdom

(async () => {
  // save compact locations (data.json)
  const obj = require("./dist/server/epub.cjs");
  const time = Date.now();
  const ePub = obj.ePub;
  const absolutePath = path.resolve("./assets/alice/");
  const directoryUrl = pathToFileURL(absolutePath).href + "/";
  const book = ePub(directoryUrl);
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
