import express, { Request, Response } from 'express';
import PatientModel from '../models/patient';
import { NonSensitivePatient } from '../types';
import { NewPatientSchema } from '../utils';
import { z } from 'zod';

const router = express.Router();
//get==========
router.get('/', async (_req: Request, res: Response<NonSensitivePatient[]>) => {
  const patients = await PatientModel.find({});

  const nonSensitivePatients = patients.map(patient => {
    const cleanPatient = patient.toJSON() as unknown as  Record<string, unknown>;
    //Blindfold yourself (unknown), and stop treating this thing like a highly-regulated medical Patient. 
    // Just treat it like a generic, lawless bucket of strings and random data (Record). 
    // I am taking the lid off the bucket so I can reach in and throw the SSN in the trash.
    
    delete cleanPatient.ssn;
    
    return cleanPatient;
  });

  res.json(nonSensitivePatients as NonSensitivePatient[]);
});

//post======

router.post('/' ,async (req:Request ,res: Response) =>{
    try {
        const validPatientData = NewPatientSchema.parse(req.body)
        const patient  = new PatientModel(validPatientData)
        const savedPatient = await patient.save()
        const cleanPatient = savedPatient.toJSON() as unknown as Record<string,unknown>

        delete cleanPatient.ssn
        res.json(cleanPatient as NonSensitivePatient);
        
    } catch (error) {
        if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: 'Unknown error' });
    }
    }
})


export default router;