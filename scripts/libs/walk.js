"use strict";
const fs = require("fs");
const path = require("path");

const walk = (dir, game = null, category = null, sub_category = null) => {
  if (game === null) {
    game = path.basename(dir);
  } else {
    if (category === null) {
      category = path.basename(dir);
    } else {
      if (sub_category === null) {
        sub_category = path.basename(dir);
      }
    }
  }
  const files = fs.readdirSync(dir).map((file) => path.join(dir, file));
  const results = [];
  for (const file of files) {
    if (fs.statSync(file).isDirectory()) {
      results.push(...walk(file, game, category, sub_category));
    } else {
      const val = {
        game,
        category, //: category ? category.replace(/\s/g, "") : category,
        sub_category, //: sub_category? sub_category.replace(/\s/g, ""): sub_category,
        file,
        name: path.basename(file).replace(path.extname(file), ""),
        content: fs.readFileSync(file).toString("base64"),
      };
      if (category) {
        results.push(val);
      }
    }
  }
  return results;
};

module.exports.walk = walk;
