import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentsTable = () => {
  const [students, setStudents] = useState([]);
  const [editRow, setEditRow] = useState(null); 
  const [updatedScores, setUpdatedScores] = useState({}); 

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:4000/allstudents", {
        headers: {
          'ngrok-skip-browser-warning': true,
        },
      });
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleUpdateClick = (rollNo, scores) => {
    setEditRow(rollNo);
    setUpdatedScores(scores);
  };

  const handleScoreChange = (e) => {
    const { name, value } = e.target;
    setUpdatedScores((prevScores) => ({
      ...prevScores,
      [name]: parseInt(value, 10),
    }));
  };

  const handleSubmitClick = async (rollNo) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/student/${rollNo}`,
        { scores: updatedScores },
        {
          headers: {
            'ngrok-skip-browser-warning': true,
          },
        }
      );
      alert(response.data.message);
      setEditRow(null);
      fetchStudents(); 
    } catch (error) {
      console.error("Error updating student:", error);
      alert("Failed to update student.");
    }
  };

  const handleDelete = async (rollNo) => {
    try {
      const response = await axios.delete(
        `https://localhost:4000/student/${rollNo}`
      );
      alert("Student deleted successfully");
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
      alert("Failed to delete student.");
    }
  };

  return (
    <div className="container mt-5">
      <h3>Students List</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll Number</th>
            <th>Java</th>
            <th>CPP</th>
            <th>Python</th>
            <th>GenAI</th>
            <th>FSD</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.rollNo} id={`row${student.rollNo}`}>
              <td>{student.name}</td>
              <td>{student.rollNo}</td>
              {["Java", "CPP", "Python", "GenAI", "FSD"].map((subject) => (
                <td key={subject}>
                  {editRow === student.rollNo ? (
                    <input
                      type="number"
                      name={subject}
                      className="form-control"
                      value={updatedScores[subject]}
                      onChange={handleScoreChange}
                    />
                  ) : (
                    student.scores[subject]
                  )}
                </td>
              ))}
              <td>
                {editRow === student.rollNo ? (
                  <button
                    id={`submit${student.rollNo}`}
                    className="btn btn-success"
                    onClick={() => handleSubmitClick(student.rollNo)}
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    id={`update${student.rollNo}`}
                    className="btn btn-primary"
                    onClick={() => handleUpdateClick(student.rollNo, student.scores)}
                  >
                    Update
                  </button>
                )}
              </td>
              <td>
                <button
                  className="btn btn-danger ml-2"
                  onClick={() => handleDelete(student.rollNo)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsTable;