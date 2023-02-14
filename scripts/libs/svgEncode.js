"use strict";
function svgEncode(svg) {
  let data = svg.replace(/'/g, `"`);
  data = data.replace(/>\s{1,}</g, `><`);
  data = data.replace(/\s{2,}/g, ` `);
  return data
    .replace(/[\r\n%#()<>?[\\\]^`{|}]/g, encodeURIComponent)
    .replace(/"/g, "'");
}
module.exports.svgEncode = svgEncode;
