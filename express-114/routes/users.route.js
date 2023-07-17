const router = require("express").Router();


const { getAllUsers, createUsers, updateUser, deleteUser } = require("../controllers/users.controller");


router.get("/users", getAllUsers);
router.post("/users", createUsers);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);


module.exports = router;