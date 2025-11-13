import 'dart:developer';

import 'package:farmora/screens/authentication/loginPage.dart';
import 'package:farmora/screens/authentication/new_login.dart';
import 'package:farmora/utils/colors.dart';
import 'package:farmora/utils/navigationUtils.dart';
import 'package:flutter/material.dart';
import 'package:introduction_screen/introduction_screen.dart';

class Introduction extends StatefulWidget {
  const Introduction({super.key});

  @override
  State<Introduction> createState() => _IntroductionState();
}

class _IntroductionState extends State<Introduction> {
  final _introKey = GlobalKey<IntroductionScreenState>();
  int page = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: IntroductionScreen(
          globalBackgroundColor: Colors.white,
          key: _introKey,
          showNextButton: true,
          showDoneButton: true,
          showSkipButton: true,
          skip: TextButton(
              onPressed: () {
                NavigationUtils.navigateTo(context, AuthenticationUI());
              },
              child: Text("Skip")),
          initialPage: page,
          overrideDone: TextButton(
              style: TextButton.styleFrom(
                foregroundColor: Colors.white, // Text color
                backgroundColor:
                    ColorUtils().primaryColor, // Button background color
                padding: EdgeInsets.symmetric(horizontal: 20, vertical: 12),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(8), // Rounded corners
                ),
              ),
              onPressed: () {
                NavigationUtils.navigateTo(context, AuthenticationUI());
              },
              child: Text("Done")),
          overrideNext: TextButton(
              style: TextButton.styleFrom(
                foregroundColor: Colors.white, // Text color
                backgroundColor:
                    ColorUtils().primaryColor, // Button background color
                padding: EdgeInsets.symmetric(horizontal: 20, vertical: 12),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(8), // Rounded corners
                ),
              ),
              onPressed: () {
                _introKey.currentState!.next();
              },
              child: Text("Next")),
          pages: [
            PageViewModel(
                title: 'Welcome to Farmora',
                image: Image.asset("assets/images/first.avif"),
                bodyWidget: Column(
                  children: [
                    Text(
                      "Providing farm-fresh, ethically raised chickens with the highest standards of care, ensuring quality, sustainability, and delicious poultry for your table.",
                      textAlign: TextAlign.center,
                    ),
                  ],
                )),
            PageViewModel(
                title: 'From Farm to Table',
                image: Image.asset("assets/images/second.avif"),
                bodyWidget: Column(
                  children: [
                    Text(
                      "We take pride in raising healthy, hormone-free chickens in a stress-free environment, delivering fresh and nutritious poultry products straight from our farm to your home.",
                      textAlign: TextAlign.center,
                    ),
                  ],
                )),
            PageViewModel(
                title: 'Sustainable Poultry, Trusted Quality',
                image: Image.asset("assets/images/third.avif"),
                bodyWidget: Column(
                  children: [
                    Text(
                      "With a commitment to responsible farming, we ensure every chicken is raised with care, following eco-friendly practices that prioritize animal welfare and customer satisfaction.",
                      textAlign: TextAlign.center,
                    ),
                  ],
                )),
          ],
        ),
      ),
    );
  }
}
