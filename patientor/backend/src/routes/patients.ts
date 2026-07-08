import express, { type Request, type Response, type NextFunction } from 'express';
import { newEntrySchema, type NewPatientEntry, type NonSensitivePatients, type Patient, type PatientEntry } from '../types/diagnosis.ts';
import patientsService from '../services/patientsService.ts';
import { z } from 'zod';

const router = express.Router();

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.get('/', (_req, res: Response<NonSensitivePatients[]>) => {
  res.send(patientsService.getNonSensitivePatients());
});

router.get('/:id', (req: Request<{ id: string }> , res: Response<Patient>) => {
  console.log('Patients router loaded');
  const patient = patientsService.getPatientById(req.params.id);
  res.send(patient);
});

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<PatientEntry>) => {
  const addedEntry = patientsService.addPatient(req.body);
  res.json(addedEntry);
});

router.use(errorMiddleware);

export default router;