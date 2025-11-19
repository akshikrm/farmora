import 'dart:developer';

import 'package:farmora/screens/authentication/loginPage.dart';
import 'package:farmora/screens/authentication/new_login.dart';
import 'package:farmora/utils/colors.dart';
import 'package:farmora/utils/navigationUtils.dart';
import 'package:flutter/material.dart';
import 'package:introduction_screen/introduction_screen.dart';
import 'package:provider/provider.dart';
import 'package:farmora/providers/theme_provider.dart';

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
    context.watch<ThemeProvider>();
    final pageDecoration = PageDecoration(
      titleTextStyle: TextStyle(
          fontSize: 28.0,
          fontWeight: FontWeight.w700,
          color: ColorUtils().primaryColor),
      bodyTextStyle:
          TextStyle(fontSize: 16.0, color: ColorUtils().textColor, height: 1.5),
      bodyPadding: EdgeInsets.fromLTRB(16.0, 0.0, 16.0, 16.0),
      pageColor: ColorUtils().backgroundColor,
      imagePadding: EdgeInsets.zero,
      imageFlex: 3,
      bodyFlex: 2,
    );

    return Scaffold(
      backgroundColor: ColorUtils().backgroundColor,
      body: SafeArea(
        child: IntroductionScreen(
          globalBackgroundColor: ColorUtils().backgroundColor,
          key: _introKey,
          showNextButton: true,
          showDoneButton: true,
          showSkipButton: true,
          skip: TextButton(
              onPressed: () {
                NavigationUtils.navigateTo(context, AuthenticationUI());
              },
              child:
                  Text("Skip", style: TextStyle(fontWeight: FontWeight.w600))),
          initialPage: page,
          dotsDecorator: DotsDecorator(
            size: const Size.square(10.0),
            activeSize: const Size(20.0, 10.0),
            activeColor: ColorUtils().primaryColor,
            color: Colors.black26,
            spacing: const EdgeInsets.symmetric(horizontal: 3.0),
            activeShape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(25.0)),
          ),
          overrideDone: ElevatedButton(
              style: ElevatedButton.styleFrom(
                backgroundColor: ColorUtils().primaryColor,
                foregroundColor: Colors.white,
                padding: EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(30),
                ),
                elevation: 4,
              ),
              onPressed: () {
                NavigationUtils.navigateTo(context, AuthenticationUI());
              },
              child: Text("Get Started")),
          overrideNext: ElevatedButton(
              style: ElevatedButton.styleFrom(
                backgroundColor: ColorUtils().primaryColor,
                foregroundColor: Colors.white,
                padding: EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(30),
                ),
                elevation: 4,
              ),
              onPressed: () {
                _introKey.currentState!.next();
              },
              child: Text("Next")),
          pages: [
            PageViewModel(
              title: 'Welcome to Farmora',
              image: Padding(
                padding: const EdgeInsets.all(20.0),
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(20),
                  child: Image.asset("assets/images/first.avif",
                      fit: BoxFit.cover),
                ),
              ),
              body:
                  "Providing farm-fresh, ethically raised chickens with the highest standards of care, ensuring quality, sustainability, and delicious poultry for your table.",
              decoration: pageDecoration,
            ),
            PageViewModel(
              title: 'From Farm to Table',
              image: Padding(
                padding: const EdgeInsets.all(20.0),
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(20),
                  child: Image.asset("assets/images/second.avif",
                      fit: BoxFit.cover),
                ),
              ),
              body:
                  "We take pride in raising healthy, hormone-free chickens in a stress-free environment, delivering fresh and nutritious poultry products straight from our farm to your home.",
              decoration: pageDecoration,
            ),
            PageViewModel(
              title: 'Sustainable & Trusted',
              image: Padding(
                padding: const EdgeInsets.all(20.0),
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(20),
                  child: Image.asset("assets/images/third.avif",
                      fit: BoxFit.cover),
                ),
              ),
              body:
                  "With a commitment to responsible farming, we ensure every chicken is raised with care, following eco-friendly practices that prioritize animal welfare and customer satisfaction.",
              decoration: pageDecoration,
            ),
          ],
        ),
      ),
    );
  }
}
