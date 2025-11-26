import 'dart:developer';

import 'package:farmora/providers/base_provider.dart';
import 'package:farmora/utils/customUtils.dart';
import 'package:flutter/material.dart';
import '../repositories/users_repository.dart';

class UsersProvider extends ChangeNotifier with BaseProvider {
  final UsersRepository _repository = UsersRepository();
  Map<String, dynamic> _users = {};
  Map<String, dynamic> _roles = {};
  Map<String, dynamic> _permissions = {};

  Map<String, dynamic> get users => _users;
  Map<String, dynamic> get roles => _roles;
  Map<String, dynamic> get permissions => _permissions;

  Future<void> loadUsers() async {
    _users = await _repository.fetchUsers();
    notifyListeners();
    if (_users["success"] == false) {
      _users = {};
      notifyListeners();
    }
    log("users are $_users");
  }

  Future<void> loadRoles() async {
    _roles.clear();
    notifyListeners();
    _roles = await _repository.fetchRoles();
    notifyListeners();
    if (_roles["success"] == false) {
      _roles = {};
      notifyListeners();
    }
    log("roles are $_roles");
  }

  Future<void> loadPermissions() async {
    final response = await _repository.fetchPermissions();
    if (response['success'] == true) {
      final List<dynamic> permissionsData = response['data']["data"];
      _permissions = {};

      for (var permission in permissionsData) {
        final parts = permission['key'].split(':');
        if (parts.length == 2) {
          final mainGroup = parts[0];
          final subGroup = parts[1];

          if (!_permissions.containsKey(mainGroup)) {
            _permissions[mainGroup] = <String, Map<String, dynamic>>{};
          }

          _permissions[mainGroup][subGroup] = {
            'description': permission['description'],
            'selected': false,
            'id': permission['id'],
          };
        }
      }

      notifyListeners();
    } else {
      _permissions = {};
      notifyListeners();
    }
  }

  Future<void> addUser(Map<String, dynamic> user) async {
    showLoading();
    final response = await _repository.addUser(user);
    if (response["status"] != 'success') {
      setValidationErrors(response["error"]);
    }
    hideLoading();
    await loadUsers();
  }

  Future<void> updateUser(String userId, Map<String, dynamic> user) async {
    showLoading();
    await _repository.updateUser(userId, user);
    hideLoading();
    await loadUsers();
  }

  Future<void> deleteUser(String userId) async {
    showLoading();
    await _repository.deleteUser(userId);
    hideLoading();
    await loadUsers();
  }

  Future<void> addRole(Map<String, dynamic> role) async {
    showLoading();
    await _repository.addRole(role);
    hideLoading();
    await loadRoles();
  }

  Future<void> updateRole(String roleId, Map<String, dynamic> role) async {
    log("params to update role: $roleId, $role");
    showLoading();
    await _repository.updateRole(roleId, role);
    hideLoading();
    await loadRoles();
  }

  Future<void> deleteRole(String roleId) async {
    showLoading();
    await _repository.deleteRole(roleId);
    hideLoading();
    await loadRoles();
  }
}
