// const http = require("http");
// const hostname = "127.0.0.1";
// const port = 3000;

// http.createServer((req, res) => {
//   console.log(req.url);
//   res.writeHead(210, { "Content-Type": "text/html" });
//   res.write("<h1>Hello, I'm your first server</h1>");
//   res.end();
// }).listen(port, hostname, () => {
//   console.log(`server is running successfully at http://${hostname}:${port}`);
// })



// const http = require("http");
// const fs = require("fs");
// const hostname = "127.0.0.1";
// const PORT = 3000;

// const server = http.createServer((req, res) => {
//   console.log(req.url);
  
//   if (req.url === "/") {
//     fs.readFile("index.html", (err, data) => {
//       res.writeHead(200, { "Content-Type": "text/html" });
//       res.write(data);
//       res.end()
//     })
//   } else if (req.url === "/contact") {
//     fs.readFile("contact.html", (err, data) => {
//       res.writeHead(200, { "Content-Type": "text/html" })
//       res.write(data);
//       res.end();
//     })
//   } else if (req.url === "/about") {
//     fs.readFile("about.html", (err, data) => {
//       res.writeHead(200, { "Content-Type": "text/html" })
//       res.write(data);
//       res.end();
//     })
//   } else {
//     fs.readFile("error.html", (err, data) => {
//       res.writeHead(200, { "Content-Type": "text/html" })
//       res.write(data);
//       res.end();
//     })
//   }
  
// })
  
// server.listen(PORT, hostname, () => {
//   console.log(`server is running successfully at http://${hostname}:${PORT}`);
// })






const http = require("http");
const fs = require("fs");
const hostname = "127.0.0.1";
const PORT = 3000;


const handleReadFile = (fileName, statusCode, req, res) => {
  fs.readFile(fileName, "utf-8", (err, data) => {

    if (err) {
      console.log(err)
    } else {
      res.writeHead(statusCode, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    }
  })

}

const server = http.createServer((req, res) => {
  console.log(req.url);

  if (req.url === "/") {
    handleReadFile("index.html", 200, req, res);
  } else if (req.url === "/about") {
      handleReadFile("about.html", 200, req, res);
  } else if (req.url === "/contact") {
    handleReadFile("contact.html", 200, req, res);
  } else {
      handleReadFile("error.html", 200, req, res);
  }

})

server.listen(PORT, hostname, () => {
  console.log(`server is running successfully at http://${hostname}:${PORT}`);
});