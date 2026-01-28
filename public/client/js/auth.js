// LOGIN
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async e => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const res = await api.post('/auth/login', { email, password });

      const { token, user } = res.data.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      alert('🎉 Đăng nhập thành công');
      window.location.href = 'index.html';
    } catch (err) {
      alert('❌ Email hoặc mật khẩu sai');
    }
  });
}

// REGISTER
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', async e => {
    e.preventDefault();

    const data = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
      phone: document.getElementById('phone').value
    };

    try {
      await api.post('/auth/register', data);
      alert('🎉 Đăng ký thành công');
      window.location.href = 'login.html';
    } catch (err) {
      alert('❌ Email đã tồn tại');
    }
  });
}
