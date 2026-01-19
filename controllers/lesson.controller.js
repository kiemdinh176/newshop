const Lesson = require('../models/lesson.model');

// GET lessons by course
exports.getByCourse = async (req, res, next) => {
  try {
    const lessons = await Lesson.getByCourse(req.params.courseId);

    res.json({
      success: true,
      data: lessons
    });
  } catch (error) {
    next(error);
  }
};

// GET one lesson
exports.getById = async (req, res, next) => {
  try {
    const lesson = await Lesson.getById(req.params.id);

    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy bài học'
      });
    }

    res.json({
      success: true,
      data: lesson
    });
  } catch (error) {
    next(error);
  }
};

// CREATE lesson
exports.create = async (req, res, next) => {
  try {
    const { course_id, title, video, content, sort_order, length } = req.body;

    if (!course_id || !title) {
      return res.status(400).json({
        success: false,
        message: 'course_id và title là bắt buộc'
      });
    }

    const lesson = await Lesson.create({
      course_id,
      title,
      video,
      content,
      sort_order,
      length
    });

    res.status(201).json({
      success: true,
      message: 'Tạo bài học thành công',
      data: lesson
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE lesson
exports.update = async (req, res, next) => {
  try {
    await Lesson.update(req.params.id, req.body);

    res.json({
      success: true,
      message: 'Cập nhật bài học thành công'
    });
  } catch (error) {
    next(error);
  }
};

// DELETE lesson
exports.remove = async (req, res, next) => {
  try {
    await Lesson.remove(req.params.id);

    res.json({
      success: true,
      message: 'Xóa bài học thành công'
    });
  } catch (error) {
    next(error);
  }
};
