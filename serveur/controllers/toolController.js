const Tool = require('../models/Tools')

// @desc Get Tools
// @route GET /api/tool
const getTool = async (req, res) => {
  try {
    const tools = await Tool.find()
    res.status(200).json(tools)
  } catch (err) {
    console.log(err)
  }
}
// @route POST /api/tool
const setTool = async (req, res) => {
  try {
    const tool = await Tool.create({
      name: req.body.name,
      type: req.body.type,
      unit_price: req.body.unit_price,
      quantity: req.body.quantity
    })
    res.status(200).json(tool)
  } catch (err) {
    console.log(err)
  }
}
// @route PUT /api/tool/:id
const updateTool = async (req, res) => {
  const tool = await Tool.findById(req.params.id)
  if (!tool) {
    res.status(400)
    throw new Error('Tool not found')
  }
  try {
    const updatedTool = await Tool.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      },
    )
    res.status(200).json(updatedTool)
  } catch (err) {
    console.log(err)
  }
}
// @route DELETE /api/tool/:id
const deleteTool = async (req, res) => {
  const tool = await Tool.findById(req.params.id)
  if (!tool) {
    res.status(400)
    throw new Error('Tool not found')
  }
  try {
    const deletedTool = await Tool.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: `${tool.name} was deleted` })
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  getTool,
  setTool,
  updateTool,
  deleteTool,
}
