import 'dart:developer';

import 'package:farmora/repo/package/packageRepo.dart';
import 'package:farmora/utils/customUtils.dart';
import 'package:farmora/utils/snackBarService.dart';
import 'package:flutter/material.dart';

class Packageprovider with ChangeNotifier {
  Map<String, dynamic> packages = {};
  Map<String, dynamic> packageDetails = {};
  bool loading = false;

  fetchPackages(page) async {
    loading = true;
    notifyListeners();

    if (page == 1) {
      packages = {}; // Reset only on first page
    }

    final data = await Packagerepo().fetchPackages(page);
    log("data is $data");
    packages = data["data"]["data"];
   
    loading = false;
    notifyListeners();
  }

  addPackage(name, description, price, duration) async {
    showLoading();
    var body = {
      "name": name,
      "description": description,
      "price": price,
      "duration": duration,
      "status": true
    };
    final response = await Packagerepo().addPackage(body);
    hideLoading();
    SnackbarService.showSnackbar(response["message"]);
  }

  editPackage(name, description, price, duration, id, status) async {
    if (packages["data"].length == 1) {
      if (status == false) {
        SnackbarService.showSnackbar("Cannot update package");
      }else{
         showLoading();
      var body = {
        "name": name,
        "description": description,
        "price": price,
        "duration": duration,
        "status": status
      };
      final response = await Packagerepo().editPackage(body, id);
      hideLoading();
      SnackbarService.showSnackbar(response["message"]);
      }
    } else {
      showLoading();
      var body = {
        "name": name,
        "description": description,
        "price": price,
        "duration": duration,
        "status": status
      };
      final response = await Packagerepo().editPackage(body, id);
      hideLoading();
      SnackbarService.showSnackbar(response["message"]);
    }
  }

  fetchPackageDetails(int id) async {
    showLoading();
    packageDetails.clear();
    notifyListeners();
    packageDetails = await Packagerepo().fetchPackageDetails(id);
    hideLoading();
    return packageDetails;
  }

  deletePackage(id) async {
    if (packages["data"].length == 1) {
      SnackbarService.showSnackbar("Cannot delete package");
    } else {
      showLoading();
      final response = await Packagerepo().deletePackage(id);
      SnackbarService.showSnackbar(response["message"]);
      hideLoading();
    }
  }
}
