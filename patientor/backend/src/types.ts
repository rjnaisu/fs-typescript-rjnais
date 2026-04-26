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
export type Patient = z.infer<typeof PatientSchema>;

export type PatientNonSensitive = Omit<Patient, "ssn">;
