import 'dart:async';
import 'dart:convert';
import 'dart:developer';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:farmora/screens/authentication/new_login.dart';
import 'package:farmora/urls/urls.dart';
import 'package:farmora/utils/headerManager.dart';
import 'package:farmora/utils/localStorage.dart';
import 'package:farmora/utils/navigationUtils.dart';
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
  Future<Map<String, dynamic>> post(
      String endpoint, Map<String, dynamic> data) async {
    return _safeRequest(() async {
      final headers = await HeaderManager.getHeadersWithToken();
      return await http
          .post(Uri.parse('${Urls.baseUrl}$endpoint'),
              headers: headers, body: jsonEncode(data))
          .timeout(const Duration(seconds: 15));
    });
  }

  /// ✅ Unified PUT
  Future<Map<String, dynamic>> put(
      String endpoint, Map<String, dynamic> data) async {
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
      if (response.statusCode >= 200 && response.statusCode <= 299) {
        return _decodeResponse(response);
      }

      // ⚠️ For all other codes — show error toast + return error
      final errorMsg = _extractMessage(response);
      _showErrorToast(errorMsg, response.statusCode);
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
        NavigatorService.navigatorKey.currentContext!, AuthenticationUI());
    log("Session expired. Redirecting to login...");
  }

  String _extractMessage(http.Response response) {
    try {
      final body = jsonDecode(utf8.decode(response.bodyBytes));
      return body["message"]?.toString() ??
          body["error"]?.toString() ??
          body["errors"][0]?.toString() ??
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

  /// ✅ Global Toast Helper with Beautiful Snackbar
  void _showToast(String message) {
    if (message.trim().isEmpty) return;
    
    final context = NavigatorService.navigatorKey.currentContext;
    if (context == null) return;

    // Determine if it's an error or success based on message
    final isError = message.toLowerCase().contains('error') || 
                    message.toLowerCase().contains('failed') ||
                    message.toLowerCase().contains('no internet') ||
                    message.toLowerCase().contains('timeout');

    final backgroundColor = isError 
        ? const Color(0xFFEF4444)  // Red for errors
        : const Color(0xFF10B981); // Green for success
    
    final icon = isError ? Icons.error_outline : Icons.check_circle_outline;

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Row(
          children: [
            Icon(icon, color: Colors.white, size: 24),
            const SizedBox(width: 12),
            Expanded(
              child: Text(
                message,
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 14,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ),
          ],
        ),
        backgroundColor: backgroundColor,
        duration: const Duration(seconds: 3),
        behavior: SnackBarBehavior.floating,
        margin: const EdgeInsets.all(16),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(8),
        ),
        elevation: 4,
      ),
    );
  }

  /// ❌ Error Toast Helper with Status Code
  void _showErrorToast(String message, int statusCode) {
    if (message.trim().isEmpty) return;
    
    final context = NavigatorService.navigatorKey.currentContext;
    if (context == null) return;

    // Determine color based on status code
    Color backgroundColor;
    String statusText;

    if (statusCode >= 500) {
      // Server error (5xx) - Dark Red
      backgroundColor = const Color(0xFF991B1B);
      statusText = "Server Error ($statusCode)";
    } else if (statusCode >= 400) {
      // Client error (4xx) - Orange Red
      backgroundColor = const Color(0xFFDC2626);
      statusText = "Error ($statusCode)";
    } else {
      // Other errors - Red
      backgroundColor = const Color(0xFFEF4444);
      statusText = "Error";
    }

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Row(
          children: [
            const Icon(Icons.error_outline, color: Colors.white, size: 24),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    statusText,
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 12,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    message,
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 13,
                      fontWeight: FontWeight.w400,
                    ),
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                  ),
                ],
              ),
            ),
          ],
        ),
        backgroundColor: backgroundColor,
        duration: const Duration(seconds: 4),
        behavior: SnackBarBehavior.floating,
        margin: const EdgeInsets.all(16),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(8),
        ),
        elevation: 4,
      ),
    );
  }
}
