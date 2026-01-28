# 🚀 NEWSHOP – HỆ THỐNG BÁN & QUẢN LÝ KHÓA HỌC ONLINE

# 🎯 NewShop là một hệ thống Web API quản lý & bán khóa học online được xây dựng theo mô hình MVC, sử dụng Node.js + Express + MySQL, hỗ trợ JWT Authentication, phân quyền Admin / Teacher / Student, sẵn sàng mở rộng giao diện Admin & Client.

**🌟 TÍNH NĂNG NỔI BẬT**

✨ Kiến trúc MVC rõ ràng – dễ mở rộng
✨ JWT Authentication – bảo mật cao
✨ Phân quyền Role-based
✨ API chuẩn RESTful
✨ Sẵn sàng kết nối Frontend (Admin / Client)

**🧠 CHỨC NĂNG CHÍNH**
# 🔐 AUTHENTICATION

    Đăng ký tài khoản

    Đăng nhập

    Lấy thông tin profile (JWT)

    Mã hóa mật khẩu với bcryptjs

# 👤 USER

Phân quyền:

Admin

Teacher

Student

# 📂 CATEGORY

CRUD danh mục khóa học

Lọc khóa học theo danh mục

# 📚 COURSE

Admin / Teacher:

➕ Tạo khóa học

✏️ Cập nhật khóa học

❌ Xóa khóa học

Client:

👀 Xem danh sách khóa học

🔍 Xem chi tiết khóa học

🎬 LESSON

CRUD bài học theo khóa học

Sắp xếp bài học bằng sort_order

Hỗ trợ video + nội dung bài học

🧾 ENROLLMENT

Học viên đăng ký khóa học

Lưu:

`user_id`

`course_id`

`price`

`role`

`enrolled_at`\

**🏗️ KIẾN TRÚC THƯ MỤC (MVC)**
# newshop/
├── config
│   └── database.js
│
├── controllers
│   ├── authController.js
│   ├── category.controller.js
│   ├── course.controller.js
│   ├── lesson.controller.js
│   └── enrollment.controller.js
│
├── models
│   ├── user.model.js
│   ├── category.model.js
│   ├── course.model.js
│   ├── lesson.model.js
│   └── enrollment.model.js
│
├── routes
│   ├── authRoutes.js
│   ├── categoryRoutes.js
│   ├── courseRoutes.js
│   ├── lessonRoutes.js
│   └── enrollmentRoutes.js
│
├── middleware
│   ├── auth.middleware.js
│   ├── role.middleware.js
│   └── errorHandler.js
│
├── public
│   ├── admin        # giao diện admin (HTML/CSS/JS)
│   └── uploads
│
├── server.js
├── .env
└── README.md

🔑 AUTH MIDDLEWARE (JWT)

**authenticate**
→ kiểm tra token

**authorize(role)**
→ phân quyền truy cập API

router.post('/courses', authenticate, authorize('admin', 'teacher'), create);

# 🔌 API ENDPOINTS
`AUTH`
Method	Endpoint	Mô tả
POST	/api/auth/register	Đăng ký
POST	/api/auth/login	Đăng nhập
GET	/api/auth/profile	Lấy thông tin user
`CATEGORY`
Method	Endpoint
GET	/api/categories
POST	/api/categories
PUT	/api/categories/:id
DELETE	/api/categories/:id
`COURSE`
Method	Endpoint
GET	/api/courses
GET	/api/courses/:id
POST	/api/courses
PUT	/api/courses/:id
DELETE	/api/courses/:id
`LESSON`
Method	Endpoint
GET	/api/lessons
POST	/api/lessons
PUT	/api/lessons/:id
DELETE	/api/lessons/:id
`ENROLLMENT`
Method	Endpoint
POST	/api/enrollments
GET	/api/enrollments/user/:id`
**⚙️ CÀI ĐẶT & CHẠY PROJECT**
# 1️⃣ Clone project
git clone https://github.com/yourname/newshop.git
cd newshop

# 2️⃣ Cài package
npm install
 
# 3️⃣ Tạo .env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=khoahoc
JWT_SECRET=newshop_secret

# 4️⃣ Chạy server
npm run dev


**🚀 Server chạy tại:**
👉 http://localhost:3000

# 🎨 FRONTEND

Giao diện Admin: /public/admin

Client UI: sẽ phát triển ở giai đoạn tiếp theo

# 🏆 KẾT LUẬN

**NewShop là một dự án Web API hoàn chỉnh, áp dụng đầy đủ kiến thức:**

NodeJS

Express

MySQL

JWT

MVC

RESTful API

# 🎓 Phù hợp làm đồ án môn Backend / NodeJS / Web API

**👨‍💻 TÁC GIẢ**

💻 Sinh viên: [`Kiêm Định`]

🏫 Trường: `FPT Polytechnic`

📅 Năm: `2025`