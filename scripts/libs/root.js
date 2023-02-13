"use strict";
const { join } = require("path");
const { existsSync } = require("fs");
require("dotenv").config();

const { game_titles } = require("../config/config.json");

const root = (title) => {
  if (game_titles.includes(title)) {
    const root = join(process.env.ROOT, "Game", "Legend of Heroes", title);
    if (existsSync(root)) {
      return root;
    }
    throw new Error(`Dir Not Found: ${title}`);
  }
  throw new Error(`Invalid Name: ${title}`);
};

const common = () => {
  const root = join(process.env.ROOT, "Game", "Legend of Heroes", "Common");
  if (existsSync(root)) {
    return root;
  }
};

module.exports.root = root;
module.exports.common = common;
