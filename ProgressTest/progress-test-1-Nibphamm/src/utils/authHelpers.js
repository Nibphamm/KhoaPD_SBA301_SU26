import db from '../../db.json'

const USERS = db.users

export function findUser(username, password) {
  if (!username || !password) return null

  const user = USERS.find(
    (u) =>
      u.username === username &&
      u.password === password &&
      u.status === 'active'
  )

  return user ?? null
}
