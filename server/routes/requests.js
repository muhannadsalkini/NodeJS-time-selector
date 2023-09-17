import express from "express";
import { createRequest, getRequests } from "../controllers/requests.js";

const router = express.Router();

router.post("/", createRequest);

router.get("/requests", getRequests);

export default router;
