const { isAbsolute } = require('path');
let path = require('path');

let relativePath = path.relative(".", "../client/index.js");
console.log(relativePath);
let absolutePath = path.join(__dirname, "../client/index.js");
console.log(absolutePath);