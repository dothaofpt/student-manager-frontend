import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './Addstudent.css';

const EditStudent = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchStudent();
  }, []);

  const fetchStudent = async () => {
    try {
      const response = await axios.get(`/api/students/${id}`);
      form.setFieldsValue(response.data);
    } catch (error) {
      message.error('Error fetching student data');
    }
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await axios.put(`/api/students/${id}`, values);
      message.success('Student updated successfully');
      navigate('/');
    } catch (error) {
      message.error('Error updating student');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Edit Student</h2>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter name' }]}>
          <Input placeholder="Enter student name" />
        </Form.Item>
        <Form.Item name="age" label="Age" rules={[{ required: true, message: 'Please enter age' }]}>
          <Input type="number" placeholder="Enter student age" />
        </Form.Item>
        <Form.Item name="gender" label="Gender" rules={[{ required: true, message: 'Please enter gender' }]}>
          <Input placeholder="Enter gender" />
        </Form.Item>
        <Form.Item name="major" label="Major" rules={[{ required: true, message: 'Please enter major' }]}>
          <Input placeholder="Enter major" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Update Student
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditStudent;
