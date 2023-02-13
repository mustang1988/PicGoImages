"use strict";
const { clean } = require("../clean");

const root = (icon) => {
  const { game, name, category, content } = icon;
  const icon_name = `--${game === "Common" ? "" : clean(game) + "-"}${clean(
    category
  )}-${clean(name)}`;
  return `${icon_name}: url("data:image/svg+xml,${content}")
`;
};

module.exports.rootCss = root;
