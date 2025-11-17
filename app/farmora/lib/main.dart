import 'package:farmora/providers/auth/authProvider.dart';
import 'package:farmora/providers/base/baseProvider.dart';
import 'package:farmora/providers/farms/farmsProvider.dart';
import 'package:farmora/providers/packages/packageProvider.dart';
import 'package:farmora/providers/packages_provider.dart';
import 'package:farmora/providers/seasons/seasonsProvider.dart';
import 'package:farmora/providers/batches/batchesProvider.dart';
import 'package:farmora/providers/users_provider.dart';
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
      ],
      child: MaterialApp(
        navigatorKey: NavigatorService.navigatorKey,
        title: 'Farmora',
        debugShowCheckedModeBanner: false,
        theme: ThemeData(
          elevatedButtonTheme: ElevatedButtonThemeData(
            style: ElevatedButton.styleFrom(
              backgroundColor: ColorUtils().primaryColor,
              foregroundColor: ColorUtils().whiteColor,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(8),
              ),
            ),
          ),
          // Apply Poppins globally using google_fonts
          textTheme: GoogleFonts.poppinsTextTheme(Theme.of(context).textTheme),
          primaryTextTheme:
              GoogleFonts.poppinsTextTheme(Theme.of(context).primaryTextTheme),
          textButtonTheme: TextButtonThemeData(style: ButtonStyle()),
          appBarTheme: AppBarTheme(
            backgroundColor: ColorUtils().whiteColor,
            foregroundColor: Colors.black,
            elevation: 0,
            titleTextStyle:
                GoogleFonts.poppins(color: Colors.black, fontSize: 20),
          ),
          colorScheme: ColorScheme.fromSeed(seedColor: ColorUtils().whiteColor),
          useMaterial3: true,
        ),
        home: ConnectionListener(child: Introduction()),
      ),
    );
  }
}
