import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { AuthProvider, useAuth } from './context/AuthContext'
import LoginPage from './pages/LoginPage'
import UsersPage from './pages/UsersPage'

// Route yêu cầu đăng nhập
function PrivateRoute({ children }) {
  const { currentUser, initializing } = useAuth()

  // Chưa kiểm tra xong localStorage → chờ, không điều hướng sớm
  if (initializing) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Spinner animation="border" />
      </div>
    )
  }

  return currentUser ? children : <Navigate to="/login" replace />
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/users"
            element={
              <PrivateRoute>
                <UsersPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/users" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
