import 'package:farmora/providers/auth/authProvider.dart';
import 'package:farmora/providers/base/baseProvider.dart';
import 'package:farmora/providers/farms/farmsProvider.dart';
import 'package:farmora/providers/items_provider.dart';
import 'package:farmora/providers/packages/packageProvider.dart';
import 'package:farmora/providers/packages_provider.dart';
import 'package:farmora/providers/seasons/seasonsProvider.dart';
import 'package:farmora/providers/batches/batchesProvider.dart';
import 'package:farmora/providers/users_provider.dart';
import 'package:farmora/providers/vendors_provider.dart';
import 'package:farmora/screens/authentication/introduction.dart';
import 'package:farmora/screens/home/dashboard.dart';
import 'package:farmora/screens/list_roles.dart';
import 'package:farmora/utils/colors.dart';
import 'package:farmora/utils/localStorage.dart';
import 'package:farmora/utils/navigationUtils.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:internet_connection_listener/internet_connection_listener.dart';
import 'package:provider/provider.dart';
import 'package:farmora/providers/theme_provider.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  @override
  void initState() {
    super.initState();
    Future.delayed(Duration(seconds: 0), () async {
      final loginData = await SharedPreferenceHelper.getMapData("loginData");
      debugPrint("login data is $loginData");
      if (loginData != null) {
        NavigationUtils.navigateAndRemoveUntil(
            NavigatorService.navigatorKey.currentContext!, Dashboard());
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => Authprovider()),
        ChangeNotifierProvider(create: (_) => BaseProvider()),
        ChangeNotifierProvider(create: (_) => Packageprovider()),
        ChangeNotifierProvider(create: (_) => FarmsProvider()),
        ChangeNotifierProvider(create: (_) => SeasonsProvider()),
        ChangeNotifierProvider(create: (_) => BatchesProvider()),
        ChangeNotifierProvider(create: (_) => PackagesProvider()),
        ChangeNotifierProvider(create: (_) => UsersProvider()),
        ChangeNotifierProvider(create: (_) => ThemeProvider()),
        ChangeNotifierProvider(create: (_) => VendorsProvider()),
        ChangeNotifierProvider(create: (_) => ItemsProvider()),
      ],
      child: Consumer<ThemeProvider>(
        builder: (context, themeProvider, child) {
          return MaterialApp(
            navigatorKey: NavigatorService.navigatorKey,
            title: 'Farmora',
            debugShowCheckedModeBanner: false,
            theme: ThemeData(
              scaffoldBackgroundColor: ColorUtils().backgroundColor,
              primaryColor: ColorUtils().primaryColor,
              elevatedButtonTheme: ElevatedButtonThemeData(
                style: ElevatedButton.styleFrom(
                  backgroundColor: ColorUtils().primaryColor,
                  foregroundColor: ColorUtils().whiteColor,
                  elevation: 4,
                  shadowColor: ColorUtils().primaryColor.withOpacity(0.4),
                  padding:
                      const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                  textStyle: GoogleFonts.poppins(
                    fontSize: 16,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
              textButtonTheme: TextButtonThemeData(
                style: TextButton.styleFrom(
                  foregroundColor: ColorUtils().primaryColor,
                  textStyle: GoogleFonts.poppins(
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
              appBarTheme: AppBarTheme(
                backgroundColor: ColorUtils().backgroundColor,
                foregroundColor: ColorUtils().textColor,
                elevation: 0,
                scrolledUnderElevation: 0,
                iconTheme: IconThemeData(color: ColorUtils().textColor),
                titleTextStyle: GoogleFonts.poppins(
                  color: ColorUtils().textColor,
                  fontSize: 20,
                  fontWeight: FontWeight.w600,
                ),
                centerTitle: true,
              ),
              cardTheme: CardThemeData(
                color: ColorUtils().cardColor,
                elevation: 2,
                shadowColor: Colors.black.withOpacity(0.05),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(16),
                ),
                margin: const EdgeInsets.symmetric(vertical: 8, horizontal: 4),
              ),
              inputDecorationTheme: InputDecorationTheme(
                filled: true,
                fillColor: ColorUtils().whiteColor,
                contentPadding:
                    const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                  borderSide: BorderSide.none,
                ),
                enabledBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                  borderSide: BorderSide(color: Colors.grey.withOpacity(0.2)),
                ),
                focusedBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                  borderSide:
                      BorderSide(color: ColorUtils().primaryColor, width: 1.5),
                ),
                errorBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                  borderSide: BorderSide(color: ColorUtils().errorColor),
                ),
              ),
              textTheme:
                  GoogleFonts.poppinsTextTheme(Theme.of(context).textTheme)
                      .apply(
                bodyColor: ColorUtils().textColor,
                displayColor: ColorUtils().textColor,
              ),
              primaryTextTheme: GoogleFonts.poppinsTextTheme(
                  Theme.of(context).primaryTextTheme),
              colorScheme: ColorScheme.fromSeed(
                seedColor: ColorUtils().primaryColor,
                primary: ColorUtils().primaryColor,
                secondary: ColorUtils().secondaryColor,
                surface: ColorUtils().backgroundColor,
                brightness:
                    themeProvider.isDark ? Brightness.dark : Brightness.light,
              ),
              useMaterial3: true,
            ),
            home: ConnectionListener(child: Introduction()),
          );
        },
      ),
    );
  }
}
