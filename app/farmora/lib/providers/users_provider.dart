import 'package:farmora/utils/customUtils.dart';
import 'package:flutter/material.dart';
import '../repositories/users_repository.dart';

class UsersProvider with ChangeNotifier {
  final UsersRepository _repository = UsersRepository();
  List<Map<String, dynamic>> _users = [];

  List<Map<String, dynamic>> get users => _users;

  Future<void> loadUsers() async {
    _users = await _repository.fetchUsers();
    notifyListeners();
  }

  Future<void> addUser(Map<String, dynamic> user) async {
    showLoading();
    await _repository.addUser(user);
    hideLoading();
    await loadUsers();
  }

  Future<void> updateUser(Map<String, dynamic> user) async {
    await _repository.updateUser(user);
    await loadUsers();
  }

  Future<void> deleteUser(String userId) async {
    await _repository.deleteUser(userId);
    await loadUsers();
  }
}
