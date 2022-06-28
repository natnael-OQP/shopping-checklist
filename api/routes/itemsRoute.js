const express = require("express");
const router = express.Router();
// controller
const {
  createItem,
  deleteItem,
  updateItem,
  getItems,
} = require("../controller/itemController");

router.post("/", createItem);
router.get("/", getItems);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);

module.exports = router;
