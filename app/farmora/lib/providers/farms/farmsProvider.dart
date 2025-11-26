import 'dart:developer';

import 'package:farmora/providers/base_provider.dart';
import 'package:farmora/repo/farms/farmsRepository.dart';
import 'package:flutter/material.dart';

class FarmsProvider extends ChangeNotifier with BaseProvider {
  final FarmsRepository _repository = FarmsRepository();

  List _farms = [];

  // Getters
  List get farms => _farms;

  // Load all farms
  Future<void> loadFarms() async {
    setLoading(true);
    try {
      final response = await _repository.getAllFarms();
      if (response['status'] == 'success') {
        _farms = response['data']["data"];
        log("response from listing farms are ${_farms}");
        notifyListeners();

        setError(null);
      } else {
        setError(response['message'] as String? ?? 'Failed to load farms');
      }
    } catch (e) {
      setError('Error loading farms: $e');
    } finally {
      setLoading(false);
    }
  }

  // Add new farm
  Future<bool> addFarm(Map<String, dynamic> farmData) async {
    setLoading(true);
    try {
      final response = await _repository.createFarm(farmData);
      log("add Farm  message is $response");

      if (response['status'] == 'success') {
        await loadFarms(); // Refresh the list
        return true;
      } else {
        setValidationErrors(response['error']);
        log("error message is $validationErrors");
        return false;
      }
    } catch (e) {
      setError('Error adding farm: $e');
      return false;
    } finally {
      setLoading(false);
    }
  }

  // Update existing farm
  Future<bool> updateFarm(int id, Map<String, dynamic> farmData) async {
    setLoading(true);
    try {
      final response = await _repository.updateFarm(id, farmData);
      if (response['success'] == true) {
        await loadFarms(); // Refresh the list
        return true;
      } else {
        setError(response['message'] as String? ?? 'Failed to update farm');
        return false;
      }
    } catch (e) {
      setError('Error updating farm: $e');
      return false;
    } finally {
      setLoading(false);
    }
  }

  // Delete farm
  Future<bool> deleteFarm(int id) async {
    setLoading(true);
    try {
      final response = await _repository.deleteFarm(id);
      if (response['success'] == true) {
        await loadFarms(); // Refresh the list
        return true;
      } else {
        setError(response['message'] as String? ?? 'Failed to delete farm');
        return false;
      }
    } catch (e) {
      setError('Error deleting farm: $e');
      return false;
    } finally {
      setLoading(false);
    }
  }
}
