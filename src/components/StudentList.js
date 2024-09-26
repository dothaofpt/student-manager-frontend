import React, { useState, useEffect } from 'react';
import { Table, Button, message } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Addstudent.css';

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('/api/students');
      setStudents(response.data);
    } catch (error) {
      message.error('Error fetching students');
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`/api/students/${id}`);
      message.success('Student deleted successfully');
      fetchStudents();
    } catch (error) {
      message.error('Error deleting student');
    }
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Age', dataIndex: 'age', key: 'age' },
    { title: 'Gender', dataIndex: 'gender', key: 'gender' },
    { title: 'Major', dataIndex: 'major', key: 'major' },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <>
          <Link to={`/edit/${record._id}`}>
            <Button type="primary" style={{ marginRight: 10 }}>Edit</Button>
          </Link>
          <Button type="danger" onClick={() => deleteStudent(record._id)}>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <h2>Student List</h2>
      <Table dataSource={students} columns={columns} rowKey="_id" />
    </div>
  );
};

export default StudentList;
