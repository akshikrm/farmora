const createInvoice = async (currentUser) => {
  const record = await InvoiceConfig.create({
    name: name,
    number: 0,
    parent_id: currentUser.id,
  })

  return record
}

const invoiceService = {
  create: createInvoice,
}

export default invoiceService
