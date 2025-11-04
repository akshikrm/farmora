import 'package:flutter/material.dart';
import 'package:internet_connection_listener/internet_connection_listener.dart'; // Import as needed

class SnackbarService {
  static DateTime? _lastSnackbarTime; // Store the last time a snackbar was shown
  static const Duration _throttleDuration = Duration(seconds: 3); // Throttle duration

  static void showSnackbar(String message, {Duration duration = const Duration(seconds: 2)}) {
    final context = NavigatorService.navigatorKey.currentContext;

    // Get the current time and compare it to the last snackbar time
    final currentTime = DateTime.now();

    // If the last snackbar time exists and the time difference is less than the throttle duration, return
    if (_lastSnackbarTime != null &&
        currentTime.difference(_lastSnackbarTime!) < _throttleDuration) {
      print("Snackbar is throttled. Please wait before showing another.");
      return;
    }

    // Update the last snackbar time to the current time
    _lastSnackbarTime = currentTime;

    // Show snackbar if context is available
    if (context != null) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(message),
          duration: duration,
        ),
      );
    } else {
      print("No context found for Snackbar.");
    }
  }
}
