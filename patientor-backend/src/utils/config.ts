import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI;

//  process.env returns a string OR undefined. 
// We must throw an error immediately if the URI is missing, otherwise Mongoose will crash silently later.
if (!MONGODB_URI) {
  throw new Error(' ERROR: MONGODB_URI is missing in .env file');
}

export default {
  MONGODB_URI,
  PORT
};