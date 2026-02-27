import invoiceService from '@services/invoice_config.service'
import asyncHandler from '@utils/async-handler'

const handleGetNextInvoiceNumberByUserId = async (req, res) => {
  const newNumber = await invoiceService.getNextInvoiceNumberByUserId(
    req.user.id
  )

  res.success(newNumber, {
    message: 'Batch created successfully',
    statusCode: 201,
  })
}

const invoiceController = {
  handleGetNextInvoiceNumberByUserId: asyncHandler(
    handleGetNextInvoiceNumberByUserId
  ),
}

export default invoiceController
