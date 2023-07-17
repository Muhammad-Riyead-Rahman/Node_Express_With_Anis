const path = require("path");

const products = require("../models/products.model");


exports.getProducts = (req, res) => {
  res.sendFile(path.join(__dirname + "/../views/products.html"));
};


exports.postProducts = (req, res) => {
  const name = (req.body.name).toString();
  const price = Number(req.body.price);

  const product = {
    name,
    price
  };

  products.push(product);

  res.status(201).json({
    success: true,
    products
  });

};