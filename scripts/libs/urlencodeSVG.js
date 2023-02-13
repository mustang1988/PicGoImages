"use strict";
function urlencodeSVG(svg) {
  let data = svg.replace(/'/g, `"`);
  data = data.replace(/>\s{1,}</g, `><`);
  data = data.replace(/\s{2,}/g, ` `);
  return data.replace(/[\r\n%#()<>?[\\\]^`{|}]/g, encodeURIComponent);
}
module.exports.urlencodeSVG = urlencodeSVG;
