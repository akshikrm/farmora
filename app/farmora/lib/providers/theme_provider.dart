import 'package:farmora/utils/colors.dart';

import 'package:flutter/material.dart';

class ThemeProvider extends ChangeNotifier {
  bool _isDark = false;

  bool get isDark => _isDark;

  ThemeProvider() {
    _loadTheme();
  }

  void _loadTheme() async {
    // You might need to implement a getBoolean in SharedPreferenceHelper or use a key
    // For now, assuming default is false.
    // If SharedPreferenceHelper doesn't have a simple get, we might need to add it.
    // Let's assume we can just toggle for now in memory, but ideally persist.
    // _isDark = await SharedPreferenceHelper.getBool('isDarkMode') ?? false;
    // ColorUtils.isDark = _isDark;
    // notifyListeners();
  }

  void toggleTheme() {
    _isDark = !_isDark;
    ColorUtils.isDark = _isDark;
    // SharedPreferenceHelper.setBool('isDarkMode', _isDark);
    notifyListeners();
  }
}
