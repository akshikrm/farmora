import 'dart:developer';

import 'package:farmora/repo/batches/batchesRepository.dart';
import 'package:flutter/material.dart';

class BatchesProvider extends ChangeNotifier {
  final BatchesRepository _repository = BatchesRepository();

  List _batches = [];
  bool _isLoading = false;
  String? _error;

  // Getters
  List get batches => _batches;
  bool get isLoading => _isLoading;
  String? get error => _error;

  // Load all batches
  Future<void> loadBatches() async {
    _setLoading(true);
    try {
      final response = await _repository.getAllBatches();
      if (response['success'] == true) {
        // Attempt to map into list similar to other providers
        _batches = List<Map<String, dynamic>>.from(response['data']["data"]["data"]);
        log("response from listing batches are ${_batches}");
        _error = null;
        notifyListeners();
      } else {
        _error = response['message'] as String? ?? 'Failed to load batches';
      }
    } catch (e) {
      _error = 'Error loading batches: $e';
    } finally {
      _setLoading(false);
    }
  }

  // Add new batch
  Future<bool> addBatch(Map<String, dynamic> batchData) async {
    _setLoading(true);
    try {
      final response = await _repository.createBatch(batchData);
      if (response['success'] == true) {
        await loadBatches();
        return true;
      } else {
        _error = response['message'] as String? ?? 'Failed to add batch';
        return false;
      }
    } catch (e) {
      _error = 'Error adding batch: $e';
      return false;
    } finally {
      _setLoading(false);
    }
  }

  // Update existing batch
  Future<bool> updateBatch(int id, Map<String, dynamic> batchData) async {
    _setLoading(true);
    try {
      final response = await _repository.updateBatch(id, batchData);
      if (response['success'] == true) {
        await loadBatches();
        return true;
      } else {
        _error = response['message'] as String? ?? 'Failed to update batch';
        return false;
      }
    } catch (e) {
      _error = 'Error updating batch: $e';
      return false;
    } finally {
      _setLoading(false);
    }
  }

  // Delete batch
  Future<bool> deleteBatch(int id) async {
    _setLoading(true);
    try {
      final response = await _repository.deleteBatch(id);
      if (response['success'] == true) {
        await loadBatches();
        return true;
      } else {
        _error = response['message'] as String? ?? 'Failed to delete batch';
        return false;
      }
    } catch (e) {
      _error = 'Error deleting batch: $e';
      return false;
    } finally {
      _setLoading(false);
    }
  }

  // Helper method to set loading state
  void _setLoading(bool loading) {
    _isLoading = loading;
    notifyListeners();
  }

  // Clear any error
  void clearError() {
    _error = null;
    notifyListeners();
  }
}
