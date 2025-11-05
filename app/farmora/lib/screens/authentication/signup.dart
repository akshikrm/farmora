import 'package:farmora/providers/auth/authProvider.dart';
import 'package:farmora/screens/authentication/loginPage.dart';
import 'package:farmora/screens/common/loadingIndicator.dart';
import 'package:farmora/utils/colors.dart';
import 'package:farmora/utils/customUtils.dart';
import 'package:farmora/utils/navigationUtils.dart';
import 'package:farmora/utils/snackBarService.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';

class Signup extends StatefulWidget {
  const Signup({super.key});

  @override
  State<Signup> createState() => _SignupState();
}

class _SignupState extends State<Signup> {
  TextEditingController nameController = TextEditingController();
  TextEditingController emailController = TextEditingController();
  TextEditingController passwordController = TextEditingController();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: ColorUtils().whiteColor,
      appBar: AppBar(),
      body: SizedBox(
        height: getHeight(context),
        width: getWidth(context),
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: SingleChildScrollView(
            child: Column(
              children: [
                AppIcon(),
                SizedBox(
                  height: 30,
                ),
                Center(
                  child: Text(
                    "Sign Up",
                    style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                  ),
                ),
                SizedBox(
                  height: 30,
                ),
                TextField(
                  controller: nameController,
                  decoration: InputDecoration(
                    labelText: "Name",
                    // border: OutlineInputBorder(),
                  ),
                ),
                SizedBox(height: 16),
                TextField(
                  controller: emailController,
                  inputFormatters: [
                    FilteringTextInputFormatter.deny(RegExp(r'\s')),
                    NoEmojiInputFormatter()
                    // Blocks spaces
                  ],
                  decoration: InputDecoration(
                    labelText: "Email ID",
                    // border: OutlineInputBorder(),
                  ),
                ),
                SizedBox(height: 16),
                
                TextField(
                  controller: passwordController,
                  obscureText: true,
                  decoration: InputDecoration(
                    labelText: "Password",
                    // border: OutlineInputBorder(),
                  ),
                ),
                SizedBox(height: 16),
                
                SizedBox(
                  width: MediaQuery.of(context).size.width / 2,
                  child: CustomButton(
                      text: "Sign Up",
                      onPressed: () {
                        checkSignUp();
                      },
                      color: ColorUtils().primaryColor),
                ),
                SizedBox(
                  height: 10,
                ),
                InkWell(
                  onTap: () {
                    NavigationUtils.navigateAndRemoveUntil(
                        context, Loginpage());
                  },
                  child: Text(
                    "Already have an account? Login Now",
                    // style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                )
              ],
            ),
          ),
        ),
      ),
    );
  }

  checkSignUp() async{
    if(nameController.text.isNotEmpty && emailController.text.isNotEmpty && passwordController.text.isNotEmpty
    ){
      await context.read<Authprovider>().signUp(nameController.text, emailController.text,passwordController.text);
      nameController.clear();
      emailController.clear();
      passwordController.clear();
    }else{
      SnackbarService.showSnackbar("Please fill out all the fields");
    }

  }
}
