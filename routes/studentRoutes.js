const express = require('express');
const studentController = require('../controllers/studentController');
const router = express.Router();

router.post('/', studentController.addStudent);
router.get('/', studentController.getStudents);
router.put('/:id', studentController.updateStudent);
router.delete('/:id', studentController.deleteStudent);

module.exports = router;
