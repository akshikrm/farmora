import 'package:farmora/providers/auth/authProvider.dart';
import 'package:farmora/screens/authentication/choosePackage.dart';
import 'package:farmora/screens/authentication/signup.dart';
import 'package:farmora/screens/common/loadingIndicator.dart';
import 'package:farmora/utils/colors.dart';
import 'package:farmora/utils/customUtils.dart';
import 'package:farmora/utils/navigationUtils.dart';
import 'package:farmora/utils/snackBarService.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class Loginpage extends StatefulWidget {
  const Loginpage({super.key});

  @override
  State<Loginpage> createState() => _LoginpageState();
}

class _LoginpageState extends State<Loginpage> {
  TextEditingController usernameController = TextEditingController();
  TextEditingController passwordController = TextEditingController();

  String? usernameError;
  String? passwordError;

  void validateUsername(String value) {
    setState(() {
      if (value.isEmpty) {
        usernameError = "Username cannot be empty";
      } else if (value.length < 3) {
        usernameError = "Username must be at least 3 characters";
      } else {
        usernameError = null; // No error
      }
    });
  }

  void validatePassword(String value) {
    setState(() {
      if (value.isEmpty) {
        passwordError = "Password cannot be empty";
      } else if (value.length < 6) {
        passwordError = "Password must be at least 6 characters";
      } else {
        passwordError = null; // No error
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: Center(
          child: Padding(
            padding: const EdgeInsets.all(8.0),
            child: SingleChildScrollView(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  LoadingIndicator(),
                  AppIcon(),
                  SizedBox(
                    height: 30,
                  ),
                  Center(
                    child: Text(
                      "Log In",
                      style:
                          TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                    ),
                  ),
                  SizedBox(
                    height: 30,
                  ),
                  TextField(
                    controller: usernameController,
                    onChanged: validateUsername,
                    decoration: InputDecoration(
                      labelText: "Username",
                      // border: OutlineInputBorder(),
                      errorText: usernameError,
                    ),
                  ),
                  SizedBox(height: 16),
                  TextField(
                    controller: passwordController,
                    onChanged: validatePassword,
                    obscureText: true,
                    decoration: InputDecoration(
                      labelText: "Password",
                      // border: OutlineInputBorder(),
                      errorText: passwordError,
                    ),
                  ),
                  SizedBox(
                    height: 20,
                  ),
                  SizedBox(
                    width: MediaQuery.of(context).size.width / 2,
                    child: CustomButton(
                        text: "Log In",
                        onPressed: () {
                          checkLogin();
                        },
                        color: ColorUtils().primaryColor),
                  ),
                  SizedBox(
                    height: 10,
                  ),
                  InkWell(
                    onTap: (){
                      NavigationUtils.navigateTo(context, Signup());
                    },
                    child: Text(
                      "Don't have an account? Create account now",
                      // style: TextStyle(fontWeight: FontWeight.bold),
                    ),
                  )
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }


  checkLogin(){
    if(usernameController.text.isEmpty){
      SnackbarService.showSnackbar("Username cannot be empty");
    }
    else if(passwordController.text.isEmpty){
      SnackbarService.showSnackbar("Password cannot be empty");
    }
    else{
      context.read<Authprovider>().login(usernameController.text, passwordController.text);
    }
  }
}

class AppIcon extends StatelessWidget {
  const AppIcon({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      clipBehavior: Clip.antiAliasWithSaveLayer,
      borderRadius: BorderRadius.circular(10),
      child: Image.asset(
        "assets/images/logo.png",
        height: 150,
        width: 150,
      ),
    );
  }
}
