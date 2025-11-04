import 'dart:developer';

import 'package:farmora/repo/farms/farmsRepository.dart';
import 'package:flutter/material.dart';

class FarmsProvider extends ChangeNotifier {
  final FarmsRepository _repository = FarmsRepository();
  
  List _farms = [];
  bool _isLoading = false;
  String? _error;

  // Getters
  List get farms => _farms;
  bool get isLoading => _isLoading;
  String? get error => _error;

  // Load all farms
  Future<void> loadFarms() async {
    _setLoading(true);
    try {
      final response = await _repository.getAllFarms();
      if (response['success'] == true) {
            

        _farms = response['data']["data"]["data"] ;
         log("response from listing farms are ${_farms}");
        notifyListeners();
         
        _error = null;
      } else {
        _error = response['message'] as String? ?? 'Failed to load farms';
      }
    } catch (e) {
      _error = 'Error loading farms: $e';
    } finally {
      _setLoading(false);
    }
  }

  // Add new farm
  Future<bool> addFarm(Map<String, dynamic> farmData) async {
    _setLoading(true);
    try {
      final response = await _repository.createFarm(farmData);
      if (response['success'] == true) {
        await loadFarms(); // Refresh the list
        return true;
      } else {
        _error = response['message'] as String? ?? 'Failed to add farm';
        return false;
      }
    } catch (e) {
      _error = 'Error adding farm: $e';
      return false;
    } finally {
      _setLoading(false);
    }
  }

  // Update existing farm
  Future<bool> updateFarm(int id, Map<String, dynamic> farmData) async {
    _setLoading(true);
    try {
      final response = await _repository.updateFarm(id, farmData);
      if (response['success'] == true) {
        await loadFarms(); // Refresh the list
        return true;
      } else {
        _error = response['message'] as String? ?? 'Failed to update farm';
        return false;
      }
    } catch (e) {
      _error = 'Error updating farm: $e';
      return false;
    } finally {
      _setLoading(false);
    }
  }

  // Delete farm
  Future<bool> deleteFarm(int id) async {
    _setLoading(true);
    try {
      final response = await _repository.deleteFarm(id);
      if (response['success'] == true) {
        await loadFarms(); // Refresh the list
        return true;
      } else {
        _error = response['message'] as String? ?? 'Failed to delete farm';
        return false;
      }
    } catch (e) {
      _error = 'Error deleting farm: $e';
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