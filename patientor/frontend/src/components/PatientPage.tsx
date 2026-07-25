import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../services/patients";
import { Diagnosis, Patient } from "../types";
import { Typography } from "@mui/material";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import diagnosesService from "../services/diagnoses";


const PatientPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  const fetchDiagnosisList = async () => {
      const diagnoses = await diagnosesService.getAll();
      setDiagnoses(diagnoses);
    }
  void fetchDiagnosisList();

  useEffect(() => {
    if (id) {
      patientService.getById(id).then(patient => {
        setPatient(patient);
      });
    }
  }, [id]);

  if (!patient) {
    return <div>Patient not found</div>;
  }

  if (patient.gender == "male") {
    return (
        <div>
            {/* List patiens basic data */}
            <Typography variant="h5">{patient.name} <MaleIcon></MaleIcon></Typography>
            <Typography variant="subtitle1">ssn: {patient.ssn}</Typography>
            <Typography variant="subtitle1">Occupation: {patient.occupation}</Typography>
            <Typography variant="subtitle1">date of birth: {patient.dateOfBirth}</Typography><br />
            <Typography variant="h5">Entries</Typography>

            {/* List all entries and codes of patient */}
            {patient.entries.length > 0 && (
              patient.entries.map(entry => (
                <div key={entry.id}>
                  <p>{entry.date} {entry.description}</p>
                  <ul>
                    {entry.diagnosisCodes?.map(code => {
                      const diagnosis = diagnoses.find(d => d.code === code);

                      return (
                        <li key={code}>{code}
                          {code} {diagnosis?.name}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))
            )}
        </div>
    );
  } if (patient.gender == "female") {
    return (
        <div>
            {/* List patiens basic data */}
            <Typography variant="h5">{patient.name} <FemaleIcon></FemaleIcon></Typography>
            <Typography variant="subtitle1">ssn: {patient.ssn}</Typography>
            <Typography variant="subtitle1">Occupation: {patient.occupation}</Typography>
            <Typography variant="subtitle1">date of birth: {patient.dateOfBirth}</Typography><br />
            <Typography variant="h5">Entries</Typography>

            {/* List all entries and codes of patient */}
            {patient.entries.length > 0 && (
              patient.entries.map(entry => (
                <div key={entry.id}>
                  <p>{entry.date} {entry.description}</p>
                  <ul>
                    {entry.diagnosisCodes?.map(code => {
                      const diagnosis = diagnoses.find(d => d.code === code);

                      return (
                        <li key={code}>{code}
                          {code} {diagnosis?.name}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))
            )}
        </div>
    );
  } else {
    return (
        <div>
            {/* List patiens basic data */}
            <Typography variant="h5">{patient.name} <TransgenderIcon></TransgenderIcon></Typography>
            <Typography variant="subtitle1">ssn: {patient.ssn}</Typography>
            <Typography variant="subtitle1">Occupation: {patient.occupation}</Typography>
            <Typography variant="subtitle1">date of birth: {patient.dateOfBirth}</Typography><br />
            <Typography variant="h5">Entries</Typography>

            {/* List all entries and codes of patient */}
            {patient.entries.length > 0 && (
              patient.entries.map(entry => (
                <div key={entry.id}>
                  <p>{entry.date} {entry.description}</p>
                  <ul>
                    {entry.diagnosisCodes?.map(code => {
                      const diagnosis = diagnoses.find(d => d.code === code);

                      return (
                        <li key={code}>{code}
                          {code} {diagnosis?.name}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))
            )}
        </div>
    );
  }
  
};

export default PatientPage;