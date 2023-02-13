"use stric";
const fs = require("fs");
const path = require("path");

require("dotenv").config();
const _ = require("loadsh");

const { root } = require("../libs/root");
const { walk } = require("../libs/walk");
const { clean } = require("../libs/clean");
const { admonition } = require("../libs/admonition");

const [, , name] = process.argv;
const images = _.groupBy(walk(root(name)), "category");

let adm_content = {};
// =======================================================================
for (const cat of Object.keys(images)) {
  const icons = images[cat];
  for (const icon of icons) {
    const { name, data } = admonition(icon);
    if (data !== null) {
      adm_content[name] = data;
    }
  }
}
//
const output_file = path.join(
  __dirname,
  "..",
  "..",
  "output",
  `admonition.json`
);
fs.writeFileSync(output_file, JSON.stringify(adm_content, null, 4));
fs.writeFileSync(output_file.replace(".json", ".css"), `.callout-icon img {
  width: 24px;
  height: 24px;
  max-width: 24px;
  max-height: 24px;
}
`)