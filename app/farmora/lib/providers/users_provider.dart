import 'dart:developer';

import 'package:farmora/utils/customUtils.dart';
import 'package:flutter/material.dart';
import '../repositories/users_repository.dart';

class UsersProvider with ChangeNotifier {
  final UsersRepository _repository = UsersRepository();
  Map<String, dynamic> _users = {};

  Map<String, dynamic> get users => _users;

  Future<void> loadUsers() async {
    _users = await _repository.fetchUsers();
    notifyListeners();
    if (_users["success"] == false) {
      _users = {};
      notifyListeners();
    }
    log("users are $_users");
  }

  Future<void> addUser(Map<String, dynamic> user) async {
    showLoading();
    await _repository.addUser(user);
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
}
