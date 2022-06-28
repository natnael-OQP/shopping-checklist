const asyncHandler = require("express-async-handler");
const Item = require("../model/Item");

// GET Item

const getItems = asyncHandler(async (req, res) => {
  try {
    var item = await Item.find();
    if (!Item) {
      res.status(401).json({ message: "Item NOT Found" });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(401).json(error);
  }
});

//  CREATE Item
const createItem = asyncHandler(async (req, res) => {
  try {
    const { name, desc, price, image, isChecked } = req.body;
    if (!name || !desc || !price) {
      res.status(400).json({ message: "fill required fields" });
      return;
    }
    const newItemCreated = await Item.create({
      name,
      desc,
      price,
      image,
      isChecked,
    });
    res.status(200).json(newItemCreated);
  } catch (error) {
    res.status(401).json(error);
  }
});

// UPDATE Item
const updateItem = asyncHandler(async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      res.status(400).json({ message: "Item NOT Found" });
    }

    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(400).json(error);
  }
});
// DElETE Item
const deleteItem = asyncHandler(async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      res.status(400).json({ message: "Item NOT Found" });
      return;
    }
    await Item.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(400).json(error);
    return;
  }
});

module.exports = {
  createItem,
  deleteItem,
  updateItem,
  getItems,
};
