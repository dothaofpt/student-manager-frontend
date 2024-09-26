// src/components/StudentList.js
import React from 'react';
import StudentItem from './StudentItem';

const StudentList = ({ students, onStudentDeleted }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Gender</th>
          <th>Major</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <StudentItem
            key={student._id}
            student={student}
            onStudentDeleted={onStudentDeleted}
          />
        ))}
      </tbody>
    </table>
  );
};

export default StudentList;
