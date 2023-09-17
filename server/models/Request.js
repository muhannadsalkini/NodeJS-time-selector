import mongoose from "mongoose";

const requsetSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    time: {
      type: String,
    },
  },
  { timestamps: true }
);

const Request = mongoose.model("Request", requsetSchema);

export default Request;
