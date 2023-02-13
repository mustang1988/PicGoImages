"use strict";
const { clean } = require("../clean");

const display = (icon) => {
  const { game, name, category } = icon;
  const icon_name = `--${clean(game)}-${clean(category)}-${clean(name)}`;
  return `
.${clean(game, true)}-${clean(category, true)}-${clean(name, true)} {
  background-image: var(${icon_name});
}
`;
};

module.exports.display = display;
