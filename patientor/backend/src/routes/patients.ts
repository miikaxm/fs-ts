import express, { type Response} from 'express';
import type { NonSensitivePatients } from '../types/diagnosis.ts';
import patientsService from '../services/patientsService.ts';


const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatients[]>) => {
  res.send(patientsService.getNonSensitivePatients());
});

router.post('/', (req, res) => {
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const addedPatient = patientsService.addPatient({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  });
  res.json(addedPatient);
});

export default router;