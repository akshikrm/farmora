import UserModel from './user.js'
import FarmModel from './farm.js'
import ItemModel from './item.js'
import ItemCategoryModel from './item_categories.models.js'
import ItemBatchAssignmentModel from './itembatchassignment.js'
import ItemReturnModel from './item-return.js'
import PackageModel from './package.js'
import PermissionModel from './permission.js'
import RoleModel from './role.js'
import RolePermissionModel from './rolepermission.js'
import SeasonModel from './season.js'
import SubscriptionModel from './subscription.js'
import BatchModel from './batch.js'
import UserRoleAssignment from './userroleassignment.js'
import VendorModel from './vendor.js'

UserModel.hasMany(SubscriptionModel, {
  foreignKey: 'user_id',
  as: 'subscriptions',
})

UserModel.belongsTo(UserModel, {
  foreignKey: 'parent_id',
  as: 'parent',
  targetKey: 'id',
})

BatchModel.belongsTo(UserModel, {
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

SubscriptionModel.belongsTo(UserModel, {
  foreignKey: 'user_id',
  as: 'user',
})

SubscriptionModel.belongsTo(PackageModel, {
  foreignKey: 'package_id',
  as: 'package',
})

UserModel.hasMany(UserRoleAssignment, {
  foreignKey: 'user_id',
  as: 'role_assignments',
})

RoleModel.belongsTo(UserModel, { foreignKey: 'manager_id', as: 'manager' })

UserRoleAssignment.belongsTo(UserModel, {
  foreignKey: 'user_id',
  as: 'user',
})

ItemModel.belongsTo(ItemCategoryModel, {
  foreignKey: 'category_id',
  as: 'category',
  targetKey: 'id',
})

ItemModel.belongsTo(VendorModel, {
  foreignKey: 'vendor_id',
  as: 'vendor',
  targetKey: 'id',
})

ItemModel.belongsTo(BatchModel, {
  foreignKey: 'batch_id',
  as: 'batch',
  targetKey: 'id',
})

ItemModel.hasMany(ItemBatchAssignmentModel, {
  foreignKey: 'item_id',
  as: 'assignments',
})

ItemReturnModel.belongsTo(ItemCategoryModel, {
  foreignKey: 'item_category_id',
  as: 'category',
  targetKey: 'id',
})

ItemReturnModel.belongsTo(BatchModel, {
  foreignKey: 'from_batch',
  as: 'from_batch_data',
  targetKey: 'id',
})

ItemReturnModel.belongsTo(BatchModel, {
  foreignKey: 'to_batch',
  as: 'to_batch_data',
  targetKey: 'id',
})

ItemReturnModel.belongsTo(VendorModel, {
  foreignKey: 'to_vendor',
  as: 'to_vendor_data',
  targetKey: 'id',
})

ItemReturnModel.belongsTo(UserModel, {
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

export {
  UserModel,
  FarmModel,
  ItemModel,
  ItemCategoryModel,
  ItemBatchAssignmentModel,
  ItemReturnModel,
  PackageModel,
  PermissionModel,
  RoleModel,
  RolePermissionModel,
  SeasonModel,
  SubscriptionModel,
  BatchModel,
  UserRoleAssignment,
  VendorModel,
}
