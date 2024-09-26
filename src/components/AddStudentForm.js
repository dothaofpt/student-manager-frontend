// src/components/AddStudentForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddStudentForm = ({ onStudentAdded }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');
  const [major, setMajor] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/students', {
        name,
        age: parseInt(age),
        gender,
        major,
      });
      onStudentAdded(response.data);
      toast.success('Student added successfully!');
      setName('');
      setAge('');
      setGender('Male');
      setMajor('');
    } catch (error) {
      toast.error('Failed to add student. ' + error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h4>Add New Student</h4>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="number"
          className="form-control"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <select
          className="form-control"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Major"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Add Student
      </button>
    </form>
  );
};

export default AddStudentForm;
