import { z } from "zod";

export type Diagnosis = {
  code: string;
  name: string;
  latin?: string;
};

export const Gender = {
  Male: "male",
  Female: "female",
  Other: "other",
} as const;

export type Gender = (typeof Gender)[keyof typeof Gender];

//eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {}

export const NewPatientSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  ssn: z.string().trim().min(9, "SSN must be at least 9 characters"),
  dateOfBirth: z.iso.date(),
  occupation: z.string().trim().min(1, "Occupation is required"),
  gender: z.enum(Gender),
});

export const PatientSchema = NewPatientSchema.extend({
  id: z.uuid(),
});

export type NewPatient = z.infer<typeof NewPatientSchema>;
//export type Patient = z.infer<typeof PatientSchema>;

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[];
}
export type PatientNonSensitive = Omit<Patient, "ssn" | "entries">;
