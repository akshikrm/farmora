import InvoiceConfig from '@models/invoice_config'

const getNextInvoiceNumberByUserId = async (userId) => {
  const record = await InvoiceConfig.findOne({
    where: {
      parent_id: userId,
    },
  })

  const prefix = record.name.slice(0, 3)
  const newNumber = record.number + 1

  record.number = newNumber

  await record.save()
  return `${prefix}-${newNumber}`
}

const invoiceService = {
  getNextInvoiceNumberByUserId: getNextInvoiceNumberByUserId,
}

export default invoiceService
