import 'package:farmora/urls/urls.dart';
import 'package:farmora/utils/webService.dart';

class PackagesRepository {
  WebService _webService = WebService();
  Future<Map<String, dynamic>> fetchPackages() async {
    // Fetch packages from API or database
    try {
      final response = await _webService.get(Urls.packages);
      return response;
    } catch (e) {
      return {
        'status': 'error',
        'message': e.toString(),
      };
    }
  }

  Future<Map<String, dynamic>> addPackage(Map<String, dynamic> package) async {
    // Add package to API or database

    try {
      final response = await _webService.post(Urls.packages, package);
      return response;
    } catch (e) {
      return {
        'status': 'error',
        'message': e.toString(),
      };
    }
  }

  Future<Map<String, dynamic>> updatePackage(
      String packageId, Map<String, dynamic> package) async {
    // Update package in API or database
    try {
      final response =
          await _webService.put('${Urls.packages}/$packageId', package);
      return response;
    } catch (e) {
      return {
        'status': 'error',
        'message': e.toString(),
      };
    }
  }

  Future<Map<String, dynamic>> deletePackage(String packageId) async {
    // Delete package from API or database
    try {
      final response = await _webService.delete('${Urls.packages}/$packageId');
      return response;
    } catch (e) {
      return {
        'status': 'error',
        'message': e.toString(),
      };
    }
  }
}
