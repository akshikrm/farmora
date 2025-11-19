import 'package:farmora/screens/authentication/introduction.dart';
import 'package:farmora/providers/theme_provider.dart';
import 'package:farmora/utils/colors.dart';
import 'package:farmora/utils/localStorage.dart';
import 'package:farmora/utils/navigationUtils.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class SettingsPage extends StatelessWidget {
  const SettingsPage({super.key});

  @override
  Widget build(BuildContext context) {
    context.watch<ThemeProvider>();
    return Scaffold(
      backgroundColor: ColorUtils().backgroundColor,
      appBar: AppBar(
        title: Text("Settings", style: TextStyle(fontWeight: FontWeight.w600)),
        centerTitle: true,
        backgroundColor: ColorUtils().backgroundColor,
        elevation: 0,
      ),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildSectionHeader("Account"),
            _buildSettingItem(context, "Profile", Icons.person_outline,
                onTap: () {}),
            _buildSettingItem(
                context, "Notifications", Icons.notifications_none,
                onTap: () {}),
            _buildSettingItem(context, "Privacy & Security", Icons.lock_outline,
                onTap: () {}),
            SizedBox(height: 24),
            _buildSectionHeader("App Settings"),
            _buildSettingItem(context, "Language", Icons.language,
                trailing: "English"),
            Consumer<ThemeProvider>(
              builder: (context, themeProvider, _) {
                return _buildSettingItem(
                  context,
                  "Theme",
                  themeProvider.isDark ? Icons.dark_mode : Icons.light_mode,
                  trailing: themeProvider.isDark ? "Dark" : "Light",
                  onTap: () {
                    themeProvider.toggleTheme();
                  },
                );
              },
            ),
            SizedBox(height: 24),
            _buildSectionHeader("Support"),
            _buildSettingItem(context, "Help & Support", Icons.help_outline,
                onTap: () {}),
            _buildSettingItem(context, "About Us", Icons.info_outline,
                onTap: () {}),
            _buildSettingItem(
                context, "Terms & Conditions", Icons.description_outlined,
                onTap: () {}),
            SizedBox(height: 32),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: () async {
                  // Logout logic
                  await SharedPreferenceHelper.clearData();
                  NavigationUtils.navigateAndRemoveUntil(
                      context, Introduction());
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.red.shade50,
                  foregroundColor: Colors.red,
                  elevation: 0,
                  padding: EdgeInsets.symmetric(vertical: 16),
                  shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12)),
                ),
                child: Text("Log Out",
                    style:
                        TextStyle(fontWeight: FontWeight.w600, fontSize: 16)),
              ),
            ),
            SizedBox(height: 24),
            Center(
              child: Text(
                "Version 1.0.0",
                style: TextStyle(color: Colors.grey, fontSize: 12),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSectionHeader(String title) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12.0, left: 4),
      child: Text(
        title,
        style: TextStyle(
          fontSize: 14,
          fontWeight: FontWeight.w600,
          color: ColorUtils().primaryColor,
          letterSpacing: 0.5,
        ),
      ),
    );
  }

  Widget _buildSettingItem(BuildContext context, String title, IconData icon,
      {VoidCallback? onTap, String? trailing}) {
    return Container(
      margin: EdgeInsets.only(bottom: 12),
      decoration: BoxDecoration(
        color: ColorUtils().cardColor,
        borderRadius: BorderRadius.circular(12),
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.05),
            blurRadius: 4,
            offset: Offset(0, 2),
          ),
        ],
      ),
      child: ListTile(
        onTap: onTap,
        leading: Container(
          padding: EdgeInsets.all(8),
          decoration: BoxDecoration(
            color: ColorUtils().backgroundColor,
            borderRadius: BorderRadius.circular(8),
          ),
          child: Icon(icon, color: ColorUtils().textColor, size: 20),
        ),
        title: Text(
          title,
          style: TextStyle(fontWeight: FontWeight.w500, fontSize: 15),
        ),
        trailing: trailing != null
            ? Text(trailing, style: TextStyle(color: Colors.grey, fontSize: 14))
            : Icon(Icons.arrow_forward_ios,
                size: 14, color: Colors.grey.shade400),
      ),
    );
  }
}
