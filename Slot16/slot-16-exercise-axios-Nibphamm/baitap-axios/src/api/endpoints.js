// Cấu hình tập trung tất cả endpoints của API
// Khi backend đổi đường dẫn -> chỉ sửa ở file này

// Địa chỉ gốc của server (json-server đang chạy ở cổng 3001)
export const BASE_URL = 'http://localhost:3001'

// Khai báo các endpoint theo từng nhóm tài nguyên (resource)
export const ENDPOINTS = {
  // Nhóm users
  USERS: '/users',
  USER_BY_ID: (id) => `/users/${id}`,

  // Nhóm accounts (dùng cho đăng nhập)
  ACCOUNTS: '/accounts',
}
