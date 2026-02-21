import CONFIG from '../../config.js'
import jwt from 'jsonwebtoken'

const { sign } = jwt

export const generateToken = (user) => {
  return sign({ id: user.id, email: user.email }, CONFIG.jwt_secret, {
    expiresIn: '24h',
  })
}
