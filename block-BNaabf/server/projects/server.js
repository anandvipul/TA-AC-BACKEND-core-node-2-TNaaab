let http = require("http");
let url = require("url");
let fs = require("fs");

http
  .createServer((req, res) => {
    let parsedUrl = url.parse(req.url);
    console.log(parsedUrl);
    if (parsedUrl.pathname === "/") {
      res.end("Hello And Welcome");
    } else if (parsedUrl.pathname === "/form" && req.method === "GET") {
      res.setHeader("content-type", "text/html");
      fs.createReadStream("./form.html").pipe(res);
    } else if (parsedUrl.pathname === "/form" && req.method === "POST") {
      let store = "";
      req.on("data", (chunk) => {
        store += chunk;
      });
      req.on("end", () => {
        res.setHeader("content-type", "text/html");
        res.end(store);
      });
    }
  })
  .listen(5678, () => {
    console.log("The Server is UP and Running http://localhost:5678");
  });
