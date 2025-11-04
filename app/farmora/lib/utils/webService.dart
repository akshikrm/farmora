import 'dart:convert';  // For UTF-8 decoding
import 'dart:developer';
import 'package:farmora/screens/authentication/loginPage.dart';
import 'package:farmora/utils/headerManager.dart';
import 'package:farmora/utils/localStorage.dart';
import 'package:farmora/utils/navigationUtils.dart';
import 'package:http/http.dart' as http;
import 'package:internet_connection_listener/internet_connection_listener.dart'; // Assuming you have this for navigation

class WebService {
  // Set the base URL directly in the class
  static const String baseUrl = 'https://api.farmora.in/';  // Replace with your base URL

  // GET request
  Future<Map<String, dynamic>?> get(String endpoint) async {
    try {
      // Get headers (with or without token)
      Map<String, String> headers = await HeaderManager.getHeadersWithToken();

      final response = await http.get(Uri.parse('$baseUrl$endpoint'), headers: headers);

      // Handle 401 Unauthorized
      if (response.statusCode == 401) {
        _handleUnauthorized();
        return null;
      }

      // Return other responses
      if (response.statusCode == 200) {
        return _decodeResponse(response);
      } else {
        print("Error: ${response.statusCode}");
        return null;
      }
    } catch (e) {
      print("Request failed: $e");
      return null;
    }
  }

  // POST request
  Future<Map<String, dynamic>?> post(String endpoint, Map<String, dynamic> data) async {
    try {
      // Get headers (with or without token)
      Map<String, String> headers = await HeaderManager.getHeadersWithToken();

      final response = await http.post(
        Uri.parse('$baseUrl$endpoint'),
        headers: headers,
        body: jsonEncode(data),
      );

      // Handle 401 Unauthorized
      // if (response.statusCode == 401) {
      //   _handleUnauthorized();
      //   return null;
      // }

      // Return other responses
     
        return _decodeResponse(response);
    
    } catch (e) {
      print("Request failed: $e");
      return null;
    }
  }

  // PUT request
  Future<Map<String, dynamic>?> put(String endpoint, Map<String, dynamic> data) async {
    try {
      // Get headers (with or without token)
      Map<String, String> headers = await HeaderManager.getHeadersWithToken();

      final response = await http.put(
        Uri.parse('$baseUrl$endpoint'),
        headers: headers,
        body: jsonEncode(data),
      );
      log("url is $baseUrl$endpoint");
      // Handle 401 Unauthorized
      if (response.statusCode == 401) {
        _handleUnauthorized();
        return null;
      }

      // Return other responses
      if (response.statusCode == 200) {
        return _decodeResponse(response);
      } else {
        print("Error: ${response.statusCode}");
        return null;
      }
    } catch (e) {
      print("Request failed: $e");
      return null;
    }
  }

  // DELETE request
  Future<Map<String, dynamic>?> delete(String endpoint) async {
    try {
      // Get headers (with or without token)
      Map<String, String> headers = await HeaderManager.getHeadersWithToken();

      final response = await http.delete(Uri.parse('$baseUrl$endpoint'), headers: headers);

      // Handle 401 Unauthorized
      if (response.statusCode == 401) {
        _handleUnauthorized();
        return null;
      }

      // Return other responses
      if (response.statusCode == 200) {
        return _decodeResponse(response);
      } else {
        print("Error: ${response.statusCode}");
        return null;
      }
    } catch (e) {
      print("Request failed: $e");
      return null;
    }
  }

  // Decode the response in UTF-8 format
  Map<String, dynamic>? _decodeResponse(http.Response response) {
    try {
      // Decode the response body in UTF-8 format and return as Map
      return jsonDecode(utf8.decode(response.bodyBytes));
    } catch (e) {
      print("Failed to decode response: $e");
      return null;
    }
  }

  // Handle Unauthorized (401) error
  void _handleUnauthorized() async {
    // Clear the authentication token from HeaderManager or SharedPreferences
    await SharedPreferenceHelper.clearData();

    // Navigate to the login screen (assuming you have a NavigatorService for navigation)
    NavigationUtils.navigateAndRemoveUntil(NavigatorService.navigatorKey.currentContext!, Loginpage());

    print("Session expired, user logged out. Redirecting to login.");
  }
}
