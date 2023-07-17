const express = require("express");

const router = express.Router();


const { getProducts, postProducts } = require("../controllers/products.controller");


router.get("/products", getProducts);
router.post("/products", postProducts);


module.exports = router;