import 'package:farmora/urls/urls.dart';
import 'package:farmora/utils/webService.dart';

class BatchesRepository {
  final WebService _webService = WebService();

  Future<Map<String, dynamic>> getAllBatches() async {
    return await _webService.get(Urls.batches);
  }

  Future<Map<String, dynamic>> getBatchById(int id) async {
    return await _webService.get('${Urls.batches}/$id');
  }

  Future<Map<String, dynamic>> createBatch(Map<String, dynamic> batchData) async {
    return await _webService.post(Urls.batches, batchData);
  }

  Future<Map<String, dynamic>> updateBatch(int id, Map<String, dynamic> batchData) async {
    return await _webService.put('${Urls.batches}/$id', batchData);
  }

  Future<Map<String, dynamic>> deleteBatch(int id) async {
    return await _webService.delete('${Urls.batches}/$id');
  }
}
