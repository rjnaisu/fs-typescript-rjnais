import type { Patient, PatientNonSensitive, NewPatient, EntryWithoutId, Entry } from "../types.ts";
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

const addEntry = (patientId: string, entryData: EntryWithoutId): Entry | undefined => {
  const patient = getPatientById(patientId);
  if (!patient) {
    return undefined;
  }

  const entryNew: Entry = { id: crypto.randomUUID(), ...entryData };
  patient.entries.push(entryNew);
  return entryNew;
};

export default {
  getPatients,
  addPatient,
  getPatientById,
  addEntry,
};
