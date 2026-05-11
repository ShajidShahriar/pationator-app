import express from 'express'
import DiagnosisModel from '../models/diagnosis'
import { Request,Response } from 'express'
import { Diagnosis } from '../types'

const router = express.Router()

router.get('/' , async(_req:Request ,res:Response<Diagnosis[]>) => {
    const diagnoses = await DiagnosisModel.find({})
    res.json(diagnoses as unknown as Diagnosis[])
})

export default router