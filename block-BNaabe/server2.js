let http = require('http');
let url = require('url');


http.createServer((req, res) => {
    let dataType = req.headers['content-type'];
    let store = "";
    req.on('data', (chunk) => {
        store += chunk;
    });
    req.on('end', () => {
        if (dataType === "application/json") {
            console.log(JSON.parse(store));
            res.end(store);
        }
    });
}).listen(9000, () => {
    console.log("Server on and Running at http://localhost:9000");
})