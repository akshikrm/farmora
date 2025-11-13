import 'package:farmora/providers/auth/authProvider.dart';
import 'package:farmora/utils/colors.dart';
import 'package:farmora/utils/customUtils.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
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
      backgroundColor: Colors.white,
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(
            children: [
              SizedBox(
                height: 30,
              ),
              Container(
                height: 100,
                child: selectedIndex == 0
                    ? Text(
                        "Step into the Future\nFarmora",
                        textAlign: TextAlign.center,
                        style: TextStyle(fontSize: 24),
                      )
                    : Text(
                        "Create an account",
                        textAlign: TextAlign.center,
                        style: TextStyle(fontSize: 24),
                      ),
              ),
              SizedBox(height: 20),
              Container(
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    Expanded(
                      child: InkWell(
                        onTap: () {
                          selectedIndex = 0;
                          setState(() {});
                        },
                        child: Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: Container(
                            width: getWidth(context),
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(15),
                              color: selectedIndex == 0
                                  ? ColorUtils().primaryColor
                                  : Colors.transparent,
                            ),
                            child: Center(
                              child: Text(
                                "Login",
                                style: TextStyle(
                                    fontWeight: FontWeight.bold,
                                    color: selectedIndex == 0
                                        ? Colors.white
                                        : Colors.black),
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                    Expanded(
                      child: Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: InkWell(
                          onTap: () {
                            selectedIndex = 1;
                            setState(() {});
                          },
                          child: Container(
                            width: getWidth(context),
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(15),
                              color: selectedIndex == 1
                                  ? ColorUtils().primaryColor
                                  : Colors.transparent,
                            ),
                            child: Center(
                              child: Text(
                                "Register",
                                style: TextStyle(
                                    fontWeight: FontWeight.bold,
                                    color: selectedIndex == 1
                                        ? Colors.white
                                        : Colors.black),
                              ),
                            ),
                          ),
                        ),
                      ),
                    )
                  ],
                ),
                height: 60,
                width: getWidth(context) / 1.2,
                decoration: BoxDecoration(
                    color: Colors.grey.shade100,
                    borderRadius: BorderRadius.circular(20)),
              ),
              SizedBox(height: 18),
              // show login or register form depending on selectedIndex (no animation)
              selectedIndex == 0
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
                        // TODO: hook into registration logic
                        // print(
                        //     'Register submitted: $n / $u / ${p.length} chars');
                        await context.read<Authprovider>().signUp(n, p, u);
                      },
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
