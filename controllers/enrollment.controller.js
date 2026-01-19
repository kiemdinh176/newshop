const Enrollment = require('../models/enrollment.model');
const Course = require('../models/course.model');

// Đăng ký khóa học
exports.enroll = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const { course_id } = req.body;

    if (!course_id) {
      return res.status(400).json({
        success: false,
        message: 'course_id là bắt buộc'
      });
    }

    // kiểm tra đã đăng ký chưa
    const existed = await Enrollment.checkExists(user_id, course_id);
    if (existed) {
      return res.status(400).json({
        success: false,
        message: 'Bạn đã đăng ký khóa học này'
      });
    }

    // lấy giá khóa học
    const course = await Course.getById(course_id);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Khóa học không tồn tại'
      });
    }

    const enrollment = await Enrollment.create({
      user_id,
      course_id,
      price: course.price,
      role: 'student'
    });

    res.status(201).json({
      success: true,
      message: 'Đăng ký khóa học thành công',
      data: enrollment
    });
  } catch (error) {
    next(error);
  }
};

// Khóa học của tôi
exports.getMyCourses = async (req, res, next) => {
  try {
    const courses = await Enrollment.getByUser(req.user.id);

    res.json({
      success: true,
      data: courses
    });
  } catch (error) {
    next(error);
  }
};

// Admin: tất cả enrollments
exports.getAll = async (req, res, next) => {
  try {
    const data = await Enrollment.getAll();

    res.json({
      success: true,
      data
    });
  } catch (error) {
    next(error);
  }
};

// Hủy đăng ký
exports.remove = async (req, res, next) => {
  try {
    const { user_id, course_id } = req.body;

    if (!user_id || !course_id) {
      return res.status(400).json({
        success: false,
        message: 'user_id và course_id là bắt buộc'
      });
    }

    await Enrollment.remove(user_id, course_id);

    res.json({
      success: true,
      message: 'Hủy đăng ký thành công'
    });
  } catch (error) {
    next(error);
  }
};
