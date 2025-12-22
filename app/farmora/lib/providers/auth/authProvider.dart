import 'dart:convert';
import 'dart:developer';

import 'package:farmora/providers/packages/packageProvider.dart';
import 'package:farmora/repo/auth/authRepo.dart';
import 'package:farmora/screens/authentication/choosePackage.dart';
import 'package:farmora/screens/authentication/loginPage.dart';
import 'package:farmora/screens/authentication/new_login.dart';
import 'package:farmora/screens/common/loadingIndicator.dart';
import 'package:farmora/screens/common/successAlertDialog.dart';
import 'package:farmora/screens/home/dashboard.dart';
import 'package:farmora/utils/customUtils.dart';
import 'package:farmora/utils/localStorage.dart';
import 'package:farmora/utils/navigationUtils.dart';
import 'package:farmora/utils/snackBarService.dart';
import 'package:flutter/material.dart';
import 'package:internet_connection_listener/internet_connection_listener.dart';
import 'package:provider/provider.dart';

class Authprovider with ChangeNotifier {
  Map<String, dynamic> userBody = {};
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
      await SharedPreferenceHelper.saveData("token", response["data"]["token"]);
      SnackbarService.showSnackbar(
          "Logged In Successfully. Welcome back ${response["data"]["name"]}.");
    }
  }

  signUp(name, password, username) async {
    // showLoading();
    userBody.clear();
    Map<String, dynamic> body = {
      "name": name,
      "username": username,
      "status": 1,
      "password": password,
    };
    userBody = body;

    // final response = await Authrepo().signup(body);
    // hideLoading();
    // SnackbarService.showSnackbar(response["message"]);

    // if (response["success"] == true) {
    NavigatorService.navigatorKey.currentContext!
        .read<Packageprovider>()
        .fetchPackages(1);
    NavigationUtils.navigateTo(
        NavigatorService.navigatorKey.currentContext!, Choosepackage());
    // }
  }

  setSelectedPackageId(packageId) {
    userBody["package_id"] = packageId;
  }

  saveUserDetails() async {
    showLoading();
    final response = await Authrepo().signup(userBody);
    hideLoading();
    if (response["success"] == true) {
      showDialog(
        context: NavigatorService.navigatorKey.currentContext!,
        barrierDismissible: false,
        builder: (context) => SuccessAlertDialog(
          title: "Account Created Successfully!",
          subtitle: response["data"]["message"] ??
              "Welcome to Farmora. Your account is ready to use.",
          okayButtonText: "Continue",
          onOkay: () {
            NavigationUtils.navigateAndRemoveUntil(
              NavigatorService.navigatorKey.currentContext!,
              AuthenticationUI(),
            );
          },
        ),
      );
    }
  }
}
