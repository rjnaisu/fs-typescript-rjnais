import express from "express";
import diagService from "../services/diagService.ts";

const router = express.Router();

router.get("/", (_req, res) => {
  const data = diagService.getDiagnoses();
  res.send(data);
});
router.post("/", (_req, res) => {
  res.send("Saving a diagnosis!");
});

export default router;
