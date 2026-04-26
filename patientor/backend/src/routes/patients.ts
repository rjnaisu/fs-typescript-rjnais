import express, { type Response } from "express";
import patientService from "../services/patientService.ts";
import type { PatientNonSensitive } from "../types.ts";

const router = express.Router();

router.get("/", (_req, res: Response<PatientNonSensitive[]>) => {
  res.send(patientService.getPatients());
});
router.post("/", (_req, res) => {
  res.send("Saving a diagnosis!");
});

export default router;
