const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Kết nối với MongoDB
mongoose.connect('mongodb+srv://thaodo:2005@thaodo.xjmme.mongodb.net/studentmanager', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Kết nối thành công với MongoDB');
}).catch((error) => {
  console.error('Lỗi kết nối MongoDB:', error);
});

// Sử dụng router trực tiếp từ file `studentRoutes.js`
const studentRoutes = require('./studentRoutes');
app.use('/students', studentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server chạy tại cổng ${PORT}`);
});
