let http = require('http')
let url = require("url");

http.createServer((req, res) => {
    let parsedUrl = url.parse(req.url);
    let store = "";
    if (req.method === "POST" && parsedUrl.pathname === "/") {
        req.on("data", (chunk) => {
            store += chunk;
        });
        req.on("end", () => {
            res.statusCode = 201;
            res.end(store);
        })
    }
}).listen(4000, () => {
    console.log("The Server is on and Running on http://localhost:4000");
});