let http = require('http');
let fs = require("fs");


http.createServer((req, res) => {
    res.setHeader("Content-Type", "text/html");
    fs.createReadStream("readme.txt").pipe(res);
    // fs.readFile('readme.txt', (err, content) => {
    //     res.end(content);
    // });

}).listen(5000, () => {console.log("Server is ready on http://localhost:5000")});