import IntegrationBookModel from '#models/integationbook'
import userRoles from '#utils/user-roles'
import dayjs from 'dayjs'
import { Op } from 'sequelize'

const create = async (payload, currentUser) => {
	if (currentUser.user_type === userRoles.staff.type) {
		payload.master_id = currentUser.master_id
	} else {
		payload.master_id = currentUser.id
	}

	const record = await IntegrationBookModel.create(payload)
	return record
}

const getAll = async (filter, currentUser) => {
	const { farm_id, start_date, end_date } = filter
	const whereClause = {
		farm_id,
	}

	if (start_date && end_date) {
		whereClause.date = {
			[Op.between]: [dayjs(start_date).toDate(), dayjs(end_date).toDate()],
		}
	} else if (start_date) {
		whereClause.date = { [Op.gte]: dayjs(start_date).toDate() }
	} else if (end_date) {
		whereClause.date = { [Op.lte]: dayjs(end_date).toDate() }
	}

	if (currentUser.user_type === userRoles.staff.type) {
		whereClause.master_id = currentUser.master_id
	} else if (currentUser.user_type === userRoles.manager.type) {
		whereClause.master_id = currentUser.id
	}

	const integrationBookRecords = await IntegrationBookModel.findAll({
		where: whereClause,
	})

	if (!integrationBookRecords || integrationBookRecords.length === 0) {
		return { credit_items: [], paid_items: [] }
	}

	const creditItems = integrationBookRecords.filter(
		(item) => item.payment_type === 'credit'
	)
	const paidItems = integrationBookRecords.filter(
		(item) => item.payment_type === 'paid'
	)

	return { credit_items: creditItems, paid_items: paidItems }
}

const integrationService = {
	create,
	getAll,
}

export default integrationService
