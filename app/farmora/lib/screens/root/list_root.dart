import 'package:farmora/utils/colors.dart';
import 'package:flutter/material.dart';

class ListRoot extends StatelessWidget {
  const ListRoot({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: ColorUtils().backgroundColor,
      appBar: AppBar(
        title: Text("Root Management",
            style: TextStyle(fontWeight: FontWeight.w600)),
        centerTitle: true,
        backgroundColor: ColorUtils().backgroundColor,
        elevation: 0,
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.account_tree,
                size: 80, color: ColorUtils().primaryColor.withOpacity(0.3)),
            SizedBox(height: 16),
            Text(
              "Root Management",
              style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                  color: ColorUtils().textColor),
            ),
            SizedBox(height: 8),
            Text(
              "Manage your root configurations here.",
              style: TextStyle(color: Colors.grey),
            ),
          ],
        ),
      ),
    );
  }
}
