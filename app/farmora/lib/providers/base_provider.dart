import 'package:flutter/material.dart';

mixin BaseProvider on ChangeNotifier {
  bool _isLoading = false;
  String? _error;
  Map<String, dynamic> _validationErrors = {};

  bool get isLoading => _isLoading;
  String? get error => _error;
  Map<String, dynamic> get validationErrors => _validationErrors;

  void setLoading(bool loading) {
    _isLoading = loading;
    notifyListeners();
  }

  void setError(String? error) {
    _error = error;
    notifyListeners();
  }

  void setValidationErrors(Map<String, dynamic> errors) {
    _validationErrors = errors;
    notifyListeners();
  }

  void clearErrors() {
    _error = null;
    _validationErrors = {};
    notifyListeners();
  }
}
