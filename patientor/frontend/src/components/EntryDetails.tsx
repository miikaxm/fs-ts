// Types
import { Entry, Diagnosis } from "../types";

// Icons
import WorkIcon from '@mui/icons-material/Work';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

// Health check rating icon
import HealthRatingIcon from "./HealthCheckIcon";

// MUI
import { Card, CardContent, Typography, Box } from '@mui/material';

const assertNever = (value: never): never => {
    throw new Error(`Unhandled entry: ${JSON.stringify(value)}`)
};

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const EntryDetails = ({ entry, diagnoses }: Props) => {
    switch (entry.type) {
        case "Hospital":
            return (
                <Card variant="outlined" sx={{ mb: 2}}>
                    <CardContent>
                        <Box display="flex" alignItems="center" gap={1} mb={1}>
                            <LocalHospitalIcon color="primary" />
                            <Typography variant="h6">{entry.date}</Typography>
                        </Box>
                        <Typography variant="body1" gutterBottom>
                            {entry.description}
                        </Typography>
                        <Box component="ul" sx={{ pl: 2, mb: 1, mt: 0 }}>
                            {entry.diagnosisCodes?.map(code => {
                                const diagnosis = diagnoses.find(d => d.code === code);

                                return (
                                    <Box component="li" key={code} sx={{ mb: 0.5 }}>
                                        {code} {diagnosis?.name}
                                    </Box>
                                );
                            })}
                        </Box>
                        <Typography variant="body1" gutterBottom>
                            Diagnosed by {entry.specialist}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Discharge date: {entry.discharge.date} <br />
                            Criteria: {entry.discharge.criteria}
                        </Typography>
                    </CardContent>
                </Card>
            );

        case "OccupationalHealthcare":
            return (
                <Card variant="outlined" sx={{ mb: 2}}>
                    <CardContent>
                        <Box display="flex" alignItems="center" gap={1} mb={1}>
                            <WorkIcon color="primary" />
                            <Typography variant="h6">{entry.date}</Typography>
                            <Typography variant="h6">{entry.employerName}</Typography>
                        </Box>
                        <Typography variant="body1" gutterBottom>
                            {entry.description}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Diagnosed by {entry.specialist}
                        </Typography>
                    </CardContent>
                </Card>
            );

        case "HealthCheck":
            return (
                <Card variant="outlined" sx={{ mb: 2 }}>
                    <CardContent>
                        <Box display="flex" alignItems="center" gap={1} mb={1}>
                            <MedicalServicesIcon color="primary" />
                            <Typography variant="h6">{entry.date}</Typography>
                        </Box>
                        <Typography variant="body1" gutterBottom>
                            {entry.description}
                        </Typography>
                        <Box display="flex" flexDirection="column" gap={0.5}>
                            <Typography variant="body2" color="textSecondary" component="div">
                                <Box display="flex" alignItems="center" gap={0.5}>
                                    <span>Health check rating: {entry.healthCheckRating}</span>
                                    <HealthRatingIcon rating={entry.healthCheckRating} />
                                </Box>
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Diagnosed by {entry.specialist}
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            );

        default:
            return assertNever(entry);
    }
};

export default EntryDetails;