import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import './Addstudent.css';
const AddStudent = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await axios.post('/api/students', values);
      message.success('Student added successfully');
      form.resetFields();
    } catch (error) {
      message.error('Error adding student');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Add New Student</h2>
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
            Add Student
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddStudent;
