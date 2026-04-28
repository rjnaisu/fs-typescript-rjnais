import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

import type { Diagnosis, Patient } from "../../types";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnosis";
import { PatientInfoCard } from "./PatientInfoCard";
import { EntryList } from "./EntryList";

const PatientDetails = () => {
  const [patient, setPatient] = useState<Patient>();
  const [error, setError] = useState<string>();
  const { id } = useParams<{ id: string }>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

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
        setError("Patient not found");
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

  if (error) {
    return (
      <div className="patient-details">
        <Typography>{error}</Typography>
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
        <PatientInfoCard patient={patient} />
        <EntryList entries={patient.entries} diagnosisGetName={diagnosisGetName} />
      </Box>
    </div>
  );
};

export default PatientDetails;
