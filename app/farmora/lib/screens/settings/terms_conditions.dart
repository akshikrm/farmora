import 'package:farmora/utils/colors.dart';
import 'package:flutter/material.dart';

class TermsConditionsPage extends StatelessWidget {
  const TermsConditionsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: ColorUtils().backgroundColor,
      appBar: AppBar(
        title: const Text("Terms & Conditions",
            style: TextStyle(fontWeight: FontWeight.w600)),
        centerTitle: true,
        backgroundColor: ColorUtils().backgroundColor,
        elevation: 0,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildLastUpdated("Last Updated: January 19, 2026"),
            const SizedBox(height: 24),
            _buildSection(
              "1. Acceptance of Terms",
              "By accessing or using Farmora, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use the application.",
            ),
            _buildSection(
              "2. User Accounts",
              "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.",
            ),
            _buildSection(
              "3. Use of the Services",
              "Farmora provides tools for farming management. You agree to use the application only for lawful purposes and in a way that does not infringe the rights of others or restrict their use and enjoyment of the app.",
            ),
            _buildSection(
              "4. Data Privacy & Accuracy",
              "Individual users are responsible for the accuracy of the data they input (batches, expenses, sales, etc.). While we strive to protect your data, Farmora is not liable for data loss due to user error or unforeseen technical failures.",
            ),
            _buildSection(
              "5. Limitation of Liability",
              "Farmora and its developers shall not be liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use the application or for the cost of procurement of substitute goods.",
            ),
            _buildSection(
              "6. Changes to Terms",
              "We reserve the right to modify these terms at any time. Your continued use of the app after any changes indicates your acceptance of the new terms.",
            ),
            _buildSection(
              "7. Contact Us",
              "If you have any questions about these Terms and Conditions, please contact us at legal@farmora.com.",
            ),
            const SizedBox(height: 40),
          ],
        ),
      ),
    );
  }

  Widget _buildLastUpdated(String text) {
    return Text(
      text,
      style: TextStyle(
        fontSize: 14,
        fontStyle: FontStyle.italic,
        color: Colors.grey.shade600,
      ),
    );
  }

  Widget _buildSection(String title, String content) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
              color: ColorUtils().textColor,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            content,
            style: TextStyle(
              fontSize: 14,
              height: 1.5,
              color: ColorUtils().textColor.withOpacity(0.8),
            ),
          ),
        ],
      ),
    );
  }
}
