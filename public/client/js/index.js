// 1. Cấu hình hằng số
const BACKEND_URL = 'http://localhost:3000';

// 2. Khởi tạo khi trang web load xong
document.addEventListener('DOMContentLoaded', () => {
    checkLoginStatus(); // Kiểm tra login để hiện tên user
    loadCategories();   // Load danh mục
    loadTop10();        // Load top 6 khóa học
    loadAllCourses(null); // Load tất cả khóa học (mặc định)
});

// --- CÁC HÀM TIỆN ÍCH ---

function getImageUrl(path) {
    if (!path) return '/client/img/default.jpg';
    if (path.startsWith('http')) return path;
    const cleanPath = path.replace(/^\/+/, '');
    return `${BACKEND_URL}/client/img/${cleanPath}`;
}

// --- CÁC HÀM API & RENDER ---

// 1. Load Top 10 (Sửa tên cho khớp với listener)
async function loadTop10() {
    const container = document.getElementById('top-course-list');
    if (!container) return;

    try {
        const res = await api.get('/courses/top10');
        const courses = res.data.data;
        container.innerHTML = '';

        courses.forEach((course, index) => {
            container.innerHTML += `
                <div class="course-card">
                    <div class="rank-badge">#${index + 1}</div>
                    <img src="${getImageUrl(course.image)}" alt="${course.title}" onerror="this.src='/client/img/default.jpg'">
                    <div class="course-info p-4">
                        <h3>${course.title}</h3>
                        <p class="teacher"> GV: ${course.teacher_name}</p>
                        <p class="students"> SL: ${course.student_count} học viên</p>
                        <b class="price">${Number(course.price).toLocaleString()} VNĐ</b>
                        <button class="btn-primary" onclick="viewDetail(${course.id})">Xem chi tiết</button>
                    </div>
                </div>`;
        });
    } catch (err) {
        console.error("Lỗi Top 10:", err);
    }
}

// 2. Load Danh mục
async function loadCategories() {
    const list = document.getElementById('category-list');
    if (!list) return;
    try {
        const res = await api.get('/categories');
        const categories = res.data.data;
        categories.forEach(cat => {
            list.innerHTML += `<button onclick="loadAllCourses(event, ${cat.id})">${cat.name}</button>`;
        });
    } catch (err) { console.error("Lỗi danh mục:", err); }
}

// 3. Load Tất cả khóa học hoặc theo danh mục
async function loadAllCourses(event, catId = null) {
    // Xử lý nút active (xanh lá)
    if (event) {
        document.querySelectorAll('#category-list button').forEach(btn => btn.classList.remove('active'));
        event.currentTarget.classList.add('active');
    }

    const container = document.getElementById('all-course-list');
    container.style.opacity = '0.5';
// load khóa học theo danh mục 
    try {
        const url = catId ? `/courses?category_id=${catId}` : '/courses';
        const res = await api.get(url);
        
        // GỌI HÀM RENDER (Đã được định nghĩa bên dưới)
        renderCourses(res.data.data); 
        
    } catch (err) {
        console.error("Lỗi load khóa học:", err);
    } finally {
        container.style.opacity = '1';
    }
}

// 4. HÀM RENDER KHÓA HỌC (Fix lỗi ReferenceError)
function renderCourses(courses) {
    const container = document.getElementById('all-course-list');
    if (!container) return;
    container.innerHTML = '';

    if (courses.length === 0) {
        container.innerHTML = '<p class="text-center w-full">Không có khóa học nào trong danh mục này.</p>';
        return;
    }

    courses.forEach(c => {
        container.innerHTML += `
            <div class="course-card">
                <img src="${getImageUrl(c.image)}" onerror="this.src='/client/img/default.jpg'">
                <div class="p-4">
                    <h3>${c.title}</h3>
                    <p class="text-muted">Chuyên mục: ${c.category_name}</p>
                    <b class="price">${Number(c.price).toLocaleString()} VNĐ</b>
                    <button class="btn-primary" onclick="enroll(${c.id})">Đăng ký ngay</button>
                </div>
            </div>`;
    });
}

// --- HÀM XỬ LÝ USER ---

function checkLoginStatus() {
    const userInfo = document.getElementById('user-info');
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
        userInfo.innerHTML = `
            <span>Chào Anh <b>${user.name}</b></span>
            <button onclick="logout()">Đăng xuất</button>
        `;
    } else {
        userInfo.innerHTML = `<a href="login.html">Đăng nhập</a> | <a href="register.html">Đăng ký</a>`;
    }
}

function logout() {
    localStorage.clear();
    window.location.href = 'index.html';
}

async function enroll(courseId) {
    try {
        const res = await api.post('/enrollments/enroll', { course_id: courseId });
        alert(res.data.message);
    } catch (err) {
        alert(err.response?.data?.message || "Cần đăng nhập để đăng ký!");
    }
}

function viewDetail(id) {
    window.location.href = `course-detail.html?id=${id}`;
}