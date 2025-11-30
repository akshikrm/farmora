import app from '../../app'
import request from 'supertest'
import { WorkflowError } from './error'

export const createUser = async () => {
  const res = await request(app).post('/api/users').send({
    name: 'Raoof Subi',
    username: 'raoof',
    password: 'root',
    package_id: 1,
    status: 1,
  })
  if (res.status === 201) {
    return res.body.data.id
  }
  throw new WorkflowError(res)
}
