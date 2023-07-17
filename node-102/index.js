const fs = require("fs");

// console.log(fs);

// fs.writeFile("demo1.txt", "I am 30 years old", (err) => {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log("successfull");
//   }
// })



// fs.appendFile("demo1.txt", " I am 30 Years Old", (err) => {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log("Successfull");
//   }
// })



// fs.readFile("demo1.txt", "utf-8", (err, data) => {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log(data);
//   }
// })



// fs.rename("demo1.txt", "demo2.txt", (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("successfull");
//   }
// })



// fs.unlink("demo2.txt", (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("successfull");
//   }
// })

fs.existsSync("demo2.txt");