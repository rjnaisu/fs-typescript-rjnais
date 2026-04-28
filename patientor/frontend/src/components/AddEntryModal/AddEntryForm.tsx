import { useState, SyntheticEvent } from "react";
import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  FormControl,
  Box,
  OutlinedInput,
  Chip,
} from "@mui/material";
import { Diagnosis, Entry, EntryWithoutId, HealthCheckRating } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryWithoutId) => void;
  diagnoses: Diagnosis[];
}

const AddEntryForm = ({ onCancel, onSubmit, diagnoses }: Props) => {
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [type, setType] = useState<Entry["type"]>("HealthCheck");
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(
    HealthCheckRating.Healthy,
  );

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    const common = {
      date,
      description,
      specialist,
      ...(diagnosisCodes.length > 0 ? { diagnosisCodes } : {}),
    };
    switch (type) {
      case "HealthCheck":
        onSubmit({
          ...common,
          type,
          healthCheckRating,
        });
        break;

      case "Hospital":
        onSubmit({
          ...common,
          type,
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        });
        break;

      case "OccupationalHealthcare":
        onSubmit({
          ...common,
          type,
          employerName,
          sickLeave:
            sickLeaveStartDate && sickLeaveEndDate
              ? {
                  startDate: sickLeaveStartDate,
                  endDate: sickLeaveEndDate,
                }
              : undefined,
        });
        break;
    }
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <FormControl fullWidth>
            <InputLabel id="entry-type-label">Type</InputLabel>
            <Select
              labelId="entry-type-label"
              label="Type"
              value={type}
              onChange={(event) => setType(event.target.value as Entry["type"])}
            >
              <MenuItem value="HealthCheck">Health Check</MenuItem>
              <MenuItem value="Hospital">Hospital</MenuItem>
              <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
            </Select>
          </FormControl>
          <TextField
            type="date"
            label="Date"
            placeholder="YYYY-MM-DD"
            fullWidth
            value={date}
            onChange={({ target }) => setDate(target.value)}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
          <TextField
            label="Description"
            fullWidth
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
          <TextField
            label="Specialist"
            fullWidth
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
          />
          {/* <TextField
            label="Diagnosis Codes (comma-separated)"
            fullWidth
            value={diagnosisCodes}
            onChange={({ target }) => setDiagnosisCodes(target.value)}
          /> */}
          <FormControl fullWidth>
            <InputLabel id="diagnosis-codes-label">Diagnosis Codes (comma-separated)</InputLabel>
            <Select
              labelId="diagnosis-codes-label"
              id="Diagnosis Codes (comma-separated)"
              multiple
              value={diagnosisCodes}
              onChange={(event) => {
                const value = event.target.value;
                setDiagnosisCodes(typeof value === "string" ? value.split(",") : value);
              }}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((code) => (
                    <Chip key={code} label={code} size="small" />
                  ))}
                </Box>
              )}
              MenuProps={{
                PaperProps: {
                  sx: {
                    maxHeight: 260,
                  },
                },
              }}
              input={<OutlinedInput label="Diagnosis Codes (comma-separated)" />}
            >
              {diagnoses.map((d) => (
                <MenuItem key={d.code} value={d.code}>
                  {d.code} - {d.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {type === "HealthCheck" && (
            <FormControl fullWidth>
              <InputLabel id="heathcheck-rating-label">Rating</InputLabel>
              <Select
                labelId="Rating"
                label="Rating"
                value={healthCheckRating}
                onChange={({ target }) =>
                  setHealthCheckRating(Number(target.value) as HealthCheckRating)
                }
              >
                <MenuItem value={HealthCheckRating.Healthy}>Healthy</MenuItem>
                <MenuItem value={HealthCheckRating.LowRisk}>Low risk</MenuItem>
                <MenuItem value={HealthCheckRating.HighRisk}>High risk</MenuItem>
                <MenuItem value={HealthCheckRating.CriticalRisk}>Critical risk</MenuItem>
              </Select>
            </FormControl>
          )}
          {type === "Hospital" && (
            <>
              <TextField
                type="date"
                label="Discharge date"
                value={dischargeDate}
                onChange={({ target }) => setDischargeDate(target.value)}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
              <TextField
                label="Discharge criteria"
                value={dischargeCriteria}
                onChange={({ target }) => setDischargeCriteria(target.value)}
              />
            </>
          )}
          {type === "OccupationalHealthcare" && (
            <>
              <TextField
                label="Employer"
                fullWidth
                value={employerName}
                onChange={({ target }) => setEmployerName(target.value)}
              />
              <TextField
                type="date"
                label="Sick leave start"
                value={sickLeaveStartDate}
                onChange={({ target }) => setSickLeaveStartDate(target.value)}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
              <TextField
                type="date"
                label="Sick leave end"
                value={sickLeaveEndDate}
                onChange={({ target }) => setSickLeaveEndDate(target.value)}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </>
          )}
        </Box>

        <Grid container justifyContent="space-between" sx={{ marginTop: 2 }}>
          <Grid size="auto">
            <Button color="secondary" variant="contained" type="button" onClick={onCancel}>
              Cancel
            </Button>
          </Grid>
          <Grid size="auto">
            <Button type="submit" variant="contained">
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;
