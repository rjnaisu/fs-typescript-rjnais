import { useEffect, useState } from "react";
import { Box, Table, TableHead, Typography, TableCell, TableRow, TableBody } from "@mui/material";

import type { Patient } from "../types";
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
            <TableCell>Entries</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow key={patient.id}>
            <TableCell>{patient.name}</TableCell>
            <TableCell>{patient.dateOfBirth}</TableCell>
            <TableCell>{patient.ssn}</TableCell>
            <TableCell>{patient.gender}</TableCell>
            <TableCell>{patient.occupation}</TableCell>
            <TableCell>
              {patient.entries.length === 0 ? "No entries" : patient.entries.length}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default PatientDetails;
