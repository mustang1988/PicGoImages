"use strict";
const fs = require("fs");
const path = require("path");

require("dotenv").config();
const _ = require("loadsh");

const { root } = require("../libs/root");
const { walk } = require("../libs/walk");
const { clean } = require("../libs/clean");
const { rootCss } = require("../libs/css/root");
const { link } = require("../libs/css/link");
const { display } = require("../libs/css/display");

const [, , name] = process.argv;
const images = _.groupBy(walk(root(name)), "category");

const template = `:root {
    [icons]
}
[icon_in_link]
[icon_in_display]`;
let icons_css = "";
let icon_in_link = "";
let icon_in_display = "";
// =======================================================================
for (const cat of Object.keys(images)) {
  const icons = images[cat];
  for (const icon of icons) {
    icons_css += rootCss(icon);

    icon_in_link += link(icon);

    icon_in_display += display(icon);
  }
}
//
const output_file = path.join(
  __dirname,
  "..",
  "..",
  "output",
  `${clean(name, true)}.css`
);
fs.writeFileSync(
  output_file,
  template
    .replace("[icons]", icons_css)
    .replace("[icon_in_link]", icon_in_link)
    .replace("[icon_in_display]", icon_in_display)
);
