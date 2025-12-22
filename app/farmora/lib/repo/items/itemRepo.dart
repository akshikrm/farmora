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

  Future<Map<String, dynamic>> getAllItems() async {
    try {
      final response = await _webService.get(Urls.items);
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
}
