import { Box, Paper, Typography } from "@mui/material";
import { Diagnosis, Entry } from "../../types";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import FavoriteIcon from "@mui/icons-material/Favorite";
import WorkIcon from "@mui/icons-material/Work";
import { DiagnosisCodes } from "./DiagnosisCodes";
import { EntryDetails } from "./EntryDetails";

interface Props {
  entry: Entry;
  diagnosisGetName: Record<string, Diagnosis>;
}

export const EntryCard = ({ entry, diagnosisGetName }: Props) => {
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
    <Paper key={entry.id} variant="outlined" sx={{ p: 2, pr: 7, position: "relative" }}>
      <Box sx={{ position: "absolute", top: 16, right: 16 }}>{renderEntryIcon(entry)}</Box>
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
        <DiagnosisCodes codes={entry.diagnosisCodes} diagnosisGetName={diagnosisGetName} />

        <Typography color="text.secondary">Details</Typography>
        <EntryDetails entry={entry} />
      </Box>
    </Paper>
  );
};
