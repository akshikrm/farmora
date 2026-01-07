import 'package:farmora/urls/urls.dart';
import 'package:farmora/utils/webService.dart';
import 'dart:developer';

class WorkingCostRepository {
  final WebService _webService = WebService();

  Future<Map<String, dynamic>> getWorkingCostEntries({
    int? seasonId,
    String? startDate,
    String? endDate,
  }) async {
    String queryString = '';
    List<String> params = [];

    if (seasonId != null) params.add('season_id=$seasonId');
    if (startDate != null) params.add('start_date=$startDate');
    if (endDate != null) params.add('end_date=$endDate');

    if (params.isNotEmpty) {
      queryString = '?${params.join('&')}';
    }

    return await _webService.get('${Urls.workingCost}$queryString');
  }

  Future<Map<String, dynamic>> createWorkingCostEntry(
      Map<String, dynamic> data) async {
    log("data while adding working cost entry is $data");
    return await _webService.post(Urls.workingCost, data);
  }
}
