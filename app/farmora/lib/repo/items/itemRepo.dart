import 'package:farmora/urls/urls.dart';
import 'package:farmora/utils/webService.dart';

class Itemrepo {
  WebService _webService = WebService();

  Future<Map<String, dynamic>> createItem(Map<String, dynamic> itemData) async {
    try {
      final response = await _webService.post(Urls.items, itemData);
      return response;
    } catch (e) {
      return {
        'status': 'error',
        'message': e.toString(),
      };
    }
  }

  Future<Map<String, dynamic>> createCategory(
      Map<String, dynamic> itemData) async {
    try {
      final response = await _webService.post(Urls.categoriesListing, itemData);
      return response;
    } catch (e) {
      return {
        'status': 'error',
        'message': e.toString(),
      };
    }
  }

  Future<Map<String, dynamic>> getAllItems(
      {Map<String, dynamic>? filters}) async {
    try {
      String url = Urls.items;
      if (filters != null && filters.isNotEmpty) {
        final queryParams = filters.entries
            .where((e) => e.value != null && e.value.toString().isNotEmpty)
            .map((e) => '${e.key}=${Uri.encodeComponent(e.value.toString())}')
            .join('&');
        if (queryParams.isNotEmpty) {
          url += '?$queryParams';
        }
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

  Future<Map<String, dynamic>> deleteItem(int id) async {
    try {
      final response = await _webService.delete('${Urls.items}/$id');
      return response;
    } catch (e) {
      return {
        'status': 'error',
        'message': e.toString(),
      };
    }
  }

  Future<Map<String, dynamic>> getCategories() async {
    try {
      final response = await _webService.get(Urls.categoriesListing);
      return response;
    } catch (e) {
      return {
        'status': 'error',
        'message': e.toString(),
      };
    }
  }

  Future<Map<String, dynamic>> getCategoriesNames() async {
    try {
      final response = await _webService.get(Urls.categoriesDropdown);
      return response;
    } catch (e) {
      return {
        'status': 'error',
        'message': e.toString(),
      };
    }
  }

  Future<Map<String, dynamic>> updateCategory(
      int id, Map<String, dynamic> itemData) async {
    try {
      final response =
          await _webService.put('${Urls.categoriesListing}/$id', itemData);
      return response;
    } catch (e) {
      return {
        'status': 'error',
        'message': e.toString(),
      };
    }
  }

  Future<Map<String, dynamic>> updateItem(
      int id, Map<String, dynamic> itemData) async {
    try {
      final response = await _webService.put('${Urls.items}/$id', itemData);
      return response;
    } catch (e) {
      return {
        'status': 'error',
        'message': e.toString(),
      };
    }
  }

  Future<Map<String, dynamic>> getInvoiceNumber() async {
    try {
      final response = await _webService.get(Urls.invoiceNumber);
      return response;
    } catch (e) {
      return {
        'status': 'error',
        'message': e.toString(),
      };
    }
  }

  Future<Map<String, dynamic>> getItemsByVendor(int vendorId) async {
    try {
      final response = await _webService.get('${Urls.itemsByVendor}$vendorId');
      return response;
    } catch (e) {
      return {
        'status': 'error',
        'message': e.toString(),
      };
    }
  }
}
