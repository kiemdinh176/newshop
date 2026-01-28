const Enrollment = require('../models/enrollment.model');
const Course = require('../models/course.model');

exports.enroll = async (req, res, next) => {
    try {
        const { course_id } = req.body;
        const course = await Course.getById(course_id);
        const enrollment = await Enrollment.create({
            user_id: req.user.id, course_id, price: course.price, role: 'student'
        });
        res.status(201).json({ success: true, data: enrollment });
    } catch (error) { next(error); }
};

exports.getMyCourses = async (req, res, next) => {
    try {
        const courses = await Enrollment.getByUser(req.user.id);
        res.json({ success: true, data: courses });
    } catch (error) { next(error); }
};

exports.getAll = async (req, res, next) => {
    try {
        const data = await Enrollment.getAll();
        res.json({ success: true, data });
    } catch (error) { next(error); }
};

exports.remove = async (req, res, next) => {
    try {
        await Enrollment.remove(req.body.user_id, req.body.course_id);
        res.json({ success: true, message: 'Hủy đăng ký thành công' });
    } catch (error) { next(error); }
};