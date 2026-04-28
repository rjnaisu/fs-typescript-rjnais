import { useEffect, useState } from "react";
import { Box, Table, TableHead, Typography, TableCell, TableRow, TableBody } from "@mui/material";

import type { Entry, Patient } from "../types";
import { useParams } from "react-router-dom";
import patientService from "../services/patients";

const PatientDetails = () => {
  const [patient, setPatient] = useState<Patient>();
  const [error, setError] = useState<string>();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchPatient = async () => {
      try {
        const patient = await patientService.findById(id);
        setPatient(patient);
      } catch {
        setError("Patient not found");
      }
    };

    void fetchPatient();
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
      <Box>
        <Typography align="center" variant="h6">
          Patient details
        </Typography>
      </Box>
      <Table sx={{ marginBottom: "1em" }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Date of Birth</TableCell>
            <TableCell>SSN</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Occupation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow key={patient.id}>
            <TableCell>{patient.name}</TableCell>
            <TableCell>{patient.dateOfBirth}</TableCell>
            <TableCell>{patient.ssn}</TableCell>
            <TableCell>{patient.gender}</TableCell>
            <TableCell>{patient.occupation}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Box>
        <Typography align="center" variant="h6">
          Entries
        </Typography>
      </Box>

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
                  ? entry.diagnosisCodes?.map((code) => <div key={code}>{code}</div>)
                  : "None"}
              </TableCell>
              <TableCell>{renderEntryDetails(entry)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PatientDetails;
