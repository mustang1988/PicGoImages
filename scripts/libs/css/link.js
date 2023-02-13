"use strict";
const { clean } = require("../clean");

const link = (icon) => {
  const { game, name, category } = icon;
  const icon_name = `--${clean(game)}-${clean(category)}-${clean(name)}`;
  return `
div[data-link-id] div.setting-item-description::before,
.data-link-icon[data-link-id="${clean(name)}"]::before {
    background-image: var(${icon_name});
}`;
};

module.exports.link = link;
