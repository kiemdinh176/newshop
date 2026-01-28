window.enroll = async function(courseId, price) {
  try {
    await api.post('/enrollments', {
      course_id: courseId,
      price
    });
    alert('🎉 Đăng ký thành công');
  } catch (err) {
    alert('❌ Bạn cần đăng nhập');
  }
};
