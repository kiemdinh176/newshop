function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    // Lưu trạng thái vào localStorage để lần sau mở web vẫn là Dark Mode
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkmode', isDark);
}
function updateNavbar() {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    // Lấy các phần tử DOM
    const loginLink = document.getElementById('nav-login');
    const registerLink = document.getElementById('nav-register');
    const profileLink = document.getElementById('nav-profile');
    const logoutBtn = document.getElementById('nav-logout');
    const userInfo = document.getElementById('user-info');

    if (token) {
        // --- TRƯỜNG HỢP: ĐÃ ĐĂNG NHẬP ---
        if(loginLink) loginLink.style.display = 'none';
        if(registerLink) registerLink.style.display = 'none';
        
        if(profileLink) profileLink.style.display = 'inline-block';
        if(logoutBtn) logoutBtn.style.display = 'inline-block';

        // Hiển thị tên User cho "oai"
        if(userInfo && user) {
            userInfo.innerHTML = `<span style="color: #123456; font-weight: bold;">Chào, ${user.name}</span>`;
        }
    } else {
        // --- TRƯỜNG HỢP: CHƯA ĐĂNG NHẬP (ĐÃ ĐĂNG XUẤT) ---
        if(loginLink) loginLink.style.display = 'inline-block';
        if(registerLink) registerLink.style.display = 'inline-block';
        
        if(profileLink) profileLink.style.display = 'none';
        if(logoutBtn) logoutBtn.style.display = 'none';
        
        if(userInfo) userInfo.innerHTML = '';
    }
}

// Gọi hàm ngay khi load trang
document.addEventListener('DOMContentLoaded', updateNavbar);