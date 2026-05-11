import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './utils/config';
import pingRouter from './routes/ping'
import diagnosisRouter from './routes/diagnoses';
import patientRouter from './routes/patients'; 

const app = express()
console.log('connecting to mongodb')

mongoose.connect(config.MONGODB_URI)
.then(() => {
    console.log('connected successfully')
})
.catch((error)=> {
    console.error('error connecting to mongodb',error.message)
})

app.use(cors())
app.use(express.json())


//=======
app.use('/api/ping' ,pingRouter)
app.use('/api/diagnoses', diagnosisRouter)
app.use('/api/patients', patientRouter);

export default app