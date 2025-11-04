import 'dart:developer';

import 'package:flutter/material.dart';
import '../repositories/packages_repository.dart';

class PackagesProvider with ChangeNotifier {
  final PackagesRepository _repository = PackagesRepository();
  List<Map<String, dynamic>> _packages = [];

  List<Map<String, dynamic>> get packages => _packages;

  Future<void> loadPackages() async {
    final response = await _repository.fetchPackages();
    if (response['success'] == true) {
      _packages =
          List<Map<String, dynamic>>.from(response['data']['data']['data']);
    } else {
      // Handle error
      _packages = [];
    }
    notifyListeners();
  }

  Future<void> addPackage(Map<String, dynamic> package) async {
    await _repository.addPackage(package);
    await loadPackages();
  }

  Future<void> updatePackage(
      String packageId, Map<String, dynamic> package) async {
    await _repository.updatePackage(packageId, package);
    await loadPackages();
  }

  Future<void> deletePackage(String packageId) async {
    await _repository.deletePackage(packageId);
    await loadPackages();
  }
}
