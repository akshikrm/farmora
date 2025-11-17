import 'dart:developer';

import 'package:farmora/urls/urls.dart';
import 'package:farmora/utils/webService.dart';

class UsersRepository {
  WebService _webService = WebService();

  Future<Map<String, dynamic>> fetchUsers() async {
    try {
      final response = await _webService.get(Urls.users);
      return response;
    } catch (e) {
      return {};
    }
  }

  Future<Map<String, dynamic>> addUser(Map<String, dynamic> user) async {
    try {
      final response = await _webService.post(Urls.users, user);
      return response;
    } catch (e) {
      return {
        'status': 'error',
        'message': e.toString(),
      };
    }
  }

  Future<Map<String, dynamic>> updateUser(
      String userId, Map<String, dynamic> user) async {
    try {
      final response = await _webService.put('${Urls.users}/$userId', user);
      return response;
    } catch (e) {
      return {
        'status': 'error',
        'message': e.toString(),
      };
    }
  }

  Future<Map<String, dynamic>> deleteUser(String userId) async {
    try {
      final response = await _webService.delete('${Urls.users}/$userId');
      return response;
    } catch (e) {
      return {
        'status': 'error',
        'message': e.toString(),
      };
    }
  }

  Future<Map<String, dynamic>> fetchRoles() async {
    try {
      final response = await _webService.get(Urls.roles);
      return response;
    } catch (e) {
      return {};
    }
  }

  Future<Map<String, dynamic>> addRole(Map<String, dynamic> role) async {
    try {
      final response = await _webService.post(Urls.roles, role);
      return response;
    } catch (e) {
      return {
        'status': 'error',
        'message': e.toString(),
      };
    }
  }

  Future<Map<String, dynamic>> updateRole(
      String roleId, Map<String, dynamic> role) async {
    try {
      final response = await _webService.put('${Urls.roles}/$roleId', role);
      log("response from update role: $response");
      return response;
    } catch (e) {
      return {
        'status': 'error',
        'message': e.toString(),
      };
    }
  }

  Future<Map<String, dynamic>> deleteRole(String roleId) async {
    try {
      final response = await _webService.delete('${Urls.roles}/$roleId');
      return response;
    } catch (e) {
      return {
        'status': 'error',
        'message': e.toString(),
      };
    }
  }

  Future<Map<String, dynamic>> fetchPermissions() async {
    try {
      final response = await _webService.get(Urls.permissions);
      return response;
    } catch (e) {
      return {
        'status': 'error',
        'message': e.toString(),
      };
    }
  }

  Future<Map<String, dynamic>> addPermission(
      Map<String, dynamic> permission) async {
    try {
      final response = await _webService.post(Urls.permissions, permission);
      return response;
    } catch (e) {
      return {
        'status': 'error',
        'message': e.toString(),
      };
    }
  }

  Future<Map<String, dynamic>> updatePermission(
      String permissionId, Map<String, dynamic> permission) async {
    try {
      final response = await _webService.put(
          '${Urls.permissions}/$permissionId', permission);
      return response;
    } catch (e) {
      return {
        'status': 'error',
        'message': e.toString(),
      };
    }
  }

  Future<Map<String, dynamic>> deletePermission(String permissionId) async {
    try {
      final response =
          await _webService.delete('${Urls.permissions}/$permissionId');
      return response;
    } catch (e) {
      return {
        'status': 'error',
        'message': e.toString(),
      };
    }
  }
}
