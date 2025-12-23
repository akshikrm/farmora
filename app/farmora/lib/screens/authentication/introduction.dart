import 'dart:developer';

import 'package:farmora/screens/authentication/loginPage.dart';
import 'package:farmora/screens/authentication/new_login.dart';
import 'package:farmora/utils/colors.dart';
import 'package:farmora/utils/navigationUtils.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
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
      titleTextStyle: GoogleFonts.poppins(
          fontSize: 28.0,
          fontWeight: FontWeight.w700,
          color: ColorUtils().primaryColor),
      bodyTextStyle: GoogleFonts.poppins(
          fontSize: 16.0, color: ColorUtils().textColor, height: 1.5),
      bodyPadding: const EdgeInsets.fromLTRB(16.0, 0.0, 16.0, 16.0),
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
                NavigationUtils.navigateTo(context, const AuthenticationUI());
              },
              child: Text("Skip",
                  style: GoogleFonts.poppins(
                      fontWeight: FontWeight.w600,
                      color: ColorUtils().primaryColor))),
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
                padding:
                    const EdgeInsets.symmetric(horizontal: 32, vertical: 16),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(30),
                ),
                elevation: 0,
              ),
              onPressed: () {
                NavigationUtils.navigateTo(context, const AuthenticationUI());
              },
              child: Text("Get Started",
                  style: GoogleFonts.poppins(fontWeight: FontWeight.w600))),
          overrideNext: ElevatedButton(
              style: ElevatedButton.styleFrom(
                backgroundColor: ColorUtils().primaryColor,
                foregroundColor: Colors.white,
                padding:
                    const EdgeInsets.symmetric(horizontal: 32, vertical: 16),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(30),
                ),
                elevation: 0,
              ),
              onPressed: () {
                _introKey.currentState!.next();
              },
              child: Text("Next",
                  style: GoogleFonts.poppins(fontWeight: FontWeight.w600))),
          pages: [
            PageViewModel(
              title: 'Total Farm Control',
              decoration: pageDecoration,
              image: Padding(
                padding: const EdgeInsets.all(20.0),
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(20),
                  child: Image.asset("assets/images/first.avif",
                      fit: BoxFit.cover),
                ),
              ),
              body:
                  "Manage your entire farm operations from a single dashboard. Track roles, oversee users, and streamline daily tasks for maximum efficiency.",
            ),
            PageViewModel(
              title: 'Inventory & Seasons',
              image: Padding(
                padding: const EdgeInsets.all(20.0),
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(20),
                  child: Image.asset("assets/images/second.avif",
                      fit: BoxFit.cover),
                ),
              ),
              body:
                  "Keep precise track of your resources and crops. Manage seasonal cycles and inventory levels to ensure you never run out of essentials.",
              decoration: pageDecoration,
            ),
            PageViewModel(
              title: 'Smart Analytics',
              image: Padding(
                padding: const EdgeInsets.all(20.0),
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(20),
                  child: Image.asset("assets/images/third.avif",
                      fit: BoxFit.cover),
                ),
              ),
              body:
                  "Gain actionable insights with real-time data. Monitor growth, track performance, and make informed decisions to boost your yield.",
              decoration: pageDecoration,
            ),
          ],
        ),
      ),
    );
  }
}
