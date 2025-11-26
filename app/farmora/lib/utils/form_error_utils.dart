class FormErrorUtils {
  /// Extracts the error message for a specific field from the error map.
  /// Expected format: {"error": [{"field": "fieldName", "message": "Error message"}, ...]}
  static String? getErrorMessage(
      Map<String, dynamic> errors, String fieldName) {
    if (errors.containsKey("error") && errors["error"] is List) {
      final errorList = errors["error"] as List;
      for (var error in errorList) {
        if (error is Map && error["field"] == fieldName) {
          return error["message"]?.toString();
        }
      }
    }
    return null;
  }
}
