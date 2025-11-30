import app from '../../app'
import request from 'supertest'
import { WorkflowError } from './error'

export const createVendor = async (token) => {
  const res = await request(app)
    .post('/api/vendors')
    .set('Authorization', `Bearer ${token}`)
    .send({
      name: 'Bright Wholesale',
      address: 'Industrial Estate, Palakkad',
      opening_balance: 1500.5,
      vendor_type: 'seller',
    })
  if (res.status === 201) {
    return res.body.data
  }
  throw new WorkflowError(res)
}
