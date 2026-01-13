import 'package:farmora/providers/base_provider.dart';
import 'package:farmora/repo/general_expenses/general_expenses_repository.dart';
import 'package:flutter/material.dart';

class GeneralExpensesProvider extends ChangeNotifier with BaseProvider {
  final GeneralExpensesRepository _repository = GeneralExpensesRepository();

  List _expensesList = [];
  List get expensesList => _expensesList;

  Future<void> fetchExpenses({
    int? seasonId,
    String? startDate,
    String? endDate,
  }) async {
    setLoading(true);
    try {
      final response = await _repository.getExpenses(
        seasonId: seasonId,
        startDate: startDate,
        endDate: endDate,
      );
      if (response['status'] == 'success') {
        _expensesList = response['data'] ?? [];
        notifyListeners();
        setError(null);
      } else {
        setError(response['message'] as String? ?? 'Failed to load expenses');
        _expensesList = [];
        notifyListeners();
      }
    } catch (e) {
      setError('Error loading expenses: $e');
      _expensesList = [];
      notifyListeners();
    } finally {
      setLoading(false);
    }
  }

  Future<bool> addExpense(Map<String, dynamic> data) async {
    setLoading(true);
    try {
      final response = await _repository.createExpense(data);
      if (response['status'] == 'success') {
        return true;
      } else {
        setValidationErrors(response['error'] ?? {});
        return false;
      }
    } catch (e) {
      setError('Error adding expense: $e');
      return false;
    } finally {
      setLoading(false);
    }
  }

  void clearExpenses() {
    _expensesList = [];
    notifyListeners();
  }
}
