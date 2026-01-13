import 'package:farmora/providers/base_provider.dart';
import 'package:farmora/repo/general_sales/general_sales_repository.dart';
import 'package:flutter/material.dart';

class GeneralSalesProvider extends ChangeNotifier with BaseProvider {
  final GeneralSalesRepository _repository = GeneralSalesRepository();

  List _salesList = [];
  List get salesList => _salesList;

  Future<void> fetchSales({
    int? seasonId,
    String? startDate,
    String? endDate,
  }) async {
    setLoading(true);
    try {
      final response = await _repository.getSales(
        seasonId: seasonId,
        startDate: startDate,
        endDate: endDate,
      );
      if (response['status'] == 'success') {
        _salesList = response['data'] ?? [];
        notifyListeners();
        setError(null);
      } else {
        setError(response['message'] as String? ?? 'Failed to load sales');
        _salesList = [];
        notifyListeners();
      }
    } catch (e) {
      setError('Error loading sales: $e');
      _salesList = [];
      notifyListeners();
    } finally {
      setLoading(false);
    }
  }

  Future<bool> addSale(Map<String, dynamic> data) async {
    setLoading(true);
    try {
      final response = await _repository.createSale(data);
      if (response['status'] == 'success') {
        return true;
      } else {
        setValidationErrors(response['error'] ?? {});
        return false;
      }
    } catch (e) {
      setError('Error adding sale: $e');
      return false;
    } finally {
      setLoading(false);
    }
  }

  void clearSales() {
    _salesList = [];
    notifyListeners();
  }
}
