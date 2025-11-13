import 'package:farmora/providers/auth/authProvider.dart';
import 'package:farmora/providers/packages/packageProvider.dart';
import 'package:farmora/screens/home/dashboard.dart';
import 'package:farmora/utils/colors.dart';
import 'package:farmora/utils/constants.dart';
import 'package:farmora/utils/customUtils.dart';
import 'package:farmora/utils/sizeutils.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:razorpay_flutter/razorpay_flutter.dart';
import 'package:fluttertoast/fluttertoast.dart';

class Choosepackage extends StatefulWidget {
  const Choosepackage({super.key});

  @override
  State<Choosepackage> createState() => _ChoosepackageState();
}

class _ChoosepackageState extends State<Choosepackage> {
  late Razorpay _razorpay;

  @override
  void initState() {
    super.initState();
    _razorpay = Razorpay();
    _razorpay.on(Razorpay.EVENT_PAYMENT_SUCCESS, _handlePaymentSuccess);
    _razorpay.on(Razorpay.EVENT_PAYMENT_ERROR, _handlePaymentError);
    _razorpay.on(Razorpay.EVENT_EXTERNAL_WALLET, _handleExternalWallet);
    Future.delayed(Duration(seconds: 0), () {
      context.read<Packageprovider>().fetchPackages(1);
    });
  }

  @override
  void dispose() {
    super.dispose();
    _razorpay.clear();
  }

  void _handlePaymentSuccess(PaymentSuccessResponse response) {
    Fluttertoast.showToast(
        msg: "Payment Successful: ${response.paymentId!}",
        toastLength: Toast.LENGTH_SHORT);
    // Navigate to success screen or dashboard
    context.read<Authprovider>().saveUserDetails();
  }

  void _handlePaymentError(PaymentFailureResponse response) {
    Fluttertoast.showToast(
        msg: "Payment Failed: ${response.message!}",
        toastLength: Toast.LENGTH_SHORT);
  }

  void _handleExternalWallet(ExternalWalletResponse response) {
    Fluttertoast.showToast(
        msg: "External Wallet: ${response.walletName!}",
        toastLength: Toast.LENGTH_SHORT);
  }

