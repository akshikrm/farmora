import 'package:farmora/urls/urls.dart';
import 'package:farmora/utils/webService.dart';

class BalanceSheetRepository {
  final WebService _webService = WebService();

  Future<Map<String, dynamic>> getBalanceSheet(String fromDate, String toDate,
      {String? purpose}) async {
    try {
      String url = '${Urls.balanceSheet}?from_date=$fromDate&to_date=$toDate';
      if (purpose != null && purpose.isNotEmpty) {
        url += '&purpose=$purpose';
      }
      final response = await _webService.get(url);
      return response;
    } catch (e) {
      return {
        'status': 'error',
        'message': e.toString(),
      };
    }
  }
}
