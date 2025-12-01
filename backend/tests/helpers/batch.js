import app from '../../app'
import request from 'supertest'
import { WorkflowError } from './error'

export const createBatch = async (token, overrides = {}) => {
  const res = await request(app)
    .post('/api/batches')
    .set('Authorization', `Bearer ${token}`)
    .send({
      name: 'Tazthe farm',
      ...overrides,
    })
  if (res.status === 201) {
    return res.body.data
  }

  throw new WorkflowError(res)
}
