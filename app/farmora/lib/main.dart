import 'package:farmora/providers/auth/authProvider.dart';
import 'package:farmora/providers/base/baseProvider.dart';
import 'package:farmora/providers/packages/packageProvider.dart';
import 'package:farmora/screens/authentication/introduction.dart';
import 'package:farmora/screens/home/dashboard.dart';
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
    Future.delayed(Duration(seconds: 0),()async{
      final loginData = await SharedPreferenceHelper.getMapData("loginData");
      debugPrint("login data is $loginData");
      if(loginData!=null){
        NavigationUtils.navigateAndRemoveUntil(NavigatorService.navigatorKey.currentContext!, Dashboard());
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
      ],
      child: MaterialApp(
        
        navigatorKey: NavigatorService.navigatorKey, // Set global navigator key
      
        title: 'Farmora',
        debugShowCheckedModeBanner: false,
        theme: ThemeData(
          textTheme: GoogleFonts.poppinsTextTheme(), // Apply Poppins globally
          colorScheme: ColorScheme.fromSeed(seedColor: Colors.orange),
          useMaterial3: true,
        ),
        home: ConnectionListener(child: Introduction()),
      ),
    );
  }
}
