import { createContext, useContext, useState, useEffect } from 'react'
import { authApi } from '../api/userApi'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  // Cờ báo đang kiểm tra localStorage lúc khởi động (tránh điều hướng sớm)
  const [initializing, setInitializing] = useState(true)

  // Khôi phục session khi app khởi động
  useEffect(() => {
    const saved = localStorage.getItem('current_user')
    if (saved) setCurrentUser(JSON.parse(saved))
    setInitializing(false) // đã kiểm tra xong
  }, [])

  const login = async (username, password) => {
    setLoading(true)
    setError('')
    try {
      const { account, user } = await authApi.login(username, password)
      const session = { ...user, role: account.role }
      setCurrentUser(session)
      localStorage.setItem('current_user', JSON.stringify(session))
      return true
    } catch (err) {
      setError(err.message)
      return false
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setCurrentUser(null)
    localStorage.clear()
  }

  return (
    <AuthContext.Provider
      value={{ currentUser, loading, error, initializing, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Hook tiện dụng để dùng AuthContext
export function useAuth() {
  return useContext(AuthContext)
}
