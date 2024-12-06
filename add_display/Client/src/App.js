import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddStudentForm from "./components/AddStudentForm";
import StudentsTable from "./components/StudentsTable";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Add Student</Link>
            </li>
            <li>
              <Link to="/students">View Students</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<AddStudentForm />} />
          <Route path="/students" element={<StudentsTable />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
