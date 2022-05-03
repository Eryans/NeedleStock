const Item = require("../models/Items");

// @desc Get Items
// @route GET /api/item
const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (err) {
    console.log(err);
  }
};
const getSingleItem = async (req, res) => {
  try {
    const item = await Item.findOne({ _id: req.body._id });
    res.status(200).json(item);
  } catch (err) {
    console.log(err);
  }
};
// @route POST /api/item/setItem
const setItem = async (req, res) => {
  try {
    const item = await Item.create({
      name: req.body.name,
      customFields: req.body.customFields,
      quantity: req.body.quantity,
    });
    res.status(200).json(item);
  } catch (err) {
    console.log(err);
  }
};
// @route PUT /api/item/:id
const updateItem = async (req, res) => {
  const item = await Item.findById(req.body.id);
  if (!item) {
    res.status(400);
    throw new Error("Item not found");
  }
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.body.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedItem);
  } catch (err) {
    console.log(err);
  }
};
const updateItemQuantity = async (req, res) => {
  const item = await Item.findById(req.body.item);
  if (!item) {
    res.status(400);
    throw new Error("Item not found");
  }
  try {
    let newValue = item.quantity - req.body.quantity
    console.log(newValue)
    const updatedItem = await Item.findByIdAndUpdate(req.body.item, {
      $set:{
        quantity: newValue
      }
    }, {
      new: true,
    });
    res.json({ message: "Objets mis à jour", item: updatedItem });
  } catch (error) {
    res.json({message:"une erreur est survenu"})
    console.error(error);
  }
};
// @route DELETE /api/item/deleteItem
const deleteItem = async (req, res) => {
  const item = await Item.findById(req.body.id);
  if (!item) {
    res.status(400);
    throw new Error("Item not found");
  }
  try {
    //const deletedItem = await Item.findByIdAndDelete(req.body.id);
    res.status(200).json({ message: `${item.name} was deleted` });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getItems,
  setItem,
  updateItem,
  deleteItem,
  getSingleItem,
  updateItemQuantity,
};
