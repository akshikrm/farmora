import 'dart:developer';

import 'package:farmora/urls/urls.dart';
import 'package:farmora/utils/webService.dart';

class VendorsRepository {
  final WebService _webService = WebService();

  Future<Map<String, dynamic>> addVendor(
      Map<String, dynamic> vendorData) async {
    return await _webService.post(Urls.vendors, vendorData);
  }

  Future<Map<String, dynamic>> listVendors() async {
    return await _webService.get(Urls.vendors);
  }

  Future<Map<String, dynamic>> updateVendor(
      int id, Map<String, dynamic> vendorData) async {
    return await _webService.put('${Urls.vendors}/$id', vendorData);
  }

  Future<Map<String, dynamic>> deleteVendor(int id) async {
    final response = await _webService.delete('${Urls.vendors}/$id');
    log("response from delete api is $response");
    return response;
  }
}
