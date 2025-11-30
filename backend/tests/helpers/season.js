import app from '../../app'
import request from 'supertest'
import { WorkflowError } from './error'

export const createSeason = async (token) => {
  const res = await request(app)
    .post('/api/seasons')
    .set('Authorization', `Bearer ${token}`)
    .send({
      name: 'Winter',
      from_date: '2025-06-01',
      to_date: '2025-12-10',
    })

  if (res.status === 201) {
    return res.body.data
  }

  throw new WorkflowError(res)
}
