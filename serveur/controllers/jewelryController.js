const Jewelry = require('../models/Jewelrys')

// @desc Get Jewelrys
// @route GET /api/jewelry
const getJewelrys = async (req, res) => {
  try {
    const jewelrys = await Jewelry.find()
    res.status(200).json(jewelrys)
  } catch (err) {
    console.log(err)
  }
}
// @route POST /api/jewelry
const setJewelry = async (req, res) => {
  try {
    const jewelry = await Jewelry.create({
      name: req.body.name,
      material: req.body.material,
      height: req.body.height,
      width: req.body.width,
      quantity: req.body.quantity
    })
    res.status(200).json(jewelry)
  } catch (err) {
    console.log(err)
  }
}
// @route PUT /api/jewelry/:id
const updateJewelry = async (req, res) => {
  const jewelry = await Jewelry.findById(req.params.id)
  if (!jewelry) {
    res.status(400)
    throw new Error('Jewelry not found')
  }
  try {
    const updatedJewelry = await Jewelry.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      },
    )
    res.status(200).json(updatedJewelry)
  } catch (err) {
    console.log(err)
  }
}
// @route DELETE /api/jewelry/:id
const deleteJewelry = async (req, res) => {
  const jewelry = await Jewelry.findById(req.params.id)
  if (!jewelry) {
    res.status(400)
    throw new Error('Jewelry not found')
  }
  try {
    const deletedJewelry = await Jewelry.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: `${jewelry.name} was deleted` })
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  getJewelrys,
  setJewelry,
  updateJewelry,
  deleteJewelry,
}
