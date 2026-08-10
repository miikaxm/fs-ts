import { useState } from "react";
import {Alert, Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography,} from "@mui/material";
import { HealthCheckRating } from "../../types";

interface Props {
  onSubmit: (values: any) => void;
}

const AddEntryForm = ({ onSubmit }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState("0");
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [entryType, SetEntryType] = useState("");

  // Additional info for other entry types

  const [employerName, setEmployerName] = useState("");

  const [sickLeaveStart, setSickLeaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");

  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    if (description.trim() === "") {
      setError("Description is required");
      return;
    }

    if (date.trim() === "") {
      setError("Date is required");
      return;
    }

    if (specialist.trim() === "") {
      setError("Specialist is required");
      return;
    }

    setError("");

    if (entryType === "HealthCheck") {
      const rating = Number(healthCheckRating);

       if (isNaN(rating) || rating < 0 || rating > 3) {
        setError("Health check rating must be between 0 and 3");
        return;
      }
    }

    if (entryType === "HealthCheck") {
      onSubmit({
        type: "HealthCheck",
        description,
        date,
        specialist,
        diagnosisCodes:
          diagnosisCodes === ""
            ? []
            : diagnosisCodes.split(",").map((c) => c.trim()),
        healthCheckRating: Number(
          healthCheckRating
        ) as HealthCheckRating,
      });
    }

    if (entryType === "OccupationalHealthcare") {
      onSubmit({
        type: "OccupationalHealthcare",
        description,
        date,
        specialist,
        diagnosisCodes:
          diagnosisCodes === ""
            ? []
            : diagnosisCodes.split(",").map((c) => c.trim()),
        employerName,
        sickLeave:
          sickLeaveStart && sickLeaveEnd
            ? {
                startDate: sickLeaveStart,
                endDate: sickLeaveEnd,
              }
            : undefined,
      });
    }

    if (entryType === "Hospital") {
      onSubmit({
        type: "Hospital",
        description,
        date,
        specialist,
        diagnosisCodes:
          diagnosisCodes === ""
            ? []
            : diagnosisCodes.split(",").map((c) => c.trim()),
        discharge: {
          date: dischargeDate,
          criteria: dischargeCriteria,
        },
      });
    }

    // Clear the form out
    setDescription("");
    setDate("");
    setSpecialist("");
    setDiagnosisCodes("");
    setHealthCheckRating("0");
    setEmployerName("")
    setSickLeaveStart("")
    setSickLeaveEnd("")
    setDischargeDate("")
    setDischargeCriteria("")
    setIsOpen(false);
    SetEntryType("");
  };

  return (
    <Box sx={{ mt: 2, mb: 3 }}>
      {/* Avaa / sulje nappi */}
      <Button
        variant="contained"
        onClick={() => {
          setIsOpen(!isOpen);
          setError("");
        }}
      >
        {isOpen ? "Close form" : "Add Health Check"}
      </Button>

      {isOpen && (
        <Paper
          elevation={3}
          sx={{
            mt: 2,
            p: 3,
            maxWidth: 1200,
          }}
        >
          <Typography variant="h5" sx={{ mb: 3 }}>
            Add Health Check Entry
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={submit}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            
            <FormControl fullWidth>
              <InputLabel id="entry-type-label">
                Entry type
              </InputLabel>

              <Select
                labelId="entry-type-label"
                value={entryType}
                label="Entry type"
                onChange={({ target }) =>
                  SetEntryType(target.value)
                }
              >
                <MenuItem value="HealthCheck">
                  Health Check
                </MenuItem>

                <MenuItem value="OccupationalHealthcare">
                  Occupational Healthcare
                </MenuItem>

                <MenuItem value="Hospital">
                  Hospital
                </MenuItem>
              </Select>
            </FormControl>
            
            <TextField
              label="Description"
              value={description}
              onChange={({ target }) =>
                setDescription(target.value)
              }
              fullWidth
            />

            <TextField
              label="Date"
              type="date"
              value={date}
              onChange={({ target }) =>
                setDate(target.value)
              }
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />

            <TextField
              label="Specialist"
              value={specialist}
              onChange={({ target }) =>
                setSpecialist(target.value)
              }
              fullWidth
            />

            <TextField
              label="Diagnosis codes"
              placeholder="S62.5, Z57.1"
              value={diagnosisCodes}
              onChange={({ target }) =>
                setDiagnosisCodes(target.value)
              }
              helperText="Separate multiple codes with commas"
              fullWidth
            />

            {entryType === "HealthCheck" && (
              <FormControl fullWidth>
                <InputLabel id="health-check-rating-label">
                  Health check rating
                </InputLabel>

                <Select
                  labelId="health-check-rating-label"
                  value={healthCheckRating}
                  label="Health check rating"
                  onChange={({ target }) =>
                    setHealthCheckRating(target.value)
                  }
                >
                  <MenuItem value="0">
                    0 - Healthy
                  </MenuItem>

                  <MenuItem value="1">
                    1 - Low risk
                  </MenuItem>

                  <MenuItem value="2">
                    2 - Moderate risk
                  </MenuItem>

                  <MenuItem value="3">
                    3 - High risk
                  </MenuItem>
                </Select>
              </FormControl>
            )}

            {entryType === "OccupationalHealthcare" && (
              <>
                <TextField
                  label="Employer name"
                  value={employerName}
                  onChange={({ target }) =>
                    setEmployerName(target.value)
                  }
                  fullWidth
                />

                <Typography>
                  Sick leave
                </Typography>

                <TextField
                  label="Start date"
                  type="date"
                  value={sickLeaveStart}
                  onChange={({ target }) =>
                    setSickLeaveStart(target.value)
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                />

                <TextField
                  label="End date"
                  type="date"
                  value={sickLeaveEnd}
                  onChange={({ target }) =>
                    setSickLeaveEnd(target.value)
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                />
              </>
            )}

            {entryType === "Hospital" && (
              <>
                <Typography>
                  Discharge
                </Typography>

                <TextField
                  label="Discharge date"    
                  type="date"
                  value={dischargeDate}   
                  onChange={({ target }) =>
                    setDischargeDate(target.value)
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth       
                />

                <TextField
                  label="Discharge criteria"
                  value={dischargeCriteria}
                  onChange={({ target }) =>
                    setDischargeCriteria(target.value)
                  }
                  fullWidth
                />
              </>
            )}

            <Box
              sx={{
                display: "flex",
                gap: 1,
                justifyContent: "flex-end",
                mt: 1,
              }}
            >
              <Button
                type="button"
                variant="outlined"
                onClick={() => {
                  setIsOpen(false);
                  setError("");
                }}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                variant="contained"
                color="success"
              >
                Add
              </Button>
            </Box>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default AddEntryForm;