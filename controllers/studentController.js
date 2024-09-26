const Student = require('../models/student');

// Thêm sinh viên mới
exports.addStudent = async (req, res) => {
  try {
    const { name, age, gender, major } = req.body;
    const student = new Student({ name, age, gender, major });
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ message: 'Error adding student', error: error.message });
  }
};

// Lấy danh sách sinh viên
exports.getStudents = async (req, res) => {
  try {
    const { major } = req.query;
    const students = major ? await Student.find({ major }) : await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching students', error: error.message });
  }
};

// Cập nhật thông tin sinh viên
exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedStudent = await Student.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: 'Error updating student', error: error.message });
  }
};

// Xóa sinh viên
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStudent = await Student.findByIdAndDelete(id);
    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting student', error: error.message });
  }
};
