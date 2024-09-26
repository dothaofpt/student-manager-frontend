// src/components/StudentItem.js
import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const StudentItem = ({ student, onStudentDeleted, onStudentUpdated }) => {
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await axios.delete(`/api/students/${student._id}`);
        onStudentDeleted(student._id);
        toast.success('Student deleted successfully!');
      } catch (error) {
        toast.error('Failed to delete student. ' + error.response.data.message);
      }
    }
  };

  return (
    <tr>
      <td>{student.name}</td>
      <td>{student.age}</td>
      <td>{student.gender}</td>
      <td>{student.major}</td>
      <td>
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default StudentItem;
