import 'dart:developer';
import 'package:farmora/providers/base_provider.dart';
import 'package:farmora/repo/sales/sales_repository.dart';
import 'package:flutter/material.dart';

class SalesProvider extends ChangeNotifier with BaseProvider {
  final SalesRepository _repository = SalesRepository();

  List _salesList = [];

  // Getters
  List get salesList => _salesList;

  Map<String, dynamic>? _salesLedger;
  Map<String, dynamic>? get salesLedger => _salesLedger;

  Future<void> fetchSalesLedger({
    required int buyerId,
    String? startDate,
    String? endDate,
  }) async {
    setLoading(true);
    try {
      final response = await _repository.getSalesLedger(
        buyerId: buyerId,
        startDate: startDate,
        endDate: endDate,
      );
      if (response['status'] == 'success') {
        _salesLedger = response['data'];
        notifyListeners();
        setError(null);
      } else {
        setError(response['message'] as String? ?? 'Failed to load ledger');
        _salesLedger = null;
        notifyListeners();
      }
    } catch (e) {
      setError('Error loading ledger: $e');
      _salesLedger = null;
      notifyListeners();
    } finally {
      setLoading(false);
    }
  }

  // Fetch sales entries
  Future<void> fetchSalesEntries({
    int? seasonId,
    String? startDate,
    String? endDate,
  }) async {
    setLoading(true);
    try {
      final response = await _repository.getSalesEntries(
        seasonId: seasonId,
        startDate: startDate,
        endDate: endDate,
      );
      if (response['status'] == 'success') {
        _salesList = response['data']['data'] ?? [];
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

  // Clear sales list
  void clearSalesList() {
    _salesList = [];
    notifyListeners();
  }

  // Add new sales entry
  Future<bool> addSaleEntry(Map<String, dynamic> data) async {
    setLoading(true);
    try {
      final response = await _repository.createSaleEntry(data);
      log("response while adding sales entry is $response");
      if (response['status'] == 'success') {
        // Optionally fetch the updated list or just return true
        return true;
      } else {
        setValidationErrors(response['error'] ?? {});
        return false;
      }
    } catch (e) {
      setError('Error adding entry: $e');
      return false;
    } finally {
      setLoading(false);
    }
  }
}
