import 'dart:developer';
import 'package:farmora/providers/base_provider.dart';
import 'package:farmora/repo/working_cost/working_cost_repository.dart';
import 'package:flutter/material.dart';

class WorkingCostProvider extends ChangeNotifier with BaseProvider {
  final WorkingCostRepository _repository = WorkingCostRepository();

  List _workingCostList = [];

  // Getters
  List get workingCostList => _workingCostList;

  // Fetch working cost entries
  Future<void> fetchWorkingCostEntries({
    int? seasonId,
    String? startDate,
    String? endDate,
  }) async {
    setLoading(true);
    try {
      final response = await _repository.getWorkingCostEntries(
        seasonId: seasonId,
        startDate: startDate,
        endDate: endDate,
      );
      if (response['status'] == 'success') {
        _workingCostList = response['data'] ?? [];
        notifyListeners();
        setError(null);
      } else {
        setError(response['message'] as String? ?? 'Failed to load entries');
        _workingCostList = [];
        notifyListeners();
      }
    } catch (e) {
      setError('Error loading entries: $e');
      _workingCostList = [];
      notifyListeners();
    } finally {
      setLoading(false);
    }
  }

  // Clear working cost list
  void clearWorkingCostList() {
    _workingCostList = [];
    notifyListeners();
  }

  // Add new working cost entry
  Future<bool> addWorkingCostEntry(Map<String, dynamic> data) async {
    setLoading(true);
    try {
      final response = await _repository.createWorkingCostEntry(data);
      log("response while adding working cost entry is $response");
      if (response['status'] == 'success') {
        // Optionally fetch the updated list or just return true
        // await fetchWorkingCostEntries();
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
