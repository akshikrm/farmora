import 'package:farmora/urls/urls.dart';
import 'package:farmora/utils/webService.dart';

class DashboardRepository {
  final WebService _webService = WebService();

  Future<Map<String, dynamic>> fetchManagerDashboard() async {
    try {
      final response = await _webService.get(Urls.managerDashboard);
      return response;
    } catch (e) {
      return {'status': 'error', 'message': e.toString()};
    }
  }

  Future<Map<String, dynamic>> fetchAdminDashboard() async {
    try {
      final response = await _webService.get(Urls.adminDashboard);
      return response;
    } catch (e) {
      return {'status': 'error', 'message': e.toString()};
    }
  }
}
