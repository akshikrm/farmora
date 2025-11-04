import 'dart:async';
import 'dart:convert';
import 'dart:developer';
import 'dart:io';
import 'package:farmora/screens/authentication/loginPage.dart';
import 'package:farmora/urls/urls.dart';
import 'package:farmora/utils/headerManager.dart';
import 'package:farmora/utils/localStorage.dart';
import 'package:farmora/utils/navigationUtils.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:http/http.dart' as http;
import 'package:internet_connection_listener/internet_connection_listener.dart';

class WebService {

  /// ✅ Unified GET
  Future<Map<String, dynamic>> get(String endpoint) async {
    return _safeRequest(() async {
      final headers = await HeaderManager.getHeadersWithToken();
      return await http
          .get(Uri.parse('${Urls.baseUrl}$endpoint'), headers: headers)
          .timeout(const Duration(seconds: 15));
    });
  }

  /// ✅ Unified POST
  Future<Map<String, dynamic>> post(String endpoint, Map<String, dynamic> data) async {
    return _safeRequest(() async {
      final headers = await HeaderManager.getHeadersWithToken();
      return await http
          .post(Uri.parse('${Urls.baseUrl}$endpoint'),
              headers: headers, body: jsonEncode(data))
          .timeout(const Duration(seconds: 15));
    });
  }

  /// ✅ Unified PUT
  Future<Map<String, dynamic>> put(String endpoint, Map<String, dynamic> data) async {
    return _safeRequest(() async {
      final headers = await HeaderManager.getHeadersWithToken();
      return await http
          .put(Uri.parse('${Urls.baseUrl}$endpoint'),
              headers: headers, body: jsonEncode(data))
          .timeout(const Duration(seconds: 15));
    });
  }

  /// ✅ Unified DELETE
  Future<Map<String, dynamic>> delete(String endpoint) async {
    return _safeRequest(() async {
      final headers = await HeaderManager.getHeadersWithToken();
      return await http
          .delete(Uri.parse('${Urls.baseUrl}$endpoint'), headers: headers)
          .timeout(const Duration(seconds: 15));
    });
  }

  /// 🔒 Centralized Request Wrapper
  Future<Map<String, dynamic>> _safeRequest(
      Future<http.Response> Function() requestFunction) async {
    try {
      // 🔌 Check internet connection first
      

      final response = await requestFunction();

      log("➡️ Request URL: ${response.request?.url}");
      log("⬅️ Status Code: ${response.statusCode}");
      log("⬅️ Body: ${response.body}");

      // 🔐 Handle Unauthorized
      
      // ✅ Success (200 or 201)
      if (response.statusCode == 200 || response.statusCode == 201) {
        return _decodeResponse(response);
      }



      // ⚠️ For all other codes — show toast + return error
      final errorMsg = _extractMessage(response);
      _showToast(errorMsg);
      return _errorResponse(errorMsg);

    } on SocketException {
      _showToast("No internet connection. Please check your network.");
      return _errorResponse("No internet connection.");
    } on FormatException {
      _showToast("Invalid response format from server.");
      return _errorResponse("Invalid response format.");
    } on TimeoutException {
      _showToast("Request timed out. Please try again later.");
      return _errorResponse("Request timed out.");
    } catch (e, stack) {
      log("❌ Unexpected Error: $e\n$stack");
      _showToast("Something went wrong. Please try again.");
      return _errorResponse("Something went wrong.");
    }
  }

  /// 🔍 Decode response safely
  Map<String, dynamic> _decodeResponse(http.Response response) {
    try {
      final decoded = jsonDecode(utf8.decode(response.bodyBytes));
      if (decoded is Map<String, dynamic>) {
        return {
          "success": true,
          "data": decoded,
          "statusCode": response.statusCode,
        };
      } else {
        _showToast("Unexpected data format from server.");
        return _errorResponse("Unexpected data format.");
      }
    } catch (e) {
      _showToast("Failed to parse server response.");
      return _errorResponse("Failed to parse response.");
    }
  }

  /// 🔐 Handle 401
  void _handleUnauthorized() async {
    await SharedPreferenceHelper.clearData();
    NavigationUtils.navigateAndRemoveUntil(
        NavigatorService.navigatorKey.currentContext!, Loginpage());
    log("Session expired. Redirecting to login...");
  }

  /// ⚙️ Extract error message from either 'message' or 'error' field
  String _extractMessage(http.Response response) {
    try {
      final body = jsonDecode(utf8.decode(response.bodyBytes));
      return body["message"]?.toString() ?? 
             body["error"]?.toString() ?? 
             "Something went wrong.";
    } catch (_) {
      return response.body.isNotEmpty ? response.body : "Something went wrong.";
    }
  }

  /// ⚙️ Standard error response
  Map<String, dynamic> _errorResponse(String message) {
    return {
      "success": false,
      "message": message,
    };
  }

  /// ✅ Global Toast Helper
  void _showToast(String message) {
    if (message.trim().isEmpty) return;
    Fluttertoast.showToast(
      msg: message,
      toastLength: Toast.LENGTH_LONG,
      gravity: ToastGravity.BOTTOM,
    );
  }
}
