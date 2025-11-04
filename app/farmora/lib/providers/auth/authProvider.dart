import 'dart:convert';
import 'dart:developer';

import 'package:farmora/providers/packages/packageProvider.dart';
import 'package:farmora/repo/auth/authRepo.dart';
import 'package:farmora/screens/authentication/choosePackage.dart';
import 'package:farmora/screens/common/loadingIndicator.dart';
import 'package:farmora/screens/home/dashboard.dart';
import 'package:farmora/screens/packages/listPackages.dart';
import 'package:farmora/utils/customUtils.dart';
import 'package:farmora/utils/localStorage.dart';
import 'package:farmora/utils/navigationUtils.dart';
import 'package:farmora/utils/snackBarService.dart';
import 'package:flutter/material.dart';
import 'package:internet_connection_listener/internet_connection_listener.dart';
import 'package:provider/provider.dart';

class Authprovider with ChangeNotifier {
  login(username, password) async {
    showLoading();
    final response =
        await Authrepo().login({"username": username, "password": password});
    log("response from login: $response");
    hideLoading();
    if (response["success"] != false) {
      NavigationUtils.navigateAndRemoveUntil(
          NavigatorService.navigatorKey.currentContext!, Dashboard());
      await SharedPreferenceHelper.saveMapData("loginData", response);
      await SharedPreferenceHelper.saveData("token", response["data"]["data"]["token"]);
      SnackbarService.showSnackbar(
          "Logged In Successfully. Welcome back ${response["data"]["data"]["name"]}.");
    }
  }

  signUp(name, email) async {
    showLoading();
    final response = await Authrepo().signup({
      "name": name,
      "username": email,
      "user_type": 2,
      "status": 1,
      "parant_id": 0,
      "package_id": 1
    });
    hideLoading();
    SnackbarService.showSnackbar(response["message"]);

    if (response["status"] == true) {
      NavigatorService.navigatorKey.currentContext!
          .read<Packageprovider>()
          .fetchPackages(1);
      NavigationUtils.navigateTo(
          NavigatorService.navigatorKey.currentContext!, Choosepackage());
    }
  }
}
