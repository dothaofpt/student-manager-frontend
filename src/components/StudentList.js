import React, { useState, useEffect } from 'react';
import { Table, Button, message } from 'antd';
import axios from 'axios';
import './AppStudent.css';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  // Hàm lấy dữ liệu danh sách sinh viên từ API
  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/students');
      setStudents(response.data);
    } catch (error) {
      message.error('Error fetching students');
    }
    setLoading(false);
  };

  // Xóa sinh viên
  const deleteStudent = async (id) => {
    try {
      await axios.delete(`/api/students/${id}`);
      message.success('Student deleted successfully');
      fetchStudents(); // Lấy lại danh sách sau khi xóa
    } catch (error) {
      message.error('Error deleting student');
    }
  };

  // Gọi hàm fetchStudents khi component được render
  useEffect(() => {
    fetchStudents();
  }, []);

  // Cột hiển thị dữ liệu trong bảng
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Major',
      dataIndex: 'major',
      key: 'major',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Button type="link" onClick={() => deleteStudent(record._id)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h2>Student List</h2>
      <Table
        dataSource={students}
        columns={columns}
        rowKey="_id"
        loading={loading}
      />
    </div>
  );
};

export default StudentList;
