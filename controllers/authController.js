const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;

if (!name || !email || !password || !phone) {
  return res.status(400).json({
    success: false,
    message: 'Vui lòng nhập đầy đủ name, email, password, phone'
  });
}
    
    const existingUser = await User.getByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email đã tồn tại'
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      phone
    });

    const token = generateToken(user);

    res.status(201).json({
      success: true,
      message: 'Đăng ký thành công',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        },
        token
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Thiếu email hoặc mật khẩu'
      });
    }

    const user = await User.getByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Sai email hoặc mật khẩu'
      });
    }

    const isMatch = await User.comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Sai email hoặc mật khẩu'
      });
    }

    const token = generateToken(user);

    res.json({
      success: true,
      message: 'Đăng nhập thành công',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        },
        token
      }
    });
  } catch (err) {
    next(err);
  }
};


exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.getById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy người dùng'
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};
// update pro5
exports.updateProfile = async (req, res, next) => {
  try {
    const { name, phone } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Tên không được để trống'
      });
    }

    const user = await User.updateProfile(req.user.id, {
      name,
      phone
    });

    res.json({
      success: true,
      message: 'Cập nhật profile thành công',
      data: user
    });
  } catch (error) {
    next(error);
  }
};
// change password
exports.changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng nhập mật khẩu cũ và mật khẩu mới'
      });
    }

    // Lấy user hiện tại (có password)
    const user = await User.getByEmail(req.user.email);

    const isMatch = await User.comparePassword(
      oldPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Mật khẩu cũ không đúng'
      });
    }

    await User.updatePassword(req.user.id, newPassword);

    res.json({
      success: true,
      message: 'Đổi mật khẩu thành công'
    });
  } catch (error) {
    next(error);
  }
};

