import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';  // For JSON encoding and decoding

class SharedPreferenceHelper {
  // Save a Map (converted to a JSON string)
  static Future<bool> saveMapData(String key, Map<String, dynamic> value) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String jsonString = jsonEncode(value);  // Convert the Map to a JSON string
    return prefs.setString(key, jsonString);
  }

  // Retrieve a Map (decoded from a JSON string)
  static Future<Map<String, dynamic>?> getMapData(String key) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? jsonString = prefs.getString(key);
    if (jsonString != null) {
      return jsonDecode(jsonString);  // Decode the JSON string back to a Map
    }
    return null;  // Return null if no data is found
  }

  // Save data (String)
  static Future<bool> saveData(String key, String value) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.setString(key, value);
  }

  // Retrieve data (String)
  static Future<String?> getData(String key) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getString(key);
  }

  // Save an integer value
  static Future<bool> saveIntData(String key, int value) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.setInt(key, value);
  }

  // Retrieve an integer value
  static Future<int?> getIntData(String key) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getInt(key);
  }

  // Save a boolean value
  static Future<bool> saveBoolData(String key, bool value) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.setBool(key, value);
  }

  // Retrieve a boolean value
  static Future<bool?> getBoolData(String key) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getBool(key);
  }

  // Remove a key
  static Future<bool> removeData(String key) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.remove(key);
  }

  // Clear all data
  static Future<bool> clearData() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.clear();
  }
}
