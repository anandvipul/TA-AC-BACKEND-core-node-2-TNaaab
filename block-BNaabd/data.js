let http = require("http");
let qs = require("querystring");

http
  .createServer((req, res) => {
    let dataType = req.headers["content-type"];
    console.log(dataType);
    let store = "";

    req.on("data", (chunk) => {
        store += chunk;
    });
    req.on("end", () => {
        if (dataType === `application\/json`) {
            res.setHeader("Content-Type", `application\/json`)
            res.write(JSON.stringify(JSON.parse(store)));
        }
        if (dataType === "application\/x-www-form-urlencoded") {
            // res.setHeader("Content-Type", "x-www-form-urlencoded");
            console.log(qs.parse(store));
            res.write(JSON.stringify(qs.parse(store)));
        }
        res.end();
    });   
  })
  .listen(4000, () => {
    console.log("The Server is Up And Running at http://localhost:4000");
  });
