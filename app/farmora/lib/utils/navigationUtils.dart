import 'package:flutter/material.dart';

class NavigationUtils {
 static Future<dynamic> navigateTo(BuildContext context, Widget destination) {
  return Navigator.push(
    context,
    MaterialPageRoute(builder: (context) => destination),
  );
}

  static void navigateAndReplace(BuildContext context, Widget destination) {
    Navigator.pushReplacement(
      context,
      MaterialPageRoute(builder: (context) => destination),
    );
  }

  static void navigateAndRemoveUntil(BuildContext context, Widget destination) {
    Navigator.pushAndRemoveUntil(
      context,
      MaterialPageRoute(builder: (context) => destination),
      (route) => false, // Removes all previous routes
    );
  }

  static void goBack(BuildContext context) {
    if (Navigator.canPop(context)) {
      Navigator.pop(context);
    }
  }
}
