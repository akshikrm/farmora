import vendorService from "#services/vendor.service";
import asyncHandler from "#utils/async-handler";

const create = async (req, res) => {
	const payload = req.body;
	const newVendor = await vendorService.create(payload);
	res.success(newVendor, { message: 'Vendor created successfully', statusCode: 201 });
};

const getAll = async (req, res) => {
	const filter = {
		page: parseInt(req.query.page) || 1,
		limit: parseInt(req.query.limit) || 10
	}

	if (req.query.master_id) { filter.master_id = req.query.master_id }
	if (req.query.status) { filter.status = req.query.status }
	if (req.query.name) { filter.name = req.query.name; }

	const vendorRecords = await vendorService.getAll(filter);
	res.success(vendorRecords, { message: 'Vendors fetched successfully' });
}

const getById = async (req, res) => {
	const { vendor_id } = req.params;
	const vendorRecord = await vendorService.getById(vendor_id);
	res.success(vendorRecord, { message: 'Vendor details fetched successfully' });
};

const updateById = async (req, res) => {
	const { vendor_id } = req.params;
	const payload = req.body;

	await vendorService.updateById(vendor_id, payload);
	res.success(null, { message: 'Vendor updated successfully' });
};

const deleteById = async (req, res) => {
	const { vendor_id } = req.params;
	await vendorService.deleteById(vendor_id);
	res.success(null, { message: 'Vendor deleted successfully', statusCode: 204 });

};


const vendorController = {
	create: asyncHandler(create),
	getAll: asyncHandler(getAll),
	getById: asyncHandler(getById),
	updateById: asyncHandler(updateById),
	deleteById: asyncHandler(deleteById),
};

export default vendorController;
