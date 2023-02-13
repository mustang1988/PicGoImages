"use strict";
const clean = (name, lower_case = false) => {
  const res = name ? name.replace(/\s+/g, "-") : "";
  return lower_case ? res.toLowerCase() : res;
};

module.exports.clean = clean;
