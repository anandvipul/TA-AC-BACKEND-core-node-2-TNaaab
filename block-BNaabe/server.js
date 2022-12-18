let http = require('http')
let url = require("url");
let qs = require('querystring');

http.createServer((req, res) => {
    let parsedUrl = url.parse(req.url);
    let store = "";
    if (req.method === "POST" && parsedUrl.pathname === "/") {
        req.on("data", (chunk) => {
            store += chunk;
        });
        req.on("end", () => {
            res.statusCode = 201;
            
            res.end(qs.parse(store)["captain"]);
        })
    }
}).listen(4000, () => {
    console.log("The Server is on and Running on http://localhost:4000");
});