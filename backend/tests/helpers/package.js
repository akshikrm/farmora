import app from '../../app'
import request from 'supertest'
import { WorkflowError } from './error'

export const createPackage = async () => {
  const res = await request(app).post('/api/users').send({
    name: 'Basic',
    price: 0,
    duration: 6,
    status: true,
  })
  if (res.status === 201) {
    return res.body.data.id
  }
  throw new WorkflowError(res)
}
