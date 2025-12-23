import 'package:farmora/urls/urls.dart';
import 'package:farmora/utils/webService.dart';

class PurchaseBookRepository {
  final WebService _webService = WebService();

  Future<Map<String, dynamic>> getPurchaseBook({
    int? vendorId,
    String? startDate,
    String? endDate,
  }) async {
    final Map<String, dynamic> queryParams = {};
    if (vendorId != null) queryParams['vendor_id'] = vendorId.toString();
    if (startDate != null) queryParams['start_date'] = startDate;
    if (endDate != null) queryParams['end_date'] = endDate;

    // Use a helper method or construct URL with query params
    // Assuming WebService has a way to handle query params or we append them manually
    // If WebService.get doesn't take params, we append manually.
    // Let's verify WebService capability later, for now assuming manual append is safe or WebService handles it if passed.
    // However, looking at standard WebService implementations in Flutter, usually they take a path.
    // I will append query string manually to be safe.

    String url = Urls.purchaseBook;
    if (queryParams.isNotEmpty) {
      url += "?";
      queryParams.forEach((key, value) {
        url += "$key=$value&";
      });
      url = url.substring(0, url.length - 1); // Remove last &
    }

    return await _webService.get(url);
  }
}
