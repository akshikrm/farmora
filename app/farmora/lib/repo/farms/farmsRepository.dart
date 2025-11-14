import 'package:farmora/urls/urls.dart';
import 'package:farmora/utils/webService.dart';

class FarmsRepository {
  final WebService _webService = WebService();

  Future<Map<String, dynamic>> getAllFarms() async {
    return await _webService.get(Urls.farms);
  }

  Future<Map<String, dynamic>> getFarmById(int id) async {
    return await _webService.get('/farms/$id');
  }

  Future<Map<String, dynamic>> createFarm(Map<String, dynamic> farmData) async {
    return await _webService.post(Urls.farms, farmData);
  }

  Future<Map<String, dynamic>> updateFarm(int id, Map<String, dynamic> farmData) async {
    return await _webService.put(Urls.farms+"/$id", farmData);
  }

  Future<Map<String, dynamic>> deleteFarm(int id) async {
    return await _webService.delete('${Urls.farms}/$id');
  }
}