import app from '../../app'
import request from 'supertest'
import { WorkflowError } from './error'

export const createItem = async (token, payload = {}) => {
  const res = await request(app)
    .post('/api/items')
    .set('Authorization', `Bearer ${token}`)
    .send(payload)

  if (res.status === 201) {
    return res.body.data
  }

  throw new WorkflowError(res)
}

export const getItemById = async (token, itemId) => {
  const res = await request(app)
    .get(`/api/items/${itemId}`)
    .set('Authorization', `Bearer ${token}`)

  if (res.status === 200) {
    return res.body.data
  }
  throw new WorkflowError(res)
}

export const assignItemToBatch = async (token, payload = {}) => {
  const res = await request(app)
    .put('/api/items/item-batch-assign')
    .set('Authorization', `Bearer ${token}`)
    .send(payload)
  if (res.status === 200) {
    return res.body.data
  }
  throw new WorkflowError(res)
}

export const reassignItemToBatch = async (token, payload = {}) => {
  const res = await request(app)
    .put('/api/items/item-batch-reassign')
    .set('Authorization', `Bearer ${token}`)
    .send(payload)
  if (res.status === 200) {
    return res.body.data
  }
  throw new WorkflowError(res)
}
