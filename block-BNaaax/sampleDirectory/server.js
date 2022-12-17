const { Server } = require('http');
let path = require('path');

console.log("Directory Name",__dirname);
console.log("FileName", __filename);

console.log(path.join(__dirname, "server.js"));