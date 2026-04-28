import { Paper, Typography, Box } from "@mui/material";
import { Entry, Diagnosis } from "../../types";
import { EntryCard } from "./EntryCard";

interface Props {
  entries: Entry[];
  diagnosisGetName: Record<string, Diagnosis>;
}

export const EntryList = ({ entries, diagnosisGetName }: Props) => {
  return (
    <Paper elevation={2} sx={{ p: 2, minWidth: 0 }}>
      <Typography sx={{ mb: 1 }} variant="h6">
        Entries
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {entries.map((entry) => (
          <EntryCard key={entry.id} entry={entry} diagnosisGetName={diagnosisGetName} />
        ))}
      </Box>
    </Paper>
  );
};
