import jwt from 'jsonwebtoken'

const { sign } = jwt

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key'

export const generateToken = (user) => {
  return sign({ id: user.id, email: user.email }, SECRET_KEY, {
    expiresIn: '24h', // Token validity
  })
}
