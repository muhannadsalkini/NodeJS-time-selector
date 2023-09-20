import express from "express";
import {
  createRequest,
  getRequests,
  deleteRequest,
} from "../controllers/requests.js";

const router = express.Router();

router.post("/", createRequest);

router.get("/requests", getRequests);

router.delete("/delete/:id", deleteRequest);

export default router;
