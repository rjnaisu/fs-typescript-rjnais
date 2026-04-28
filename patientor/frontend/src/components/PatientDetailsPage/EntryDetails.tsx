import { Typography } from "@mui/material";
import { Entry } from "../../types";

interface Props {
  entry: Entry;
}

export const EntryDetails = ({ entry }: Props) => {
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
