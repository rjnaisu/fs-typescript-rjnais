import { Box, Typography } from "@mui/material";
import { Diagnosis } from "../../types";

interface Props {
  codes: string[] | undefined;
  diagnosisGetName: Record<string, Diagnosis>;
}

export const DiagnosisCodes = ({ codes, diagnosisGetName }: Props) => {
  return (
    <Box>
      {codes && codes.length > 0 ? (
        codes?.map((code) => (
          <Typography key={code}>
            {code}
            {diagnosisGetName[code] ? `- ${diagnosisGetName[code].name}` : ""}
          </Typography>
        ))
      ) : (
        <Typography>None</Typography>
      )}
    </Box>
  );
};
