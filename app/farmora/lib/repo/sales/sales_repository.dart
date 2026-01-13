import 'package:farmora/urls/urls.dart';
import 'package:farmora/utils/webService.dart';
import 'dart:developer';

class SalesRepository {
  final WebService _webService = WebService();

  Future<Map<String, dynamic>> getSalesEntries({
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

    return await _webService.get('${Urls.sales}$queryString');
  }

  Future<Map<String, dynamic>> createSaleEntry(
      Map<String, dynamic> data) async {
    log("data while adding sales entry is $data");
    return await _webService.post(Urls.sales, data);
  }

  Future<Map<String, dynamic>> getSalesLedger({
    required int buyerId,
    String? startDate,
    String? endDate,
  }) async {
    String queryString = '?buyer_id=$buyerId';
    if (startDate != null) queryString += '&start_date=$startDate';
    if (endDate != null) queryString += '&end_date=$endDate';

    return await _webService.get('${Urls.sales}/ledger$queryString');
  }
}
