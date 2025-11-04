import 'package:flutter/material.dart';
import 'package:internet_connection_listener/internet_connection_listener.dart';
import 'navigationUtils.dart';

class SnackbarUtils {
  static void showSuccess(String message) {
    final context = NavigatorService.navigatorKey.currentContext;
    if (context != null) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(message),
          backgroundColor: Colors.green,
        ),
      );
    }
  }

  static void showError(String message) {
    final context = NavigatorService.navigatorKey.currentContext;
    if (context != null) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(message),
          backgroundColor: Colors.red,
        ),
      );
    }
  }

  static void showInfo(String message) {
    final context = NavigatorService.navigatorKey.currentContext;
    if (context != null) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(message),
        ),
      );
    }
  }
}