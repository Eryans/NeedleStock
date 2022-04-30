const Item = require('../models/Items')

// @desc Get Items
// @route GET /api/jewelry
const getItems = async (req, res) => {
  try {
    const jewelrys = await Item.find()
    res.status(200).json(jewelrys)
  } catch (err) {
    console.log(err)
  }
}
// @route POST /api/jewelry
const setItem = async (req, res) => {
  try {
    const jewelry = await Item.create({
      name: req.body.name,
      material: req.body.material,
      body_zone: req.body.body_zone,
      height: req.body.height,
      width: req.body.width,
      unit_price: req.body.unit_price,
      quantity: req.body.quantity
    })
    res.status(200).json(jewelry)
  } catch (err) {
    console.log(err)
  }
}
// @route PUT /api/jewelry/:id
const updateItem = async (req, res) => {
  const jewelry = await Item.findById(req.params.id)
  if (!jewelry) {
    res.status(400)
    throw new Error('Item not found')
  }
  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      },
    )
    res.status(200).json(updatedItem)
  } catch (err) {
    console.log(err)
  }
}
// @route DELETE /api/jewelry/:id
const deleteItem = async (req, res) => {
  const jewelry = await Item.findById(req.params.id)
  if (!jewelry) {
    res.status(400)
    throw new Error('Item not found')
  }
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: `${jewelry.name} was deleted` })
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  getItems,
  setItem,
  updateItem,
  deleteItem,
}
