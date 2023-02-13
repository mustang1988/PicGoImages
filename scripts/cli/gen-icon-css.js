"use strict";
const fs = require("fs");
const path = require("path");

require("dotenv").config();
const _ = require("loadsh");

const { root, common } = require("../libs/root");
const { walk } = require("../libs/walk");
const { clean } = require("../libs/clean");

const [, , name] = process.argv;
const images = _.groupBy(walk(root(name)), "category");
// console.log(MasterQuartz);
const template = `:root {
    [icons]
}

[icon_in_link]

[icon_in_display]

`;
let icons_css = "";
let icon_in_link = "";
let icon_in_display = "";
// =======================================================================
for (const cat of Object.keys(images)) {
  const icons = images[cat];
  for (const icon of icons) {
    const { game, name, category, sub_category, content } = icon;
    const icon_name_in_css = `--${clean(game)}-${clean(category)}-${clean(
      name
    )}`;

    icons_css += `
${icon_name_in_css}: url("data:image/svg+xml,${content}")   
`;

    icon_in_link += `
div[data-link-id] div.setting-item-description::before,
.data-link-icon[data-link-id="${clean(name)}"]::before {
    background-image: var(${icon_name_in_css});
}
`;

    icon_in_display += `
.${clean(game, true)}-${clean(category, true)}-${clean(name, true)} {
  background-image: var(${icon_name_in_css});
}
`;
  }
}
//
const output_file = path.join(
  __dirname,
  "..",
  "..",
  "output",
  `${clean(name, true)}-icon.css`
);
fs.writeFileSync(
  output_file,
  template
    .replace("[icons]", icons_css)
    .replace("[icon_in_link]", icon_in_link)
    .replace("[icon_in_display]", icon_in_display)
);

const common_images = _.groupBy(walk(common()), "category");
icons_css = "";
icon_in_link = "";
icon_in_display = "";
for (const cat of Object.keys(common_images)) {
  const icons = common_images[cat];
  for (const icon of icons) {
    const { game, name, category, content } = icon;
    const icon_name_in_css = `--${clean(game)}-${clean(category)}-${clean(
      name
    )}`;

    icons_css += `
${icon_name_in_css}: url("data:image/svg+xml,${content}")   
`;

    icon_in_link += `
div[data-link-id] div.setting-item-description::before,
.data-link-icon[data-link-id="${clean(name)}"]::before {
    background-image: var(${icon_name_in_css});
}
`;

    icon_in_display += `
.${clean(game, true)}-${clean(category, true)}-${clean(name, true)} {
  background-image: var(${icon_name_in_css});
}
`;
  }
}

const common_output_file = path.join(
  __dirname,
  "..",
  "..",
  "output",
  `common.css`
);
fs.writeFileSync(
  common_output_file,
  template
    .replace("[icons]", icons_css)
    .replace("[icon_in_link]", icon_in_link)
    .replace("[icon_in_display]", icon_in_display)
);

/* 

for (const mq of MasterQuartz) {
  const { game, name } = mq;
  const icon_name_in_css = `--${game.replace(
    /\s+/g,
    "-"
  )}-Master-Quartz-${name.replace(/\s+/g, "-")}-Icon`;
  icons += `${icon_name_in_css}: url("data:image/svg+xml,${mq.content}")`;
  icon_in_link += `
div[data-link-id] div.setting-item-description::before,
.data-link-icon[data-link-id="${name.replace(/\s+/g, "-")}"]::before {
    background-image: var(${icon_name_in_css});
}
`;
  icon_in_display += `
.master-quartz-${name.replace(/\s+/g, "-").toLowerCase()} {
  background-image: var(${icon_name_in_css});
}
`;
}

 */
