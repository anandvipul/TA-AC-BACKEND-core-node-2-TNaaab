let http = require('http');
let url = require('url');
let qs = require('querystring');

http.createServer((req, res) => {
    let dataType = req.headers['content-type'];
    let store = "";
    req.on('data', (chunk) => {
        store += chunk;
    });
    req.on('end', () => {
        if (dataType === "application/x-www-form-urlencoded") {
            let obj = qs.parse(store);
            // res.setHeader('content-type', 'object/json');
            console.log(obj);
            res.setHeader('content-type', 'text/html');
            res.end(`<h2>${obj.email}</h2>`);
        }
    });
}).listen(9000, () => {
    console.log("Server on and Running at http://localhost:9000");
})