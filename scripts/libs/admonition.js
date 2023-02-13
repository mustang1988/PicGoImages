"use strict";
const { color } = require("./color");

const adm_white_list = [
  "Action",
  "AT Bonus",
  "Element",
  "Item",
  "Quartz",
  "State",
  "Weapon",
  "Quartz"
];

const admonition = (icon) => {
  const { name, content, category } = icon;
  if (adm_white_list.includes(category)) {
    const adm_name = `${category.replace(/\s+/g, "-").toLowerCase()}-${name
      .replace(/\s+/g, "-")
      .toLowerCase()}`;
    return {
      name: adm_name,
      data: {
        type: adm_name,
        color: color(icon),
        icon: {
          name: "data:image/svg+xml," + content,
          type: "image",
        },
        command: true,
        title: adm_name,
        injectColor: true,
        noTitle: true,
      },
    };
  }
  return { name: null, data: null };
};

module.exports.admonition = admonition;
