async function loadProfile() {
  try {
    const res = await api.get('/auth/profile');
    const user = res.data.data;

    document.getElementById('name').innerText = user.name;
    document.getElementById('email').innerText = user.email;
    document.getElementById('phone').innerText = user.phone || 'Chưa cập nhật';
    document.getElementById('role').innerText = user.role;

  } catch (err) {
    alert('Bạn chưa đăng nhập!');
    window.location.href = 'login.html';
  }
}

function logout() {
  localStorage.removeItem('token');
  window.location.href = 'login.html';
}

loadProfile();
