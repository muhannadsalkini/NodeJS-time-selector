import Request from "../models/Request.js";

export const createRequest = async (req, res) => {
  try {
    const { firstName, lastName, time } = req.body;
    const newRequest = new Request({ firstName, lastName, time });

    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const getRequests = async (req, res) => {
  try {
    const requests = await Request.find();
    res.status(200).json(requests);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
