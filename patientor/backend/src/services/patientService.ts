import type { Patient, PatientNonSensitive } from "../types.ts";
import patientData from "../data/patients.ts";

const patients: Patient[] = patientData;

const getPatients = (): PatientNonSensitive[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default {
  getPatients,
};
