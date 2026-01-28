const Course = require('../models/course.model');

exports.getAll = async (req, res, next) => {
    try {
        const { category_id } = req.query;
        const courses = await Course.getAll(category_id);
        res.json({ success: true, data: courses });
    } catch (error) { next(error); }
};

exports.getById = async (req, res, next) => {
    try {
        const course = await Course.getById(req.params.id);
        if (!course) return res.status(404).json({ success: false, message: 'Không tìm thấy' });
        res.json({ success: true, data: course });
    } catch (error) { next(error); }
};

exports.create = async (req, res, next) => {
    try {
        const course = await Course.create({ ...req.body, teacher_id: req.user.id });
        res.status(201).json({ success: true, data: course });
    } catch (error) { next(error); }
};

exports.update = async (req, res, next) => {
    try {
        await Course.update(req.params.id, req.body);
        res.json({ success: true, message: 'Cập nhật thành công' });
    } catch (error) { next(error); }
};

exports.remove = async (req, res, next) => {
    try {
        await Course.remove(req.params.id);
        res.json({ success: true, message: 'Xóa thành công' });
    } catch (error) { next(error); }
};

exports.getTop10 = async (req, res, next) => {
    try {
        const courses = await Course.getTop10();
        res.json({ success: true, data: courses });
    } catch (error) { next(error); }
};