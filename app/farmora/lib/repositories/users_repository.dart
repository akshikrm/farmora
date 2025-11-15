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
}
