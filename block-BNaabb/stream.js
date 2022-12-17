let http = require("http");
let fs = require("fs");

http
  .createServer((req, res) => {
    let store = "";
    req.on("data", (chunk) => {
      store += chunk;
    });
    req.on("end", () => {
      res.setHeader("Content-Type", "text/html");
      res.write(store);
      res.end();
    });
  })
  .listen(3456, () => {
    console.log("Server Created on http://localhost:3456");
  });
