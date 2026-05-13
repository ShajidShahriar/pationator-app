import axios from "axios";
import { Patient } from "../types";
import { PatientFormValues } from "../types";
import { Entry, EntryFormValues } from "../types";

const baseUrl = 'http://localhost:3001/api/patients';

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(baseUrl);
  return data;
};

//getbyId=======
const getById = async (id: string) => {
  const { data } = await axios.get<Patient>(`${baseUrl}/${id}`);
  return data;
};
//post==========


const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(baseUrl, object);
  return data;
};

//addEntry ==========
const addEntry = async (id: string, object: EntryFormValues) => {
  const { data } = await axios.post<Entry>(`${baseUrl}/${id}/entries`, object);
  return data;
};

export default { getAll ,getById , create , addEntry};