const express = require('express');
const cors = require('cors');
require('./config/database');
require('dotenv').config();


// const errorHandler = require('./middleware/errorHandler');
// const errorHandler = require('./middleware/errorHandler');
const auth = require('./middleware/auth');

// Routes
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const courseRoutes = require('./routes/courseRoutes');
const lessonRoutes = require('./routes/lessonRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 👉 Serve static frontend
app.use(express.static('public'));

// 👉 Trang giới thiệu API
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API Hệ thống quản lý khóa học',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      categories: '/api/categories',
      courses: '/api/courses',
      lessons: '/api/lessons',
      enrollments: '/api/enrollments',
      admin: '/admin'
    }
  });
});

// 👉 API routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/enrollments', enrollmentRoutes);

// 👉 Admin fallback (nếu là SPA)
app.get('/admin/*', (req, res) => {
  res.sendFile(__dirname + '/public/admin/index.html');
});

// Error handler
// app.use(errorHandler);

// 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Không tìm thấy route'
  });
});

// Start
app.listen(PORT, () => {
  console.log(`🚀 Server chạy tại http://localhost:${PORT}`);
});
