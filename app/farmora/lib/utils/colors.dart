import 'dart:ui';

import 'package:flutter/material.dart';

class ColorUtils {
  static bool isDark = false;

  // Light Theme Colors
  final Color _lightPrimaryColor = const Color(0xFF2E7D32);
  final Color _lightSecondaryColor = const Color(0xFF81C784);
  final Color _lightBlackColor = const Color(0xFF1A1A1A);
  final Color _lightWhiteColor = Colors.white;
  final Color _lightBottomNavIconColor = const Color(0xFF9E9E9E);
  final Color _lightTextColor = const Color(0xFF263238);
  final Color _lightCardColor = Colors.white;
  final Color _lightBackgroundColor = const Color(0xFFF4F7F6);
  final Color _lightErrorColor = const Color(0xFFD32F2F);
  final Color _lightSuccessColor = const Color(0xFF388E3C);

  // Dark Theme Colors
  final Color _darkPrimaryColor =
      const Color(0xFF4CAF50); // Brighter Green for Dark Mode
  final Color _darkSecondaryColor = const Color(0xFF81C784);
  final Color _darkBlackColor = Colors.white; // Inverted for text/icons on dark
  final Color _darkWhiteColor = const Color(0xFF1E1E1E); // Dark surface
  final Color _darkBottomNavIconColor = const Color(0xFFB0BEC5);
  final Color _darkTextColor = const Color(0xFFECEFF1); // Light Grey for text
  final Color _darkCardColor = const Color(0xFF263238); // Dark Blue Grey
  final Color _darkBackgroundColor = const Color(0xFF121212); // Almost black
  final Color _darkErrorColor = const Color(0xFFEF5350);
  final Color _darkSuccessColor = const Color(0xFF66BB6A);

  final Color _lightBottomNavBackgroundColor = Colors.white;
  final Color _darkBottomNavBackgroundColor =
      const Color(0xFF1E1E1E); // Dark surface for nav

  final Color _lightBottomNavUnselectedIconColor = Colors.grey;
  final Color _darkBottomNavUnselectedIconColor = Colors.white70;

  final Color _lightBottomNavSelectedIconColor = const Color(0xFF2E7D32);
  final Color _darkBottomNavSelectedIconColor = const Color(0xFF4CAF50);

  Color get primaryColor => isDark ? _darkPrimaryColor : _lightPrimaryColor;
  Color get secondaryColor =>
      isDark ? _darkSecondaryColor : _lightSecondaryColor;
  Color get blackColor => isDark ? _darkBlackColor : _lightBlackColor;
  Color get whiteColor => isDark ? _darkWhiteColor : _lightWhiteColor;
  Color get bottomNavIconColor => isDark
      ? _darkBottomNavIconColor
      : _lightBottomNavIconColor; // Deprecated/General use
  Color get bottomNavBackgroundColor =>
      isDark ? _darkBottomNavBackgroundColor : _lightBottomNavBackgroundColor;
  Color get bottomNavUnselectedIconColor => isDark
      ? _darkBottomNavUnselectedIconColor
      : _lightBottomNavUnselectedIconColor;
  Color get bottomNavSelectedIconColor => isDark
      ? _darkBottomNavSelectedIconColor
      : _lightBottomNavSelectedIconColor;
  Color get textColor => isDark ? _darkTextColor : _lightTextColor;
  Color get cardColor => isDark ? _darkCardColor : _lightCardColor;
  Color get backgroundColor =>
      isDark ? _darkBackgroundColor : _lightBackgroundColor;
  Color get errorColor => isDark ? _darkErrorColor : _lightErrorColor;
  Color get successColor => isDark ? _darkSuccessColor : _lightSuccessColor;
}
