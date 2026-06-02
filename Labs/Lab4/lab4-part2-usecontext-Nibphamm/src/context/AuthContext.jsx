/**
 * AuthContext.jsx – Context quản lý trạng thái đăng nhập (Bài 2)
 *
 * Import dữ liệu: import USERS from '../data/users'
 *
 * TODO 1: Tạo AuthContext bằng createContext()
 *
 * TODO 2: Tạo AuthProvider component
 *         State cần quản lý:
 *         - user    : object | null  (null = chưa đăng nhập)
 *         - loading : boolean        (đang xử lý đăng nhập)
 *         - error   : string         (thông báo lỗi)
 *
 *         Hàm login(email, password):
 *         - Bật loading, xóa error
 *         - Giả lập API call bằng setTimeout (800ms)
 *         - Tìm user trong USERS theo email và password
 *         - Nếu tìm thấy: setUser, tắt loading
 *         - Nếu không: setError('Email hoặc mật khẩu không đúng.'), tắt loading
 *
 *         Hàm logout():
 *         - Xóa user (null) và error
 *
 *         Truyền { user, loading, error, login, logout } vào value của Provider
 *
 * TODO 3: Tạo custom hook useAuth()
 *         - Gọi useContext(AuthContext)
 *         - Ném lỗi nếu context là null
 *
 * Export: AuthProvider, useAuth
 */

import { createContext, useContext, useState } from "react"
import USERS from "../data/users"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState("")

	const login = (email, password) => {
		setLoading(true)
		setError("")

		setTimeout(() => {
			const matchedUser = USERS.find(
				(item) => item.email === email && item.password === password
			)

			if (matchedUser) {
				setUser(matchedUser)
			} else {
				setError("Email hoặc mật khẩu không đúng.")
			}

			setLoading(false)
		}, 800)
	}

	const logout = () => {
		setUser(null)
		setError("")
	}

	const value = { user, loading, error, login, logout }

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider")
	}
	return context
}
