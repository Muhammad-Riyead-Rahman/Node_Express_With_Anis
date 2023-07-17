const { v4:uuidv4 } = require('uuid');


const users = [
  {
    id: uuidv4(),
    name: "Riyead Rahman",
    email: "riyead.rahman@gmail.com"
  },
  {
    id: uuidv4(),
    name: "Misti Rahman",
    email: "misti.rahman@gmail.com"
  }
];


module.exports = users;