import axios from "axios";
import { Entry, EntryWithoutId, Patient, PatientFormValues, PatientListEntry } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<PatientListEntry[]>(`${apiBaseUrl}/patients`);

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const findById = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return data;
};

const addEntry = async (id: string, entry: EntryWithoutId) => {
  const { data } = await axios.post<Entry>(`${apiBaseUrl}/patients/${id}/entries`, entry);
  return data;
};

export default {
  getAll,
  create,
  findById,
  addEntry,
};
