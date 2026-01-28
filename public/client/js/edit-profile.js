
document
  .addEventListener('submit', updateProfile);
    async function updateProfile(e) {
    e.preventDefault()
        
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
            if (!name || !phone) {
                alert('Tên và số điện thoại không được để trống');
                return;
            }
             try {
                await api.put('/auth/profile', {
                    name,
                    phone
                });
                alert('🎉 Cập nhật hồ sơ thành công');
                window.location.href = 'profile.html';
            }
    
        
            catch (err) {
                alert('❌ Cập nhật hồ sơ thất bại');
            }

        }