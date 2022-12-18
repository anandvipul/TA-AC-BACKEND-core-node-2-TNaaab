let path = require("path");
let fs = require("fs");

// console.log("File Name",__filename);
// console.log("App.js Path Name :-",path.join(__dirname, "/app.js"));
console.log(path.relative(".","index.html"));
fs.readFile("index.html", (err, content) => {
    // console.log(content.toString());
})

console.log(path.join(__dirname, "index.html"));