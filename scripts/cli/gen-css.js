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

const [, , name="Cold Steel"] = process.argv;
const images = _.groupBy(walk(root(name)), "category");

const template = `:root {
    --Link-Icon-Margin-Left: 3px;
    --Link-Icon-Margin-Right: 3px;
    --Link-Icon-Size: 20px;
    --Link-Text-Weight: blod;
    [icons]
}

div[data-link-id] div.setting-item-description,
[data-link-id] {
    font-weight: var(--Link-Text-Weight);
    margin-right: var(--Link-Icon-Margin-Right);
}

div[data-link-id] div.setting-item-description::before,
.data-link-icon[data-link-id]::before {
    display: inline-block;
    content: ' ';
    margin-left: var(--Link-Icon-Margin-Left);
    margin-right: var(--Link-Icon-Margin-Right);
    vertical-align: middle;
    height: var(--Link-Icon-Size);
    width: var(--Link-Icon-Size);
    background-size: var(--Link-Icon-Size) var(--Link-Icon-Size);
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
console.log(
`
Generate Finished
  style sheet:
    ${output_file}
`
);