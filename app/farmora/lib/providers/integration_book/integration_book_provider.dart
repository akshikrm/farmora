import 'dart:developer';

import 'package:farmora/providers/base_provider.dart';
import 'package:farmora/repo/integration_book/integration_book_repository.dart';
import 'package:flutter/material.dart';

class IntegrationBookProvider extends ChangeNotifier with BaseProvider {
  final IntegrationBookRepository _repository = IntegrationBookRepository();

  List _creditItems = [];
  List _paidItems = [];
  List _integrationBookList = [];

  // Getters
  List get creditItems => _creditItems;
  List get paidItems => _paidItems;
  List get integrationBookList => _integrationBookList;


  // Fetch integration book entries
  Future<void> fetchIntegrationBookEntries({
    int? farmId,
    String? startDate,
    String? endDate,
  }) async {
    setLoading(true);
    try {
      final response = await _repository.getIntegrationBookEntries(
        farmId: farmId,
        startDate: startDate,
        endDate: endDate,
      );
      if (response['status'] == 'success') {
        final data = response['data'] as Map<String, dynamic>? ?? {};
        _creditItems = data['credit_items'] as List? ?? [];
        _paidItems = data['paid_items'] as List? ?? [];

        // Consolidate for generic views if needed
        _integrationBookList = [..._creditItems, ..._paidItems];

        notifyListeners();
        setError(null);
      } else {
        setError(response['message'] as String? ?? 'Failed to load entries');
        _creditItems = [];
        _paidItems = [];
        _integrationBookList = [];
        notifyListeners();
      }

    } catch (e) {
      setError('Error loading entries: $e');
      _integrationBookList = [];
      notifyListeners();
    } finally {
      setLoading(false);
    }
  }

  // Clear integration book list
  void clearIntegrationBookList() {
    _integrationBookList = [];
    _creditItems = [];
    _paidItems = [];
    notifyListeners();
  }


  // Add new integration book entry
  Future<bool> addIntegrationBookEntry(Map<String, dynamic> data) async {
    setLoading(true);
    try {
      final response = await _repository.createIntegrationBookEntry(data);
      log("response while adding integration book entry is $response");
      if (response['status'] == 'success') {
        // Optionally fetch the updated list if we maintain one
        // await fetchIntegrationBookEntries();
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
