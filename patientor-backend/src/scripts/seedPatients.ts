import mongoose from 'mongoose';
import config from '../utils/config';
import PatientModel from '../models/patient';
import { Patient } from '../types';
import patientsData from '../data/patients.json';

// We use Omit to tell TS: "This data matches Patient, but without the 'id' field"
const patients = patientsData as Omit<Patient, 'id'>[];

const seedDB = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(config.MONGODB_URI as string);
    console.log('Vault unlocked. Clearing old patient data...');

    // Wipe the patient collection clean
    await PatientModel.deleteMany({});

    console.log('Injecting patient seed data...');
    // Drop the entire array into the vault at once
    await PatientModel.insertMany(patients);

    console.log('✅ Patients Database Seeded Successfully!');
    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    mongoose.connection.close();
  }
};

seedDB();