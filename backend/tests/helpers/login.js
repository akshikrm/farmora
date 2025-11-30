import request from 'supertest'
import app from '../../app'
import { WorkflowError } from './error'

export const login = async () => {
  const res = await request(app).post('/api/auth/login').send({
    username: 'raoof',
    password: 'root',
  })

  if (res.status === 200) {
    return res.body.data.token
  }
  throw new WorkflowError(res)
}
