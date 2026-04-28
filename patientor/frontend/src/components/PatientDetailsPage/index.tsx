import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";

import type { Diagnosis, EntryWithoutId, Patient } from "../../types";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnosis";
import { PatientInfoCard } from "./PatientInfoCard";
import { EntryList } from "./EntryList";
import AddEntryModal from "../AddEntryModal";
import axios from "axios";

const getAxiosErrorMessage = (data: unknown): string => {
  if (typeof data === "string") {
    return data.replace("Something went wrong. Error: ", "");
  }

  if (data && typeof data === "object" && "error" in data) {
    const error = (data as { error?: unknown }).error;

    if (typeof error === "string") {
      return error;
    }

    if (Array.isArray(error)) {
      return error
        .map((issue) => {
          if (issue && typeof issue === "object" && "message" in issue) {
            const message = (issue as { message?: unknown }).message;
            return typeof message === "string" ? message : JSON.stringify(issue);
          }

          return JSON.stringify(issue);
        })
        .join(", ");
    }

    return JSON.stringify(error);
  }

  return "Unrecognized axios error";
};

const PatientDetails = () => {
  const [patient, setPatient] = useState<Patient>();
  const [patientError, setPatientError] = useState<string>();
  const [entryError, setEntryError] = useState<string>();
  const { id } = useParams<{ id: string }>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchData = async () => {
      try {
        const patient = await patientService.findById(id);
        const diagnoses = await diagnosisService.getAll();
        setPatient(patient);
        setDiagnoses(diagnoses);
      } catch {
        setPatientError("Patient not found");
      }
    };

    void fetchData();
  }, [id]);

  if (!id) {
    return (
      <div className="patient-details">
        <Typography>Patient id is missing</Typography>
      </div>
    );
  }

  if (patientError) {
    return (
      <div className="patient-details">
        <Typography>{patientError}</Typography>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="patient-details">
        <Typography>Loading patient...</Typography>
      </div>
    );
  }

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setEntryError(undefined);
  };

  const submitNewEntry = async (entry: EntryWithoutId) => {
    try {
      const addedEntry = await patientService.addEntry(patient.id, entry);
      setPatient({
        ...patient,
        entries: patient.entries.concat(addedEntry),
      });
      setModalOpen(false);
      setEntryError(undefined);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        const message = getAxiosErrorMessage(e.response?.data);
        console.error(message);
        setEntryError(message);
      } else {
        console.error("Unknown error", e);
        setEntryError("Unknown error");
      }
    }
  };

  const diagnosisGetName: Record<string, Diagnosis> = Object.fromEntries(
    diagnoses.map((d) => [d.code, d]),
  );

  return (
    <div>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 2fr" },
          gap: 2,
          alignItems: "start",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <PatientInfoCard patient={patient} />
          <Button variant="contained" onClick={() => openModal()}>
            Add New Entry
          </Button>
        </Box>
        <EntryList entries={patient.entries} diagnosisGetName={diagnosisGetName} />
      </Box>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={entryError}
        onClose={closeModal}
        diagnoses={diagnoses}
      />
    </div>
  );
};

export default PatientDetails;
