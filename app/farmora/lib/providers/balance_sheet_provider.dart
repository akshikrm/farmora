import 'package:farmora/repo/balance_sheet_repository.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class BalanceSheetProvider with ChangeNotifier {
  final BalanceSheetRepository _repository = BalanceSheetRepository();

  Map<String, dynamic>? _balanceSheetData;
  bool _isLoading = false;
  String? _errorMessage;

  Map<String, dynamic>? get balanceSheetData => _balanceSheetData;
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;

  DateTime _fromDate = DateTime(DateTime.now().year, DateTime.now().month, 1);
  DateTime _toDate = DateTime.now();

  DateTime get fromDate => _fromDate;
  DateTime get toDate => _toDate;

  void setDates(DateTime from, DateTime to) {
    _fromDate = from;
    _toDate = to;
    fetchBalanceSheet();
  }

  Future<void> fetchBalanceSheet({String? purpose}) async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    final fromStr = DateFormat('yyyy-MM-dd').format(_fromDate);
    final toStr = DateFormat('yyyy-MM-dd').format(_toDate);

    try {
      final response = await _repository.getBalanceSheet(fromStr, toStr, purpose: purpose);
      if (response['status'] == 'success' || response.containsKey('data')) {
        _balanceSheetData = response['data'];
      } else {
        _errorMessage = response['message'] ?? 'Failed to load balance sheet';
      }
    } catch (e) {
      _errorMessage = e.toString();
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }
}
