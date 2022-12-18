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
            let obj = JSON.parse(store);
            res.setHeader('content-type', 'object/json');
            res.end(JSON.stringify(obj));
        }
    });
}).listen(9000, () => {
    console.log("Server on and Running at http://localhost:9000");
})