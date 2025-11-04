import 'package:farmora/urls/urls.dart';
import 'package:farmora/utils/webService.dart';

class SeasonsRepository {
    final WebService _webService = WebService();

  Future<Map<String, dynamic>> getAllSeasons() async {
    try {
      final response = await _webService.get(Urls.seasons);
      return response;
    } catch (e) {
      return {
        'status': 'error',
        'message': e.toString(),
      };
    }
  }

  Future<Map<String, dynamic>> createSeason(Map<String, dynamic> seasonData) async {
    try {
      final response = await _webService.post(Urls.seasons, seasonData);
      return response;
    } catch (e) {
      return {
        'status': 'error',
        'message': e.toString(),
      };
    }
  }

  Future<Map<String, dynamic>> updateSeason(int id, Map<String, dynamic> seasonData) async {
    try {
      final response = await _webService.put('${Urls.seasons}/$id', seasonData);
      return response;
    } catch (e) {
      return {
        'status': 'error',
        'message': e.toString(),
      };
    }
  }

  Future<Map<String, dynamic>> deleteSeason(int id) async {
    try {
      final response = await _webService.delete('${Urls.seasons}/$id');
      return response;
    } catch (e) {
      return {
        'status': 'error',
        'message': e.toString(),
      };
    }
  }
}