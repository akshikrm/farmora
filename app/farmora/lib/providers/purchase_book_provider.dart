import 'package:farmora/providers/base_provider.dart';
import 'package:farmora/repositories/purchase_book_repository.dart';
import 'package:flutter/material.dart';

class PurchaseBookProvider extends ChangeNotifier with BaseProvider {
  final PurchaseBookRepository _repository = PurchaseBookRepository();
  List<Map<String, dynamic>> _purchaseBookList = [];

  List<Map<String, dynamic>> get purchaseBookList => [..._purchaseBookList];

  Future<void> fetchPurchaseBook({
    int? vendorId,
    String? startDate,
    String? endDate,
  }) async {
    setLoading(true);
    clearErrors();
    try {
      final response = await _repository.getPurchaseBook(
        vendorId: vendorId,
        startDate: startDate,
        endDate: endDate,
      );

      if (response['status'] == 'success') {
        _purchaseBookList = List<Map<String, dynamic>>.from(response['data']);
      } else {
        setError(response['message'] ?? 'Failed to fetch purchase book');
      }
    } catch (e) {
      setError(e.toString());
    } finally {
      setLoading(false);
      notifyListeners();
    }
  }

  clearPurchaseBookList() {
    _purchaseBookList.clear();
    notifyListeners();
  }
}
