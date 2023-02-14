"use strict";
const color_map = {
  Earth: "220, 125, 34",
  Water: "15, 157, 223",
  Fire: "235, 67, 49",
  Wind: "79, 194, 89",
  Time: "118, 103, 138",
  Space: "230, 204, 55",
  Mirage: "177, 193, 197",
  Sun: "224, 138, 233",
  Moon: "224, 138, 233",
  Star: "224, 138, 233",
  Dragon: "224, 138, 233",
  Holy: "224, 138, 233",
  Platinum: "177, 193, 197",
  Gold: "230, 204, 55",
  Silver: "169, 169, 169",
  Bronze: "220, 125, 34",
  Default: "125, 125, 125",
};

const color = (icon) => {
  const { category, game, name } = icon;
  if (game === "Common") {
    switch (category) {
      case "Trophy":
        return color_map90[name];
      case "Element":
        return color_map[name];
      case "Quartz":
        const type = name.substring(0, name.indexOf(" "));
        return color_map[type] ? color_map[type] : color_map.Default;
      default:
        return color_map.Default;
    }
  }
  return color_map.Default;
};

const hex = (color) => {
  const [r, g, b] = color.split(",").map((c) => c.trim().toString(16));
  return `#${r}${g}${b}`;
};

module.exports.color = color;
module.exports.colorMap = color_map;
module.exports.hex = hex;
