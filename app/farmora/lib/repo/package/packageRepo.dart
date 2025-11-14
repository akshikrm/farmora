import 'package:farmora/urls/urls.dart';
import 'package:farmora/utils/webService.dart';
import 'package:flutter/material.dart';

class Packagerepo {
  Future<Map<String, dynamic>> addPackage(body) async {
    final response = await WebService().post(Urls.packages, body);
    debugPrint("add package $response");
    return response!;
  }


  Future<Map<String, dynamic>> fetchPackages(page) async {
    final response = await WebService().get(Urls.packages+"?page=$page");
    debugPrint("fetch package $response");
    return response!;
  }


   Future<Map<String, dynamic>> fetchPackageDetails(id) async {
    final response = await WebService().get(Urls.packages+"/$id");
    debugPrint("fetch package $response");
    return response!;
  }

   Future<Map<String, dynamic>> editPackage(body,id) async {
    final response = await WebService().put(Urls.packages+"/$id", body);
    debugPrint("edit package $response");
    return response!;
  }


     Future<Map<String, dynamic>> deletePackage(id) async {
    final response = await WebService().delete(Urls.packages+"/$id");
    debugPrint("edit package $response");
    return response!;
  }
}
