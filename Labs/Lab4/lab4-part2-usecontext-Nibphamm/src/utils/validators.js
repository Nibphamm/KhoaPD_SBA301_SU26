/**
 * validators.js – Hàm validate cho từng field của form đăng ký (Bài 3)
 *
 * TODO: Hoàn thiện logic validate cho từng field theo yêu cầu bên dưới.
 *
 * Quy tắc:
 *  - fullName : không trống, ít nhất 3 ký tự
 *  - email    : không trống, đúng định dạng email
 *  - password : không trống, ≥ 6 ký tự, có ít nhất 1 chữ hoa, 1 chữ số
 *  - confirmPassword : không trống, phải khớp với password
 *
 * @param {string} name       - tên field
 * @param {string} value      - giá trị hiện tại của field
 * @param {object} allValues  - toàn bộ values của form (dùng cho confirmPassword)
 * @returns {string}          - thông báo lỗi, hoặc '' nếu hợp lệ
 */
export function validateField(name, value, allValues = {}) {
  switch (name) {
    case 'fullName':
      if (!value.trim()) return 'Không được để trống.'
      if (value.trim().length < 3) return 'Ít nhất 3 ký tự.'
      return ''

    case 'email':
      if (!value.trim()) return 'Không được để trống.'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Email không hợp lệ.'
      return ''

    case 'password':
      if (!value.trim()) return 'Không được để trống.'
      if (value.length < 6) return 'Mật khẩu phải có ít nhất 6 ký tự.'
      if (!/[A-Z]/.test(value)) return 'Mật khẩu phải có chữ hoa.'
      if (!/\d/.test(value)) return 'Mật khẩu phải có chữ số.'
      return ''

    case 'confirmPassword':
      if (!value.trim()) return 'Không được để trống.'
      if (value !== allValues.password) return 'Mật khẩu không khớp.'
      return ''

    default:
      return ''
  }
}
