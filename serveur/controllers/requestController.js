const Request = require("../models/Request");

// @desc Get Requests
// @route GET /api/request
const getGroupRequests = async (req, res) => {
  try {
    const requests = await Request.find();
    res.status(200).json(requests);
  } catch (err) {
    console.log(err);
  }
};
const getRequests = async (req, res) => {
  try {
    const request = await Request.findOne({_id: req.body._id});
    res.status(200).json(request);
  } catch (err) {
    console.log(err);
  }
};
// @route POST /api/request/setRequest
const setRequest = async (req, res) => {
  try {
    const request = await Request.create({
      //TODO
    });
    res.status(200).json(request);
  } catch (err) {
    console.log(err);
  }
};
// @route PUT /api/request/:id
const updateRequest = async (req, res) => {
  const request = await Request.findById(req.body.id);
  if (!request) {
    res.status(400);
    throw new Error("Request not found");
  }
  try {
    const updatedRequest = await Request.findByIdAndUpdate(req.body.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedRequest);
  } catch (err) {
    console.log(err);
  }
};
// @route DELETE /api/request/deleteRequest
const deleteRequest = async (req, res) => {
  const request = await Request.findById(req.body.id);
  if (!request) {
    res.status(400);
    throw new Error("Request not found");
  }
  try {
    //const deletedRequest = await Request.findByIdAndDelete(req.body.id);
    res.status(200).json({ message: `${request.name} was deleted` });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getGroupRequests,
  setRequest,
  updateRequest,
  deleteRequest,
  getRequests
};
