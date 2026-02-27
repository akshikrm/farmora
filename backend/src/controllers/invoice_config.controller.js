import invoiceService from '@services/invoice_config.service'
import asyncHandler from '@utils/async-handler'

const handleCreateInvoice = async (req, res) => {
  const response = await invoiceService.create(req.user)

  res.send('test')
}

const invoiceController = {
  create: asyncHandler(handleCreateInvoice),
}

export default invoiceController
