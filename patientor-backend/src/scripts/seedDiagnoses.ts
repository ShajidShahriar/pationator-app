import mongoose from "mongoose";
import config from "../utils/config";
import DiagnosisModel from '../models/diagnosis'
import { Diagnosis } from '../types';
import diagnosesData from '../data/diagnoses.json';


const diagnoses : Diagnosis[] = diagnosesData as Diagnosis[]

const seedDB = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(config.MONGODB_URI as string);
    console.log('Vault unlocked. Clearing old data...');

    await DiagnosisModel.deleteMany({});

    console.log('Injecting seed data...');
    await DiagnosisModel.insertMany(diagnoses);

    console.log(' Database Seeded Successfully!');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    mongoose.connection.close();
  }
};

seedDB();