import 'package:farmora/urls/urls.dart';
import 'package:farmora/utils/webService.dart';

class UsersRepository {
  WebService _webService = WebService();

  Future<List<Map<String, dynamic>>> fetchUsers() async {
    try {
      final response = await _webService.get(Urls.users);
      return response[""];
    } catch (e) {
      return [];
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

  Future<void> updateUser(Map<String, dynamic> user) async {
    // Update user in API or database
  }

  Future<void> deleteUser(String userId) async {
    // Delete user from API or database
  }
}
