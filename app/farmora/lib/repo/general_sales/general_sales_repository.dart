import 'package:farmora/urls/urls.dart';
import 'package:farmora/utils/webService.dart';
import 'dart:developer';

class GeneralSalesRepository {
  final WebService _webService = WebService();

  Future<Map<String, dynamic>> getSales({
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

    return await _webService.get('${Urls.generalSales}$queryString');
  }

  Future<Map<String, dynamic>> createSale(Map<String, dynamic> data) async {
    log("data while adding general sale is $data");
    return await _webService.post(Urls.generalSales, data);
  }
}
