import React from 'react';
import { Layout, Menu } from 'antd';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import StudentList from './components/StudentList';
import AddStudent from './components/AddStudent';
import './App.css';

const { Header, Content, Footer } = Layout;

const App = () => {
  return (
    <Router>
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Link to="/">Student List</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/add">Add Student</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px', marginTop: '20px' }}>
          <div className="site-layout-content">
            <Routes>
              <Route path="/" element={<StudentList />} />
              <Route path="/add" element={<AddStudent />} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Student Manager ©2023</Footer>
      </Layout>
    </Router>
  );
};

export default App;
