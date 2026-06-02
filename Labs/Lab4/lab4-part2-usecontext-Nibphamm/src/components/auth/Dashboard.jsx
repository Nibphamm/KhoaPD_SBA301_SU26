/**
 * Dashboard.jsx – Màn hình sau khi đăng nhập thành công (Bài 2)
 *
 * TODO: Dùng useAuth() từ AuthContext để lấy user.
 *       Hiển thị thông tin: tên, email, vai trò của user.
 *       Component này KHÔNG nhận bất kỳ props nào.
 */
import { useAuth } from "../../context/AuthContext"

export default function Dashboard() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <div>
      <h2>Dashboard</h2>
      <div>
        <label htmlFor="dashboard-name">Tên</label>
        <input id="dashboard-name" type="text" value={user.name} readOnly />
      </div>
      <div>
        <label htmlFor="dashboard-email">Email</label>
        <input id="dashboard-email" type="text" value={user.email} readOnly />
      </div>
      <div>
        <label htmlFor="dashboard-role">Vai trò</label>
        <input id="dashboard-role" type="text" value={user.role} readOnly />
      </div>
    </div>
  )
}
