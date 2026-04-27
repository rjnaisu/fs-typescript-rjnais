import type { Patient, PatientNonSensitive, NewPatient } from "../types.ts";
import patientData from "../../data/patients.ts";

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

const addPatient = (patient: NewPatient): Patient => {
  const newEntry: Patient = { id: crypto.randomUUID(), ...patient, entries: [] };
  patients.push(newEntry);
  return newEntry;
};

const getPatientById = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};

export default {
  getPatients,
  addPatient,
  getPatientById,
};
