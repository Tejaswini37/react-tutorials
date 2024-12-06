import React from "react";
import { useState } from "react";
import axios from "axios";

const AddStudentForm = () => {
    const [formData, setFormData] = useState({ name: "", rollNo: "", Java: "", CPP: "", Python: "", GenAI: "", FSD: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://10.10.8.199:4000/addstudent", formData, {
                headers: {
                    'ngrok-skip-browser-warning': 'true'
                }
            });
            alert("Student added successfully");
        }
        catch (err) {
            console.error(err);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </div>

                <div>
                    <label>Roll Number:</label>
                    <input type="text" name="rollNo" value={formData.rollNo} onChange={handleChange} />
                </div>

                <div>
                    <label>Java:</label>
                    <input type="text" name="Java" value={formData.Java} onChange={handleChange} />
                </div>

                <div>
                    <label>CPP:</label>
                    <input type="text" name="CPP" value={formData.CPP} onChange={handleChange} />
                </div>

                <div>
                    <label>Python:</label>
                    <input type="text" name="Python" value={formData.Python} onChange={handleChange} />
                </div>

                <div>
                    <label>GenAI:</label>
                    <input type="text" name="GenAI" value={formData.GenAI} onChange={handleChange} />
                </div>

                <div>
                    <label>FSD:</label>
                    <input type="text" name="FSD" value={formData.FSD} onChange={handleChange} />
                </div>

                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default AddStudentForm;