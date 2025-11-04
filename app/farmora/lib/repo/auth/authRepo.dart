import 'package:farmora/urls/urls.dart';
import 'package:farmora/utils/snackBarService.dart';
import 'package:farmora/utils/webService.dart';
import 'package:flutter/material.dart';

class Authrepo {
  Future<dynamic> login(credentials) async {
    final response = await WebService().post(Urls.loginUrl, credentials);
    debugPrint("login response is $response");
    if(response!["status"] == false){
      SnackbarService.showSnackbar(response["error"]);
    }
    return response;
  }


  Future<dynamic> signup(body) async {
    final response = await WebService().post(Urls.signUp, body);
    debugPrint("login response is $response");
    if(response!["status"] == false){
      SnackbarService.showSnackbar(response["error"]);
    }
    return response;
  }
}
