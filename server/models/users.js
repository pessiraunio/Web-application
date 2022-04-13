import pool from '../database/db.js'

const getAllUsers = async () => {
  const users = await pool.query('SELECT * FROM users ORDER BY id ASC')
  console.log(users)
  return users.rows
}

const addUser = async (user) => {
  const result = await pool.query('INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4)'
    , [user.id, user.name, user.email, user.password])
  console.log(result)
  return result.rows
}

const getUserRowCountByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM users WHERE email=$1;', [email])
  console.log(result)
  return result.rowCount !== 0
}

const getUserByEmail = async (email) => {
  const user = await pool.query('SELECT * FROM users WHERE email=$1;', [email])
  console.log(user)
  return user.rows[0]
}

export {
  getAllUsers,
  getUserRowCountByEmail,
  addUser,
  getUserByEmail
}
