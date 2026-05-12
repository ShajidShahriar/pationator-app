import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Patient , Diagnosis } from "./types";
import patientService from "./services/patients";
import diagnosisService from "./services/diagnoses";
import PatientList from "./components/patientList";
import PatientDetails from "./components/PatientDetails";
import AddPatientForm from "./components/AddPatientForm";
import { PatientFormValues } from "./types";


const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  useEffect(() => {
    const fetchPatients = async () => {
      const patientData = await patientService.getAll();
      const diagnosesData = await diagnosisService.getAll()
      setPatients(patientData);
      setDiagnoses(diagnosesData)
    };
    fetchPatients();
  }, []);

  const submitNewPatient = async (values: PatientFormValues) => {
    try {
      const newPatient = await patientService.create(values);
      
      setPatients(patients.concat(newPatient));
      
    } catch (error) {
      console.error("Failed to add patient", error);
      alert("Error adding patient! Check your terminal.");
    }
  };

  return (
    <Router>
      <div className="App">
        <header>
          <h1>Patientor</h1>
          <nav>
            <Link to="/" style={{ marginRight: "10px" }}>Home</Link> 
          </nav>
        </header>

        <main style={{ marginTop: "20px" }}>
          <Routes>
            <Route path="/" element={
              <div>
                <AddPatientForm onSubmit={submitNewPatient} />
                <PatientList patients={patients} />
              </div>
            } />
            <Route path="/patients/:id" element={<PatientDetails diagnoses={diagnoses} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

// The component implementations were moved to separate files under src/components.

export default App;