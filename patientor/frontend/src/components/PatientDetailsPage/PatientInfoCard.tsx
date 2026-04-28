import { Typography, Table, TableCell, TableBody, TableRow, Paper } from "@mui/material";
import { Patient } from "../../types";

interface Props {
  patient: Patient;
}

export const PatientInfoCard = ({ patient }: Props) => (
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
);
