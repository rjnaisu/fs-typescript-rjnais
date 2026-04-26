import express, { type Response } from "express";
import patientService from "../services/patientService.ts";
import type { PatientNonSensitive } from "../types.ts";
import parseNewPatient from "../utils/parser.ts";

const router = express.Router();

router.get("/", (_req, res: Response<PatientNonSensitive[]>) => {
  res.send(patientService.getPatients());
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = parseNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatientEntry);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMsg = "Something went wrong";
    if (error instanceof Error) {
      errorMsg += " Error: " + error.message;
    }
    res.status(400).send(errorMsg);
  }
});

export default router;
