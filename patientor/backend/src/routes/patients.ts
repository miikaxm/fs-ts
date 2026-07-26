import express, { type Request, type Response, type NextFunction } from 'express';
import { newEntrySchema, newPatientSchema, type Entry, type NewEntry, type NewPatientEntry, type NonSensitivePatients, type Patient, type PatientEntry } from '../types/types.ts';
import patientsService from '../services/patientsService.ts';
import { z } from 'zod';

const router = express.Router();

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newEntrySchema.parse(req.body);
    next();
  } catch (error) {
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

  console.log('ROUTER:', addedEntry);

  res.json(addedEntry);
});

router.post("/:id/entries", newEntryParser, (req: Request<{ id: string }, unknown, NewEntry>, res: Response<Entry>) => {
  const entry = patientsService.addEntry(req.params.id, req.body);

  if (!entry) {
    return res.sendStatus(404);
  }

  return res.json(entry);
});

router.use(errorMiddleware);

export default router;