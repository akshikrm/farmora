import 'dart:developer';

import 'package:farmora/urls/urls.dart';
import 'package:farmora/utils/webService.dart';

class IntegrationBookRepository {
  final WebService _webService = WebService();

  Future<Map<String, dynamic>> getIntegrationBookEntries({
    int? farmId,
    String? startDate,
    String? endDate,
  }) async {
    String queryString = '';
    List<String> params = [];

    if (farmId != null) params.add('farm_id=$farmId');
    if (startDate != null) params.add('start_date=$startDate');
    if (endDate != null) params.add('end_date=$endDate');

    if (params.isNotEmpty) {
      queryString = '?${params.join('&')}';
    }

    return await _webService.get('${Urls.integrationBook}$queryString');
  }

  Future<Map<String, dynamic>> createIntegrationBookEntry(
      Map<String, dynamic> data) async {
    log("data wehile adding integration book entry is $data");
    return await _webService.post(Urls.integrationBook, data);
  }
}
