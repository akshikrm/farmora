import { beforeAll, describe, expect, it } from 'vitest'
import { createVendor } from './helpers/vendor'
import { createBatch } from './helpers/batch'
import { createItemCategory } from './helpers/item-category'
import {
  assignItemToBatch,
  createItem,
  getItemById,
  reassignItemToBatch,
} from './helpers/item'
import { createSeason } from './helpers/season'
import { connectDB } from '#utils/db'
import { createFarm } from './helpers/farm'

import '../models/index.js'
import { login } from './helpers/login.js'

describe('Assign Item to Batch Workflow', () => {
  let token = ''
  let vendor = null
  let itemCategory = null
  let farm = null
  let season = null
  let batch = null
  let item = null
  const totalItemQty = 1000
  const creatingAssignQty = 10
  const assignQty = 200
  const reassignQty = 100

  beforeAll(async () => {
    connectDB()
    token = await login()
    vendor = await createVendor(token)
    itemCategory = await createItemCategory(token)
    farm = await createFarm(token)
    season = await createSeason(token)
    batch = await createBatch(token, {
      farm_id: farm.id,
      season_id: season.id,
    })

    item = await createItem(token, {
      name: 'Chicks',
      total_price: 1300,
      quantity: totalItemQty,
      price_per_unit: 1.3,
      assign_quantity: creatingAssignQty,
      category_id: itemCategory.id,
      batch_id: batch.id,
      vendor_id: vendor.id,
    })

    expect(item.quantity).toBe(totalItemQty - creatingAssignQty)
  })

  it('should assign item to batch', async () => {
    const data = await assignItemToBatch(token, {
      quantity: assignQty,
      batch_id: batch.id,
      item_id: item.id,
    })
    expect(data.quantity).toBe(creatingAssignQty + assignQty)
  })

  it('should reassign item to another batch', async () => {
    const secondBatch = await createBatch(token, {
      name: 'mate farm',
      farm_id: farm.id,
      season_id: season.id,
    })

    const reassigned = await reassignItemToBatch(token, {
      item_id: item.id,
      source_batch_id: batch.id,
      target_batch_id: secondBatch.id,
      quantity: reassignQty,
    })

    expect(reassigned.quantity).toBe(
      creatingAssignQty + assignQty - reassignQty
    )

    const test = await getItemById(token, item.id)

    expect(test.quantity).toBe(totalItemQty - creatingAssignQty - assignQty)
  })
})
