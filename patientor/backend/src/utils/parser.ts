import type { NewPatient } from "../types.ts";
import { Gender } from "../types.ts";

const parseNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if (
    "name" in object &&
    "ssn" in object &&
    "dateOfBirth" in object &&
    "occupation" in object &&
    "gender" in object
  ) {
    const newEntry: NewPatient = {
      name: parseName(object.name),
      ssn: parseSSN(object.ssn),
      dateOfBirth: parseDOB(object.dateOfBirth),
      occupation: parseOccupation(object.occupation),
      gender: parseGender(object.gender),
    };
    return newEntry;
  }
  throw new Error("Incorrect data: some fields are missing");
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
  return (Object.values(Gender) as string[]).includes(param);
};

const parseStringField = (value: unknown, field: string): string => {
  if (!value || !isString(value)) {
    throw new Error(`Incorrect or missing ${field}`);
  }
  return value;
};

const parseName = (value: unknown): string => parseStringField(value, "name");

const parseSSN = (value: unknown): string => parseStringField(value, "ssn");

const parseOccupation = (value: unknown): string => parseStringField(value, "occupation");

const parseDOB = (dob: unknown): string => {
  if (!dob || !isString(dob) || !isDate(dob)) {
    throw new Error("Incorrect or missong date of birth: " + dob);
  }
  return dob;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

export default parseNewPatient;
