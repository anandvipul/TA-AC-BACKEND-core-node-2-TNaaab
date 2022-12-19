let http = require("http");
let fs = require('fs');
let qs = require("querystring");
let url = require('url');
let path = require('path');
const { Console } = require("console");

http
  .createServer((req, res) => {
    let parsedUrl = url.parse(req.url);
    
    let filePromise = new Promise(function (resolve, reject) {
        let availFiles = [];
        fs.readdir(path.join(__dirname, 'users'), function (err, files) {
            if (err) {
                reject(err);
            } else {
                files.forEach((file) => {
                    console.log(file);
                    availFiles.push(file);
                });
                resolve(availFiles)
            }
        });
    });

    filePromise.then((res) => {console.log(res)});
    // fs.readdir(path.join(__dirname, 'users'), function (err, files) {
    //     if (err) {
    //         return console.log(err);
    //     } else {
    //         files.forEach((file) => {
    //             console.log(file);
    //             dirAvail.push(file);
    //         });
    //     }
    // });
    // console.log(dirAvail);


    if (parsedUrl.pathname === "/users" && req.method === "POST") {
        // Create User
        let store = "";
        req.on('data', (chunk) => {
            store += chunk;
        });
        req.on('end', () => {
            let parsedData = qs.parse(store);
            fs.writeFile(path.join(__dirname, 'users/')+`${parsedData.username}.json`, `${JSON.stringify(parsedData)}`, function (err) {
                console.log("Error: ", err);
                console.log(parsedData);
            })
        });
    } else if (parsedUrl.pathname === "/users" && req.method === "GET") {
        
        if (parsedUrl.pathname === parsedUrl.path) {
            // Display Form 
            fs.createReadStream("user_form.html").pipe(res);
        } else {
            // Read User
            let userName = "";
            
            userName = qs.parse(parsedUrl.query).username;
            fs.createReadStream(`${path.join(__dirname, 'users/')+`${userName}.json`}`).pipe(res);
            
        }

    } else if (parsedUrl.pathname === "/users" && req.method === "PUT") {
        // Update User
        let userName = "";
            
        userName = qs.parse(parsedUrl.query).username;
        fs.open(`${path.join(__dirname, 'users/')+`${userName}.json`}`, "r+", (err, fd) => {
            // console.log(content);
            fs.truncate(fd, 0, () => {
                let store = "";
                req.on('data', (chunk) => {
                    store += chunk;
                });
                req.on('end', () => {
                    fs.writeFile(fd, `${JSON.stringify(qs.parse(store))}`, () => {
                        console.log("Updated");
                    });
                    
                });
            });
        });
    } else if (parsedUrl.pathname === "/users" && req.method === "DELETE") {
        // Delete user
        let userName = "";
        userName = qs.parse(parsedUrl.query).username;
        fs.unlink(`${path.join(__dirname, 'users/')+`${userName}.json`}`, () => {Console.log("Deleted")});
    }

  })
  .listen(4000, () => {
    console.log("Server is UP and Running at http://localhost:4000");
  });
