const express = require('express');
const path = require('path');
const app = express();
const PORT = 5000;

// Chỉ định thư mục chứa các file tĩnh (HTML, CSS, JS)
// '.' nghĩa là ngay tại thư mục hiện tại
app.use(express.static('.'));

// Khi truy cập vào localhost:5000, nó sẽ tự động mở file index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🌐 Frontend Server đang chạy tại: http://localhost:${PORT}`);
});