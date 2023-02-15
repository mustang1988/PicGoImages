"use strict";
const { clean } = require("../clean");
const { prefix } = require("./prefix");
const { color, colorMap, hex } = require("../color");

const link = (icon) => {
  const { game, name, category } = icon;
  const icon_name = `--${clean(category)}-${clean(name)}`;
  const path_prefix = prefix(category);
  const data_path_selector = path_prefix
    ? `[data-link-path^="${path_prefix}"]`
    : "";
  let link_css = `
div[data-link-id] div.setting-item-description::before,
.data-link-icon[data-link-id="${clean(name)}"]${data_path_selector}::before {
    background-image: var(${icon_name});
}`;

/*   const link_text_color = color(icon);
  if (link_text_color !== colorMap.Default) {
    link_css += `
div[data-link-id] div.setting-item-description,
[data-link-id="${clean(name)}"]${data_path_selector} {
    color: ${hex(link_text_color)} !important;
}
`;
  } */

  return link_css;
};

module.exports.link = link;
