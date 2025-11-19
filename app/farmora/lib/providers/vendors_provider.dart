import 'package:flutter/material.dart';
import '../repositories/vendors_repository.dart';

class VendorsProvider with ChangeNotifier {
  final List<Map<String, dynamic>> _vendors = [];
  final VendorsRepository _repository = VendorsRepository();

  List<Map<String, dynamic>> get vendors => [..._vendors];

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
      _vendors.addAll(
          List<Map<String, dynamic>>.from(vendorsData['data']['data']['data']));
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
}
