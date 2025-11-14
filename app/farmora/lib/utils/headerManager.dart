import 'dart:developer';

import 'package:shared_preferences/shared_preferences.dart';

class HeaderManager {
  // Default headers for all requests
  static Map<String, String> getDefaultHeaders() {
    return {
      'Content-Type': 'application/json',
    };
  }

  // Fetch token from SharedPreferences and return headers with the token
  static Future<Map<String, String>> getHeadersWithToken() async {
    final prefs = await SharedPreferences.getInstance();
    String? token = prefs.getString('token'); // Assuming the token is stored with this key

    // Set default headers and add token if available
    Map<String, String> headers = getDefaultHeaders();
    if (token != null) {
      headers['Authorization'] = 'Bearer $token';
    }
    log("headers: $headers");
    return headers;
  }
}
