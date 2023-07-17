const http = require("http");
const hostname = "127.0.0.1";
const port = 3000;

http.createServer((req, res) => {
  res.end("<h1>Hello, I'm your first server</h1>");
}).listen(port, hostname, () => {
  console.log(`server is running successfully at http://${hostname}:${port}`);
})