import 'dart:developer';

import 'package:farmora/providers/base_provider.dart';
import 'package:farmora/repo/batches/batchesRepository.dart';
import 'package:flutter/material.dart';

class BatchesProvider extends ChangeNotifier with BaseProvider {
  final BatchesRepository _repository = BatchesRepository();

  List _batches = [];

  // Getters
  List get batches => _batches;

  // Load all batches
  Future<void> loadBatches() async {
    setLoading(true);
    try {
      final response = await _repository.getAllBatches();
      if (response['status'] == 'success') {
        // Attempt to map into list similar to other providers
        _batches = List<Map<String, dynamic>>.from(response["data"]["data"]);
        log("response from listing batches are ${_batches}");
        setError(null);
        notifyListeners();
      } else {
        setError(response['message'] as String? ?? 'Failed to load batches');
      }
    } catch (e) {
      setError('Error loading batches: $e');
    } finally {
      setLoading(false);
    }
  }

  // Add new batch
  Future<bool> addBatch(Map<String, dynamic> batchData) async {
    setLoading(true);
    try {
      final response = await _repository.createBatch(batchData);
      if (response['status'] == 'success') {
        await loadBatches();
        return true;
      } else {
        if (response['error'] != null &&
            response['error'] is Map<String, dynamic>) {
          setValidationErrors(response['error']);
        }
        setError(response['message'] as String? ?? 'Failed to add batch');
        return false;
      }
    } catch (e) {
      setError('Error adding batch: $e');
      return false;
    } finally {
      setLoading(false);
    }
  }

  // Update existing batch
  Future<bool> updateBatch(int id, Map<String, dynamic> batchData) async {
    setLoading(true);
    try {
      final response = await _repository.updateBatch(id, batchData);
      if (response['success'] == true) {
        await loadBatches();
        return true;
      } else {
        if (response['error'] != null &&
            response['error'] is Map<String, dynamic>) {
          setValidationErrors(response['error']);
        }
        setError(response['message'] as String? ?? 'Failed to update batch');
        return false;
      }
    } catch (e) {
      setError('Error updating batch: $e');
      return false;
    } finally {
      setLoading(false);
    }
  }

  // Delete batch
  Future<bool> deleteBatch(int id) async {
    setLoading(true);
    try {
      final response = await _repository.deleteBatch(id);
      if (response['success'] == true) {
        await loadBatches();
        return true;
      } else {
        setError(response['message'] as String? ?? 'Failed to delete batch');
        return false;
      }
    } catch (e) {
      setError('Error deleting batch: $e');
      return false;
    } finally {
      setLoading(false);
    }
  }
}
