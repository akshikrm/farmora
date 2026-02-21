import User from './user'
import FarmModel from './farm'
import PurchaseModel from './purchase'
import ItemModel from './items.model'
import PurchaseBatchAssignmentModel from './purchasebatchassignment'
import PurchaseReturnModel from './purchase-return'
import PackageModel from './package'
import PermissionModel from './permission'
import RoleModel from './role'
import RolePermissionModel from './rolepermission'
import SeasonModel from './season'
import SubscriptionModel from './subscription'
import BatchModel from './batch'
import UserRoleAssignment from './userroleassignment'
import VendorModel from './vendor'
import IntegrationBookModel from './integationbook'
import WorkingCostModel from './workingcost'
import SalesModel from './sales'
import GeneralExpenseModel from './generalexpense'
import ExpenseSalesModel from './expensesales'

User.hasMany(SubscriptionModel, {
  foreignKey: 'user_id',
  as: 'subscriptions',
})

User.belongsTo(User, {
  foreignKey: 'parent_id',
  as: 'parent',
  targetKey: 'id',
})

BatchModel.belongsTo(User, {
  foreignKey: 'master_id',
  as: 'master',
  targetKey: 'id',
})

BatchModel.belongsTo(FarmModel, {
  foreignKey: 'farm_id',
  as: 'farm',
  targetKey: 'id',
})

BatchModel.belongsTo(SeasonModel, {
  foreignKey: 'season_id',
  as: 'season',
  targetKey: 'id',
})

IntegrationBookModel.belongsTo(FarmModel, {
  foreignKey: 'farm_id',
  as: 'farm',
  targetKey: 'id',
})

IntegrationBookModel.belongsTo(User, {
  foreignKey: 'master_id',
  as: 'master',
  targetKey: 'id',
})

WorkingCostModel.belongsTo(SeasonModel, {
  foreignKey: 'season_id',
  as: 'season',
  targetKey: 'id',
})

WorkingCostModel.belongsTo(User, {
  foreignKey: 'master_id',
  as: 'master',
  targetKey: 'id',
})

GeneralExpenseModel.belongsTo(SeasonModel, {
  foreignKey: 'season_id',
  as: 'season',
  targetKey: 'id',
})

GeneralExpenseModel.belongsTo(User, {
  foreignKey: 'master_id',
  as: 'master',
  targetKey: 'id',
})

ExpenseSalesModel.belongsTo(SeasonModel, {
  foreignKey: 'season_id',
  as: 'season',
  targetKey: 'id',
})

ExpenseSalesModel.belongsTo(User, {
  foreignKey: 'master_id',
  as: 'master',
  targetKey: 'id',
})

SubscriptionModel.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user',
})

SubscriptionModel.belongsTo(PackageModel, {
  foreignKey: 'package_id',
  as: 'package',
})

User.hasMany(UserRoleAssignment, {
  foreignKey: 'user_id',
  as: 'role_assignments',
})

RoleModel.belongsTo(User, { foreignKey: 'manager_id', as: 'manager' })

UserRoleAssignment.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user',
})

PurchaseModel.belongsTo(ItemModel, {
  foreignKey: 'category_id',
  as: 'category',
  targetKey: 'id',
})

PurchaseModel.belongsTo(VendorModel, {
  foreignKey: 'vendor_id',
  as: 'vendor',
  targetKey: 'id',
})

PurchaseModel.belongsTo(SeasonModel, {
  foreignKey: 'season_id',
  as: 'season',
  targetKey: 'id',
})

PurchaseModel.belongsTo(BatchModel, {
  foreignKey: 'batch_id',
  as: 'batch',
  targetKey: 'id',
})

PurchaseModel.hasMany(PurchaseBatchAssignmentModel, {
  foreignKey: 'purchase_id',
  as: 'assignments',
})

PurchaseReturnModel.belongsTo(ItemModel, {
  foreignKey: 'item_category_id',
  as: 'category',
  targetKey: 'id',
})

ItemModel.belongsTo(VendorModel, {
  foreignKey: 'vendor_id',
  as: 'vendor',
  targetKey: 'id',
})

PurchaseReturnModel.belongsTo(BatchModel, {
  foreignKey: 'from_batch',
  as: 'from_batch_data',
  targetKey: 'id',
})

PurchaseReturnModel.belongsTo(BatchModel, {
  foreignKey: 'to_batch',
  as: 'to_batch_data',
  targetKey: 'id',
})

PurchaseReturnModel.belongsTo(VendorModel, {
  foreignKey: 'to_vendor',
  as: 'to_vendor_data',
  targetKey: 'id',
})

PurchaseReturnModel.belongsTo(User, {
  foreignKey: 'master_id',
  as: 'master',
  targetKey: 'id',
})

RolePermissionModel.belongsTo(RoleModel, { foreignKey: 'role_id', as: 'role' })
RolePermissionModel.belongsTo(PermissionModel, {
  foreignKey: 'permission_id',
  as: 'permission',
})

RoleModel.hasMany(RolePermissionModel, {
  foreignKey: 'role_id',
  as: 'role_permissions',
})

UserRoleAssignment.belongsTo(RoleModel, { foreignKey: 'role_id', as: 'role' })

RoleModel.hasMany(UserRoleAssignment, {
  foreignKey: 'role_id',
  as: 'assigned_users',
})

SalesModel.belongsTo(SeasonModel, {
  foreignKey: 'season_id',
  as: 'season',
  targetKey: 'id',
})

SalesModel.belongsTo(BatchModel, {
  foreignKey: 'batch_id',
  as: 'batch',
  targetKey: 'id',
})

SalesModel.belongsTo(VendorModel, {
  foreignKey: 'buyer_id',
  as: 'buyer',
  targetKey: 'id',
})

SalesModel.belongsTo(User, {
  foreignKey: 'master_id',
  as: 'master',
  targetKey: 'id',
})

export {
  User as UserModel,
  FarmModel,
  PurchaseModel,
  ItemModel,
  PurchaseBatchAssignmentModel,
  PurchaseReturnModel,
  PackageModel,
  PermissionModel,
  RoleModel,
  RolePermissionModel,
  SeasonModel,
  SubscriptionModel,
  BatchModel,
  UserRoleAssignment,
  VendorModel,
  WorkingCostModel,
  SalesModel,
  GeneralExpenseModel,
  ExpenseSalesModel,
}
