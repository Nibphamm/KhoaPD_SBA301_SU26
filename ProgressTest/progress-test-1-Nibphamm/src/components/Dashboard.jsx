import { Badge, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Dashboard() {
  const { state, dispatch } = useAuth()
  const { user } = state

  if (!user) return null

  return (
    <div>
      <h2>{user.name}</h2>
      <Badge bg={user.role === 'admin' ? 'danger' : 'success'}>{user.role}</Badge>
      <Button variant="secondary" onClick={() => dispatch({ type: 'LOGOUT' })}>
        Đăng xuất
      </Button>
      {user.role === 'admin' && (
        <Link to="/users">Xem danh sách Users</Link>
      )}
    </div>
  )
}
