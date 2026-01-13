import 'package:farmora/providers/auth/authProvider.dart';
import 'package:farmora/utils/colors.dart';
import 'package:farmora/utils/customUtils.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:farmora/providers/theme_provider.dart';
import 'login_form.dart';
import 'register_form.dart';

class AuthenticationUI extends StatefulWidget {
  const AuthenticationUI({super.key});

  @override
  State<AuthenticationUI> createState() => _AuthenticationUIState();
}

class _AuthenticationUIState extends State<AuthenticationUI> {
  int selectedIndex = 0;

  @override
  Widget build(BuildContext context) {
    context.watch<ThemeProvider>();
    return Scaffold(
      bottomNavigationBar: Container(
        height: 44,
        child: Center(
          child: Padding(
            padding: const EdgeInsets.symmetric(vertical: 12.0),
            child: Text(
              '© ${DateTime.now().year} Farmora',
              style: TextStyle(color: Colors.grey, fontSize: 12),
            ),
          ),
        ),
      ),
      backgroundColor: ColorUtils().whiteColor,
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(
            children: [
              SizedBox(
                height: 40,
              ),
              SizedBox(
                child: Image.asset(
                  'assets/images/logo.png',
                  height: 120,
                  width: 120,
                ),
              ),
              const SizedBox(height: 24),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 24),
                child: selectedIndex == 0
                    ? Text(
                        "Step into the Future\nFarmora",
                        textAlign: TextAlign.center,
                        style: TextStyle(
                            fontSize: 24,
                            fontWeight: FontWeight.bold,
                            color: ColorUtils().textColor),
                      )
                    : Text(
                        "Create an account",
                        textAlign: TextAlign.center,
                        style: TextStyle(
                            fontSize: 24,
                            fontWeight: FontWeight.bold,
                            color: ColorUtils().textColor),
                      ),
              ),
              SizedBox(height: 32),
              Container(
                height: 56,
                width: getWidth(context) * 0.85,
                padding: const EdgeInsets.all(4),
                decoration: BoxDecoration(
                    color: Colors.grey.shade200,
                    borderRadius: BorderRadius.circular(28)),
                child: Row(
                  children: [
                    Expanded(
                      child: GestureDetector(
                        onTap: () {
                          setState(() => selectedIndex = 0);
                        },
                        child: AnimatedContainer(
                          duration: const Duration(milliseconds: 200),
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(24),
                            color: selectedIndex == 0
                                ? ColorUtils().primaryColor
                                : Colors.transparent,
                            boxShadow: selectedIndex == 0
                                ? [
                                    BoxShadow(
                                      color: ColorUtils()
                                          .primaryColor
                                          .withOpacity(0.3),
                                      blurRadius: 8,
                                      offset: const Offset(0, 2),
                                    )
                                  ]
                                : null,
                          ),
                          child: Center(
                            child: Text(
                              "Login",
                              style: TextStyle(
                                  fontWeight: FontWeight.w600,
                                  fontSize: 16,
                                  color: selectedIndex == 0
                                      ? Colors.white
                                      : Colors.grey.shade600),
                            ),
                          ),
                        ),
                      ),
                    ),
                    Expanded(
                      child: GestureDetector(
                        onTap: () {
                          setState(() => selectedIndex = 1);
                        },
                        child: AnimatedContainer(
                          duration: const Duration(milliseconds: 200),
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(24),
                            color: selectedIndex == 1
                                ? ColorUtils().primaryColor
                                : Colors.transparent,
                            boxShadow: selectedIndex == 1
                                ? [
                                    BoxShadow(
                                      color: ColorUtils()
                                          .primaryColor
                                          .withOpacity(0.3),
                                      blurRadius: 8,
                                      offset: const Offset(0, 2),
                                    )
                                  ]
                                : null,
                          ),
                          child: Center(
                            child: Text(
                              "Register",
                              style: TextStyle(
                                  fontWeight: FontWeight.w600,
                                  fontSize: 16,
                                  color: selectedIndex == 1
                                      ? Colors.white
                                      : Colors.grey.shade600),
                            ),
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              SizedBox(height: 32),
              // show login or register form depending on selectedIndex (no animation)
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 24.0),
                child: selectedIndex == 0
                    ? LoginForm(
                        key: ValueKey('login'),
                        onSubmit: (u, p) {
                          // TODO: hook into real auth logic
                          // print('Login submitted: $u / ${p.length} chars');
                          context.read<Authprovider>().login(u, p);
                        },
                      )
                    : RegisterForm(
                        key: ValueKey('register'),
                        onSubmit: (n, u, p) async {
                          await context.read<Authprovider>().signUp(n, p, u);
                        },
                      ),
              ),
              SizedBox(height: 24),
              // copyright footer
            ],
          ),
        ),
      ),
    );
  }
}
