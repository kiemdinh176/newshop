const Course = require('../models/course.model');

exports.getAll = async (req, res, next) => {
  try {
    const courses = await Course.getAll();

    res.json({
      success: true,
      data: courses
    });
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const course = await Course.getById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy khóa học'
      });
    }

    res.json({
      success: true,
      data: course
    });
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { category_id, title, description, price, image } = req.body;

    if (!category_id || !title || !price) {
      return res.status(400).json({
        success: false,
        message: 'Thiếu dữ liệu bắt buộc'
      });
    }

    const course = await Course.create({
      teacher_id: req.user.id,
      category_id,
      title,
      description,
      price,
      image
    });

    res.status(201).json({
      success: true,
      message: 'Tạo khóa học thành công',
      data: course
    });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    await Course.update(req.params.id, req.body);

    res.json({
      success: true,
      message: 'Cập nhật khóa học thành công'
    });
  } catch (error) {
    next(error);
  }
};

exports.remove = async (req, res, next) => {
  try {
    await Course.remove(req.params.id);

    res.json({
      success: true,
      message: 'Xóa khỏi học thành công'
    });
  } catch (error) {
    next(error);
  }
};
