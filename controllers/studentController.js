const Student = require('../models/student');

// Add a new student (POST /students)
exports.addStudent = async (req, res) => {
  try {
    const { name, age, gender, major } = req.body;
    const newStudent = new Student({ name, age, gender, major });
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json({ message: 'Error adding student', error });
  }
};

// Get list of students (GET /students)
exports.getStudents = async (req, res) => {
  try {
    const { major } = req.query;
    const students = major
      ? await Student.find({ major })
      : await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching students', error });
  }
};

// Update student information (PUT /students/:id)
exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedStudent = await Student.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: 'Error updating student', error });
  }
};

// Delete student (DELETE /students/:id)
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStudent = await Student.findByIdAndDelete(id);
    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting student', error });
  }
};
