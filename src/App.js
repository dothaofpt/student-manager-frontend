// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddStudentForm from './components/AddStudentForm';
import StudentList from './components/StudentList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    const response = await axios.get('/api/students');
    setStudents(response.data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleStudentAdded = (newStudent) => {
    setStudents((prevStudents) => [...prevStudents, newStudent]);
  };

  const handleStudentDeleted = (id) => {
    setStudents((prevStudents) => prevStudents.filter(student => student._id !== id));
  };

  return (
    <div className="container mt-5">
      <h1>Student Manager</h1>
      <AddStudentForm onStudentAdded={handleStudentAdded} />
      <StudentList students={students} onStudentDeleted={handleStudentDeleted} />
      <ToastContainer />
    </div>
  );
};

export default App;
