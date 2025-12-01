import app from '../../app'
import request from 'supertest'
import { WorkflowError } from './error'

export const createItemCategory = async (token) => {
  const res = await request(app)
    .post('/api/items/categories')
    .set('Authorization', `Bearer ${token}`)
    .send({
      name: 'Chicks',
    })
  if (res.status === 201) {
    return res.body.data
  }
  throw new WorkflowError(res)
}