  void openCheckout(String packageName, int amount) async {
    var options = {
      'key': RAZORPAY_KEY,
      'amount': amount * 100, // Amount in paise
      'name': 'Farmora',
      'description': 'Payment for $packageName',
      'prefill': {'contact': '', 'email': ''},
      'external': {
        'wallets': ['paytm']
      }
    };

    try {
      _razorpay.open(options);
    } catch (e) {
      debugPrint('Error: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [
              ColorUtils().primaryColor.withOpacity(0.1),
              ColorUtils().whiteColor,
            ],
          ),
        ),
        child: Column(
          children: [
            AppBar(
              backgroundColor: Colors.transparent,
              elevation: 0,
              title: Text(
                "Choose package",
                style: TextStyle(
                  fontSize: appbarText,
                  color: ColorUtils().blackColor,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
            Expanded(
              child: SingleChildScrollView(
                child: Column(
                  children: [
                    // Package Section
                    Padding(
                      padding:
                          EdgeInsets.symmetric(horizontal: 16, vertical: 16),
                      child: Text(
                        "Available Packages",
                        style: TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                          color: ColorUtils().primaryColor,
                        ),
                      ),
                    ),
                    Consumer<Packageprovider>(builder: (context, provider, _) {
                      return !provider.loading
                          ? provider.packages["data"] != null &&
                                  provider.packages["data"].isNotEmpty
                              ? SizedBox(
                                  height: 320,
                                  child: ListView.builder(
                                    scrollDirection: Axis.horizontal,
                                    itemCount: provider.packages["data"].length,
                                    itemBuilder: (context, index) {
                                      var package =
                                          provider.packages["data"][index];
                                      String name =
                                          package["name"] ?? "Package Name";
                                      String capitalizedName = name.isNotEmpty
                                          ? name[0].toUpperCase() +
                                              name.substring(1)
                                          : name;
                                      return Card(
                                        margin:
                                            EdgeInsets.symmetric(horizontal: 8),
                                        elevation: 4,
                                        shape: RoundedRectangleBorder(
                                          borderRadius:
                                              BorderRadius.circular(12),
                                        ),
                                        child: Container(
                                          width: 250,
                                          child: Column(
                                            crossAxisAlignment:
                                                CrossAxisAlignment.start,
                                            children: [
                                              Expanded(
                                                child: Container(
                                                  height: 150,
                                                  decoration: BoxDecoration(
                                                    borderRadius:
                                                        BorderRadius.only(
                                                      topLeft:
                                                          Radius.circular(12),
                                                      topRight:
                                                          Radius.circular(12),
                                                    ),
                                                    image: DecorationImage(
                                                      image: NetworkImage(
                                                          'https://www.shutterstock.com/image-vector/sample-rubber-stamp-grunge-sign-600w-2497316609.jpg'), // Dummy network image
                                                      fit: BoxFit.cover,
                                                    ),
                                                  ),
                                                ),
                                              ),
                                              Padding(
                                                padding: EdgeInsets.all(12),
                                                child: Column(
                                                  crossAxisAlignment:
                                                      CrossAxisAlignment.start,
                                                  children: [
                                                    Text(
                                                      capitalizedName,
                                                      style: TextStyle(
                                                        fontSize: 16,
                                                        fontWeight:
                                                            FontWeight.bold,
                                                        color: ColorUtils()
                                                            .primaryColor,
                                                      ),
                                                    ),
                                                    SizedBox(height: 4),
                                                    Text(
                                                      package["description"] ??
                                                          "Description",
                                                      maxLines: 1,
                                                      style: TextStyle(
                                                        fontSize: 12,
                                                        overflow: TextOverflow
                                                            .ellipsis,
                                                        color: ColorUtils()
                                                            .textColor,
                                                      ),
                                                    ),
                                                    SizedBox(height: 8),
                                                    Row(
                                                      mainAxisAlignment:
                                                          MainAxisAlignment
                                                              .spaceBetween,
                                                      children: [
                                                        Text(
                                                          "$rupeeSymbol${package["price"] ?? "0"}",
                                                          style: TextStyle(
                                                            fontSize: 14,
                                                            fontWeight:
                                                                FontWeight.bold,
                                                            color: ColorUtils()
                                                                .primaryColor,
                                                          ),
                                                        ),
                                                        Text(
                                                          "Duration: ${package["duration"] ?? "N/A"} days",
                                                          style: TextStyle(
                                                            fontSize: 12,
                                                            color: ColorUtils()
                                                                .textColor,
                                                          ),
                                                        ),
                                                      ],
                                                    ),
                                                    SizedBox(height: 12),
                                                    ElevatedButton(
                                                      onPressed: () {
                                                        context
                                                            .read<
                                                                Authprovider>()
                                                            .setSelectedPackageId(
                                                                package["id"]);
                                                        int price = double
                                                                .parse(package[
                                                                        "price"]
                                                                    .toString())
                                                            .toInt();

                                                        String name =
                                                            package["name"] ??
                                                                "Package";
                                                        openCheckout(
                                                            name, price);
                                                      },
                                                      child: Text(
                                                          "Select Package"),
                                                      style: ElevatedButton
                                                          .styleFrom(
                                                        minimumSize: Size(
                                                            double.infinity,
                                                            36),
                                                      ),
                                                    ),
                                                  ],
                                                ),
                                              ),
                                            ],
                                          ),
                                        ),
                                      );
                                    },
                                  ),
                                )
                              : Center(
                                  child: Text(
                                    "No packages available",
                                    style: TextStyle(
                                        fontSize: 16,
                                        color: ColorUtils().textColor),
                                  ),
                                )
                          : Center(child: CircularProgressIndicator());
                    }),
                    // Payment Methods Section
                    Padding(
                      padding:
                          EdgeInsets.symmetric(horizontal: 16, vertical: 16),
                      child: Text(
                        "Available Payment Methods",
                        style: TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                          color: ColorUtils().primaryColor,
                        ),
                      ),
                    ),
                    Card(
                      margin: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                      elevation: 4,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Padding(
                        padding: EdgeInsets.all(16),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            ListTile(
                              leading: Icon(Icons.credit_card,
                                  color: ColorUtils().primaryColor),
                              title: Text("Credit/Debit Card"),
                              subtitle: Text("Pay securely with your card"),
                            ),
                            Divider(),
                            ListTile(
                              leading: Icon(Icons.account_balance_wallet,
                                  color: ColorUtils().primaryColor),
                              title: Text("UPI"),
                              subtitle: Text("Instant payment via UPI"),
                            ),
                            Divider(),
                            ListTile(
                              leading: Icon(Icons.account_balance,
                                  color: ColorUtils().primaryColor),
                              title: Text("Net Banking"),
                              subtitle: Text("Pay through your bank account"),
                            ),
                            Divider(),
                            ListTile(
                              leading: Icon(Icons.money,
                                  color: ColorUtils().primaryColor),
                              title: Text("Cash on Delivery"),
                              subtitle: Text("Pay when you receive"),
                            ),
                          ],
                        ),
                      ),
                    ),
                    // Summary Section
                    Padding(
                      padding:
                          EdgeInsets.symmetric(horizontal: 16, vertical: 16),
                      child: Text(
                        "Package Summary",
                        style: TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                          color: ColorUtils().primaryColor,
                        ),
                      ),
                    ),
                    SizedBox(
                      width: getWidth(context),
                      child: Card(
                        margin:
                            EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                        elevation: 4,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: Padding(
                          padding: EdgeInsets.all(16),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                "Why Choose Our Packages?",
                                style: TextStyle(
                                  fontSize: 18,
                                  fontWeight: FontWeight.bold,
                                  color: ColorUtils().primaryColor,
                                ),
                              ),
                              SizedBox(height: 12),
                              Text(
                                "• Comprehensive farm management tools\n• Real-time data tracking\n• Expert support and guidance\n• Secure and reliable platform\n• Affordable pricing plans",
                                style: TextStyle(
                                  fontSize: 14,
                                  color: ColorUtils().textColor,
                                  height: 1.5,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                    SizedBox(height: 20),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
