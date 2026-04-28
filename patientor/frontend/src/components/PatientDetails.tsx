import { useEffect, useState } from "react";
import { Box, Table, Typography, TableCell, TableRow, TableBody, Paper } from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import FavoriteIcon from "@mui/icons-material/Favorite";
import WorkIcon from "@mui/icons-material/Work";

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
        return <Typography>Health rating: {entry.healthCheckRating}</Typography>;
      case "Hospital":
        return (
          <Typography>
            Discharged: {entry.discharge.date} {entry.discharge.criteria}
          </Typography>
        );
      case "OccupationalHealthcare":
        return (
          <Typography>
            Employer: {entry.employerName}
            {entry.sickLeave && (
              <>
                <br />
                Sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
              </>
            )}
          </Typography>
        );
    }
  };

  const renderDiagnosisDetails = (entry: Entry) => {
    return entry.diagnosisCodes && entry.diagnosisCodes.length > 0 ? (
      entry.diagnosisCodes?.map((code) => (
        <Typography key={code}>
          {code}
          {diagnosisGetName[code] ? `- ${diagnosisGetName[code].name}` : ""}
        </Typography>
      ))
    ) : (
      <Typography>None</Typography>
    );
  };

  const renderEntryIcon = (entry: Entry) => {
    switch (entry.type) {
      case "HealthCheck":
        return <FavoriteIcon fontSize="small" />;
      case "Hospital":
        return <LocalHospitalIcon fontSize="small" />;
      case "OccupationalHealthcare":
        return <WorkIcon fontSize="small" />;
    }
  };

  return (
    <div className="patient-details">
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 2fr" },
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
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {patient.entries.map((entry) => (
              <Paper key={entry.id} variant="outlined" sx={{ p: 2, pr: 7, position: "relative" }}>
                <Box sx={{ position: "absolute", top: 16, right: 16 }}>
                  {renderEntryIcon(entry)}
                </Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, pr: 1 }}>
                  {entry.type}
                </Typography>

                <Box sx={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: 1 }}>
                  <Typography color="text.secondary">Date</Typography>
                  <Typography>{entry.date}</Typography>

                  <Typography color="text.secondary">Description</Typography>
                  <Typography>{entry.description}</Typography>

                  <Typography color="text.secondary">Specialist</Typography>
                  <Typography>{entry.specialist}</Typography>

                  <Typography color="text.secondary">Diagnosis</Typography>
                  <Box>{renderDiagnosisDetails(entry)}</Box>

                  <Typography color="text.secondary">Details</Typography>
                  <Box>{renderEntryDetails(entry)}</Box>
                </Box>
              </Paper>
            ))}
          </Box>
        </Paper>
      </Box>
    </div>
  );
};

export default PatientDetails;
