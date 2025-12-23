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

  Future<Map<String, dynamic>> listVendorsDropdown() async {
    return await _webService.get(Urls.vendorDropdown);
  }

  Future<Map<String, dynamic>> listCategoriesDropdown() async {
    return await _webService.get(Urls.categoriesDropdown);
  }

  Future<Map<String, dynamic>> listBatchesDropdown() async {
    return await _webService.get(Urls.batchesDropdown);
  }

  Future<Map<String, dynamic>> addReturn(
      Map<String, dynamic> returnData) async {
    return await _webService.post(Urls.itemReturns, returnData);
  }

  Future<Map<String, dynamic>> updateReturn(
      int id, Map<String, dynamic> returnData) async {
    return await _webService.put('${Urls.itemReturns}/$id', returnData);
  }

  Future<Map<String, dynamic>> listReturns() async {
    return await _webService.get(Urls.itemReturns);
  }
}
