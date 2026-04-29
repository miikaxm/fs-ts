import express, { type Response} from 'express';
import type { NonSensitivePatients } from '../types/diagnosis.ts';
import patientsService from '../services/patientsService.ts';
import parseNewPatientEntry from '../utils.ts';


const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatients[]>) => {
  res.send(patientsService.getNonSensitivePatients());
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = parseNewPatientEntry(req.body);
    const addedEntry = patientsService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;