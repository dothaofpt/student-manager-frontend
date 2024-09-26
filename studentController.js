const Student = require('./student');

// Thêm sinh viên mới (POST /students)
exports.addStudent = async (req, res) => {
  try {
    const { name, age, gender, major } = req.body;
    const newStudent = new Student({ name, age, gender, major });
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json({ message: 'Lỗi khi thêm sinh viên', error });
  }
};

// Lấy danh sách sinh viên (GET /students)
exports.getStudents = async (req, res) => {
  try {
    const { major } = req.query;
    const students = major
      ? await Student.find({ major })
      : await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(400).json({ message: 'Lỗi khi lấy danh sách sinh viên', error });
  }
};

// Cập nhật thông tin sinh viên (PUT /students/:id)
exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedStudent = await Student.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedStudent) {
      return res.status(404).json({ message: 'Không tìm thấy sinh viên' });
    }
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: 'Lỗi khi cập nhật sinh viên', error });
  }
};

// Xóa sinh viên (DELETE /students/:id)
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStudent = await Student.findByIdAndDelete(id);
    if (!deletedStudent) {
      return res.status(404).json({ message: 'Không tìm thấy sinh viên' });
    }
    res.status(200).json({ message: 'Xóa sinh viên thành công' });
  } catch (error) {
    res.status(400).json({ message: 'Lỗi khi xóa sinh viên', error });
  }
};
