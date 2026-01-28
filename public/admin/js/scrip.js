// code trong public/script.js
async function loadCourses() {
    try {
        // Phải ghi rõ đầy đủ địa chỉ của BE
        const response = await fetch('http://localhost:3000/api/'); 
        const data = await response.json();
        console.log("Dữ liệu từ BE:", data);
    } catch (error) {
        console.error("Không thể kết nối tới BE:", error);
    }
}

loadCourses();