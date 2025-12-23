import 'dart:developer';

import 'package:farmora/providers/base_provider.dart';
import 'package:flutter/material.dart';
import '../repositories/vendors_repository.dart';

class VendorsProvider extends ChangeNotifier with BaseProvider {
  final List<Map<String, dynamic>> _vendors = [];
  final List<Map<String, dynamic>> _vendorNames = [];
  final List<Map<String, dynamic>> _categoriesNames = [];
  final List<Map<String, dynamic>> _batchesNames = [];
  List<Map<String, dynamic>> _returns = [];
  final VendorsRepository _repository = VendorsRepository();

  List<Map<String, dynamic>> get vendors => [..._vendors];
  List<Map<String, dynamic>> get vendorNames => [..._vendorNames];
  List<Map<String, dynamic>> get categoriesNames => [..._categoriesNames];
  List<Map<String, dynamic>> get batchesNames => [..._batchesNames];
  List<Map<String, dynamic>> get returns => [..._returns];

  Future<bool> createReturn(Map<String, dynamic> returnData) async {
    setLoading(true);
    clearErrors();
    try {
      final response = await _repository.addReturn(returnData);
      if (response['status'] == 'success') {
        fetchReturns();
        return true;
      } else {
        if (response['error'] != null) {
          setValidationErrors(response['error']);
        } else {
          setError(response['message'] ?? 'Failed to create return');
        }
        return false;
      }
    } catch (e) {
      setError(e.toString());
      return false;
    } finally {
      setLoading(false);
    }
  }

  Future<bool> updateReturn(int id, Map<String, dynamic> returnData) async {
    setLoading(true);
    clearErrors();
    try {
      final response = await _repository.updateReturn(id, returnData);
      if (response['status'] == 'success') {
        fetchReturns();
        return true;
      } else {
        if (response['error'] != null) {
          setValidationErrors(response['error']);
        } else {
          setError(response['message'] ?? 'Failed to update return');
        }
        return false;
      }
    } catch (e) {
      setError(e.toString());
      return false;
    } finally {
      setLoading(false);
    }
  }

  Future<void> fetchReturns() async {
    try {
      final vendorsData = await _repository.listReturns();
      _returns.clear();
      _returns
          .addAll(List<Map<String, dynamic>>.from(vendorsData['data']['data']));
      log("Return sra e $vendorsData");
      notifyListeners();
    } catch (e) {
      throw Exception('Failed to fetch returns: $e');
    }
  }

  Future<void> addVendor(Map<String, dynamic> vendorData) async {
    try {
      await _repository.addVendor(vendorData);

      notifyListeners();
      fetchVendors();
    } catch (e) {
      throw Exception('Failed to add vendor: $e');
    }
  }

  Future<void> fetchVendors() async {
    try {
      final vendorsData = await _repository.listVendors();
      _vendors.clear();
      _vendors
          .addAll(List<Map<String, dynamic>>.from(vendorsData['data']['data']));
      notifyListeners();
    } catch (e) {
      throw Exception('Failed to fetch vendors: $e');
    }
  }

  Future<void> updateVendor(int id, Map<String, dynamic> vendorData) async {
    try {
      await _repository.updateVendor(id, vendorData);
      fetchVendors();
    } catch (e) {
      throw Exception('Failed to update vendor: $e');
    }
  }

  Future<void> deleteVendor(int id) async {
    try {
      await _repository.deleteVendor(id);
      fetchVendors();
    } catch (e) {
      throw Exception('Failed to delete vendor: $e');
    }
  }

  fetchVendorNames() async {
    try {
      final vendorsData = await _repository.listVendorsDropdown();
      log("vendorsData $vendorsData");
      _vendorNames.clear();
      _vendorNames.addAll(List<Map<String, dynamic>>.from(vendorsData['data']));
      notifyListeners();
    } catch (e) {
      throw Exception('Failed to fetch vendors: $e');
    }
  }

  fetchCategoriesNames() async {
    try {
      final categories = await _repository.listCategoriesDropdown();
      log("categories $categories");
      _categoriesNames.clear();
      _categoriesNames
          .addAll(List<Map<String, dynamic>>.from(categories['data']));
      notifyListeners();
    } catch (e) {
      throw Exception('Failed to fetch vendors: $e');
    }
  }

  fetchBatchesNames() async {
    try {
      final batches = await _repository.listBatchesDropdown();
      log("batches $batches");
      _batchesNames.clear();
      _batchesNames.addAll(List<Map<String, dynamic>>.from(batches['data']));
      notifyListeners();
    } catch (e) {
      throw Exception('Failed to fetch vendors: $e');
    }
  }
}
