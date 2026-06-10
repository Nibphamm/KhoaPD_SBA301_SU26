import { useEffect, useState } from 'react'
import { Alert, Container, Table } from 'react-bootstrap'
import { useAuth } from '../hooks/useAuth'
import { getUsers } from '../services/userService'

export default function UserListPage() {
  const { state } = useAuth()
  const { user } = state
  const [users, setUsers] = useState([])

  useEffect(() => {
    if (user?.role === 'admin') {
      getUsers().then((data) => setUsers(data))
    }
  }, [user])

  if (user?.role !== 'admin') {
    return (
      <Alert data-testid="access-denied" variant="danger">
        Bạn không có quyền truy cập
      </Alert>
    )
  }

  return (
    <Container className="mt-4">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, index) => (
            <tr key={u.id}>
              <td>{index + 1}</td>
              <td>{u.username}</td>
              <td>{u.name}</td>
              <td>{u.role}</td>
              <td>{u.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}
