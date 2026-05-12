import { Link } from "react-router-dom";
import { Patient } from "../types";

const PatientList = ({ patients }: { patients: Patient[] }) => {
  return (
    <table border={1} cellPadding={5} style={{ borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Gender</th>
          <th>Occupation</th>
        </tr>
      </thead>
      <tbody>
        {patients.map((p) => (
          <tr key={p.id}>
            <td>
              {/* Click their name to trigger the Route! */}
              <Link to={`/patients/${p.id}`}>{p.name}</Link>
            </td>
            <td>{p.gender}</td>
            <td>{p.occupation}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PatientList;
