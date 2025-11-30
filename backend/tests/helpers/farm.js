import app from '../../app'
import request from 'supertest'
import { WorkflowError } from './error'

export const createFarm = async (token) => {
  const res = await request(app)
    .post('/api/farms')
    .set('Authorization', `Bearer ${token}`)
    .send({
      name: 'Kozhikode farm 2',
      place: 'calicut',
      capacity: '4',
    })
  if (res.status === 201) {
    return res.body.data
  }

  throw new WorkflowError(res)
}
