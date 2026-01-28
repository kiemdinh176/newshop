// public/client/js/my-courses.js 
async function loadMyCourses() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    alert('Vui lòng đăng nhập');
    window.location.href = 'login.html';
    return;
  }

  try {
    const res = await api.get(`enrollments/my-courses`);
    const courses = res.data.data;

    const box = document.getElementById('my-course-list');
    box.innerHTML = '';

    if (courses.length === 0) {
      box.innerHTML = '<p>Bạn chưa đăng ký khóa học nào</p>';
      return;
    }

    courses.forEach(c => {
      box.innerHTML += `
        <div class="course-card">
          <h3>${c.title}</h3>
          <p>💰 Giá: ${c.price} VNĐ</p>
          <p>📅 Ngày đăng ký: ${new Date(c.enrolled_at).toLocaleDateString()}</p>
          <button onclick="viewCourse(${c.course_id})">
            📖 Xem bài học
          </button>
        </div>
      `;
    });
  } catch (err) {
    alert('Không lấy được khóa học');
  }
}

loadMyCourses();
