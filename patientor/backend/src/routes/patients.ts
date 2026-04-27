import express, { type NextFunction, type Response, type Request } from "express";
import patientService from "../services/patientService.ts";
import {
  type NewPatient,
  type Patient,
  NewPatientSchema,
  type PatientNonSensitive,
} from "../types.ts";
import { z } from "zod";

const router = express.Router();

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    req.body = NewPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.get("/", (_req, res: Response<PatientNonSensitive[]>) => {
  res.send(patientService.getPatients());
});

router.get("/:id", (req: Request<{ id: string }>, res: Response<Patient | { error: string }>) => {
  const patient = patientService.getPatientById(req.params.id);

  if (!patient) {
    res.status(404).send({ error: "Patient not found" });
    return;
  }
  res.json(patient);
});

router.post(
  "/",
  newPatientParser,
  (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const addedPatient = patientService.addPatient(req.body);
    res.json(addedPatient);
  },
);

router.use(errorMiddleware);

export default router;
