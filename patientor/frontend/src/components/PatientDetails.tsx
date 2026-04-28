import { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableHead,
  Typography,
  TableCell,
  TableRow,
  TableBody,
  Paper,
} from "@mui/material";

import type { Diagnosis, Entry, Patient } from "../types";
import { useParams } from "react-router-dom";
import patientService from "../services/patients";
import diagnosisService from "../services/diagnosis";

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

  const diagnosisGetName = Object.fromEntries(diagnoses.map((d) => [d.code, d]));

  const renderEntryDetails = (entry: Entry) => {
    switch (entry.type) {
      case "HealthCheck":
        return <>Health rating: {entry.healthCheckRating}</>;
      case "Hospital":
        return (
          <>
            Discharged: {entry.discharge.date} {entry.discharge.criteria}
          </>
        );
      case "OccupationalHealthcare":
        return (
          <>
            Employer: {entry.employerName}
            {entry.sickLeave && (
              <div>
                Sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
              </div>
            )}
          </>
        );
    }
  };

  return (
    <div className="patient-details">
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "0.6fr 2fr" },
          gap: 2,
          alignItems: "start",
        }}
      >
        <Paper
          elevation={2}
          sx={{
            p: 2,
            position: { md: "sticky" },
            top: { md: 16 },
          }}
        >
          <Typography variant="h6" sx={{ mb: 1 }}>
            {patient.name}
          </Typography>
          <Table size="small">
            <TableBody>
              <TableRow>
                <TableCell>Date of Birth</TableCell>
                <TableCell>{patient.dateOfBirth}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>SSN</TableCell>
                <TableCell>{patient.ssn}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Gender</TableCell>
                <TableCell>{patient.gender}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Occupation</TableCell>
                <TableCell>{patient.occupation}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
        <Paper elevation={2} sx={{ p: 2, minWidth: 0 }}>
          <Typography sx={{ mb: 1 }} variant="h6">
            Entries
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Specialist</TableCell>
                <TableCell>Diagnosis</TableCell>
                <TableCell>Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patient.entries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>{entry.date}</TableCell>
                  <TableCell>{entry.description}</TableCell>
                  <TableCell>{entry.specialist}</TableCell>
                  <TableCell>
                    {entry.diagnosisCodes && entry.diagnosisCodes.length > 0
                      ? entry.diagnosisCodes?.map((code) => (
                          <div key={code}>
                            {code}
                            {diagnosisGetName[code] ? `- ${diagnosisGetName[code].name}` : ""}
                          </div>
                        ))
                      : "None"}
                  </TableCell>
                  <TableCell>{renderEntryDetails(entry)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </div>
  );
};

export default PatientDetails;
