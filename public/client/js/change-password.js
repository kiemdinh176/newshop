document
  .getElementById('changePasswordForm')
  .addEventListener('submit', changePassword);

async function changePassword(e) {
  e.preventDefault();

  const oldPassword = document.getElementById('oldPassword').value;
  const newPassword = document.getElementById('newPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (!oldPassword || !newPassword || !confirmPassword) {
    alert('Vui lòng nhập đầy đủ thông tin');
    return;
  }

  if (newPassword !== confirmPassword) {
    alert('Mật khẩu mới không khớp');
    return;
  }

  try {
    await api.put('auth/change-password', {
      oldPassword,
      newPassword
    });

    window.location.href = 'login.html';
    alert('🎉 Đổi mật khẩu thành công, vui lòng đăng nhập lại');
    document.getElementById('changePasswordForm').reset();
  } catch (err) {
    alert(err.response?.data?.message || 'Đổi mật khẩu thất bại');
  }
}
