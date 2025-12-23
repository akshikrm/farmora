import 'package:dot_curved_bottom_nav/dot_curved_bottom_nav.dart';

import 'package:farmora/screens/authentication/new_login.dart';
import 'package:farmora/screens/batches/listBatches.dart';
import 'package:farmora/screens/employees/list_employees.dart';
import 'package:farmora/screens/farms/listFarms.dart';
import 'package:farmora/screens/home/horizontalCard.dart';
import 'package:farmora/screens/home/horizontalSelector.dart';
import 'package:farmora/screens/home/transactionList.dart';
import 'package:farmora/screens/items/list_items.dart';
import 'package:farmora/screens/purchases/list_purchase.dart';
import 'package:farmora/screens/packages/list_packages.dart';
import 'package:farmora/screens/root/list_root.dart';
import 'package:farmora/screens/seasons/listSeasons.dart';
import 'package:farmora/screens/settings/settings_page.dart';
import 'package:farmora/screens/subscriptions/list_subscriptions.dart';
import 'package:farmora/screens/users/list_users.dart';
import 'package:farmora/screens/vendor/list_vendors.dart';
import 'package:farmora/screens/returns/list_returns.dart';
import 'package:farmora/screens/purchases/purchase_book.dart';
import 'package:farmora/screens/list_roles.dart';
import 'package:farmora/utils/colors.dart';
import 'package:farmora/utils/customUtils.dart';
import 'package:farmora/utils/localStorage.dart';
import 'package:farmora/utils/navigationUtils.dart';
import 'package:provider/provider.dart';
import 'package:farmora/providers/theme_provider.dart';
// import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';

class Dashboard extends StatefulWidget {
  const Dashboard({super.key});

  @override
  State<Dashboard> createState() => _DashboardState();
}

class _DashboardState extends State<Dashboard> {
  int _currentPage = 0;
  final ScrollController _scrollController = ScrollController();
  @override
  Widget build(BuildContext context) {
    context.watch<ThemeProvider>();
    return Scaffold(
      backgroundColor: ColorUtils().backgroundColor,
      drawer: Drawer(
        backgroundColor: ColorUtils().whiteColor,
        child: Column(
          children: [
            UserAccountsDrawerHeader(
              decoration: BoxDecoration(
                color: ColorUtils().primaryColor,
                image: DecorationImage(
                  image: AssetImage(
                      "assets/images/logo.png"), // Assuming this exists, or remove if not
                  fit: BoxFit.cover,
                  colorFilter: ColorFilter.mode(
                      ColorUtils().primaryColor.withOpacity(0.8),
                      BlendMode.srcOver),
                ),
              ),
              accountName: Text("Farmora User",
                  style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),
              accountEmail: Text("farmer@farmora.com",
                  style: TextStyle(color: Colors.white70)),
              currentAccountPicture: CircleAvatar(
                backgroundColor: Colors.white,
                child: Text("F",
                    style: TextStyle(
                        fontSize: 24, color: ColorUtils().primaryColor)),
              ),
            ),
            Expanded(
              child: ListView(
                padding: EdgeInsets.symmetric(vertical: 8),
                children: [
                  _buildDrawerItem(context, 'Employees', Icons.people,
                      onTap: () => NavigationUtils.navigateTo(
                          context, const ListUsers())),
                  _buildDrawerItem(context, 'Batch', Icons.batch_prediction,
                      onTap: () =>
                          NavigationUtils.navigateTo(context, ListBatches())),
                  _buildDrawerItem(
                    context,
                    'Farms',
                    Icons.agriculture,
                    onTap: () =>
                        NavigationUtils.navigateTo(context, const ListFarms()),
                  ),
                  _buildDrawerItem(context, 'Purchases', Icons.inventory,
                      onTap: () => NavigationUtils.navigateTo(
                          context, const ListPurchase())),
                  _buildDrawerItem(context, 'Items', Icons.inventory_2_outlined,
                      onTap: () => NavigationUtils.navigateTo(
                          context, const ListItems())),
                  _buildDrawerItem(context, 'Packages', Icons.inventory_2,
                      onTap: () =>
                          NavigationUtils.navigateTo(context, ListPackages())),
                  _buildDrawerItem(context, 'Root', Icons.account_tree,
                      onTap: () => NavigationUtils.navigateTo(
                          context, const ListRoot())),
                  _buildDrawerItem(context, 'Season', Icons.calendar_today,
                      onTap: () =>
                          NavigationUtils.navigateTo(context, ListSeasons())),
                  _buildDrawerItem(
                      context, 'Subscriptions', Icons.subscriptions,
                      onTap: () => NavigationUtils.navigateTo(
                          context, const ListSubscriptions())),
                  _buildDrawerItem(context, 'Vendor', Icons.store,
                      onTap: () => NavigationUtils.navigateTo(
                          context, const ListVendors())),
                  _buildDrawerItem(
                    context,
                    'Roles and Permissions',
                    Icons.security,
                    onTap: () =>
                        NavigationUtils.navigateTo(context, ListRolesPage()),
                  ),
                  _buildDrawerItem(
                    context,
                    'Returns',
                    Icons.assignment_return,
                    onTap: () => NavigationUtils.navigateTo(
                        context, const ListReturns()),
                  ),
                  _buildDrawerItem(
                    context,
                    'Purchase Book',
                    Icons.book_online,
                    onTap: () => NavigationUtils.navigateTo(
                        context, const PurchaseBook()),
                  ),
                  _buildDrawerItem(
                    context,
                    'Settings',
                    Icons.settings,
                    onTap: () => NavigationUtils.navigateTo(
                        context, const SettingsPage()),
                  ),
                  const Divider(),
                  _buildDrawerItem(
                    context,
                    'Logout',
                    Icons.logout,
                    onTap: () async {
                      showLoading();
                      await SharedPreferenceHelper.clearData();
                      hideLoading();
                      NavigationUtils.navigateAndRemoveUntil(
                          context, AuthenticationUI());
                    },
                    isDestructive: true,
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        title: Text("Dashboard",
            style: TextStyle(
                color: ColorUtils().textColor, fontWeight: FontWeight.w700)),
        centerTitle: false,
        actions: [
          Padding(
            padding: const EdgeInsets.only(right: 16.0),
            child: CircleAvatar(
              radius: 18,
              backgroundColor: ColorUtils().primaryColor.withOpacity(0.1),
              child: Icon(
                Icons.person,
                color: ColorUtils().primaryColor,
                size: 20,
              ),
            ),
          ),
        ],
      ),
      bottomNavigationBar: DotCurvedBottomNav(
        scrollController: _scrollController,
        hideOnScroll: true,
        indicatorColor: ColorUtils().primaryColor,
        backgroundColor: ColorUtils().bottomNavBackgroundColor,
        animationDuration: const Duration(milliseconds: 300),
        animationCurve: Curves.ease,
        selectedIndex: _currentPage,
        indicatorSize: 5,
        borderRadius: 25,
        height: 70,
        onTap: (index) {
          setState(() => _currentPage = index);
        },
        items: [
          Icon(
            Icons.home,
            color: _currentPage == 0
                ? ColorUtils().bottomNavSelectedIconColor
                : ColorUtils().bottomNavUnselectedIconColor,
          ),
          Icon(
            Icons.notification_add,
            color: _currentPage == 1
                ? ColorUtils().bottomNavSelectedIconColor
                : ColorUtils().bottomNavUnselectedIconColor,
          ),
          Icon(
            Icons.color_lens,
            color: _currentPage == 2
                ? ColorUtils().bottomNavSelectedIconColor
                : ColorUtils().bottomNavUnselectedIconColor,
          ),
          Icon(
            Icons.person,
            color: _currentPage == 3
                ? ColorUtils().bottomNavSelectedIconColor
                : ColorUtils().bottomNavUnselectedIconColor,
          ),
        ],
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Overview Section
            Padding(
              padding: const EdgeInsets.fromLTRB(16, 8, 16, 16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Overview',
                    style: TextStyle(
                        color: ColorUtils().textColor,
                        fontSize: 20,
                        fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 16),
                  HorizontalCard(),
                ],
              ),
            ),

            // Main Content Area with Rounded Top
            Container(
              width: double.infinity,
              decoration: BoxDecoration(
                color: ColorUtils().whiteColor,
                borderRadius: BorderRadius.only(
                  topLeft: Radius.circular(30),
                  topRight: Radius.circular(30),
                ),
                boxShadow: [
                  BoxShadow(
                    color: Colors.grey.withOpacity(0.05),
                    blurRadius: 10,
                    offset: Offset(0, -5),
                  ),
                ],
              ),
              child: Padding(
                padding: const EdgeInsets.all(20.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Quick Menus',
                      style: TextStyle(
                          color: ColorUtils().textColor,
                          fontSize: 18,
                          fontWeight: FontWeight.w700),
                    ),
                    const SizedBox(height: 16),
                    HorizontalSelector(
                      onSelected: (index) {
                        // Handle selection
                      },
                    ),
                    const SizedBox(height: 24),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          'Latest Transactions',
                          style: TextStyle(
                              color: ColorUtils().textColor,
                              fontSize: 18,
                              fontWeight: FontWeight.w700),
                        ),
                        TextButton(
                          onPressed: () {},
                          child: Text("View All",
                              style:
                                  TextStyle(color: ColorUtils().primaryColor)),
                        )
                      ],
                    ),
                    const SizedBox(height: 8),
                    TransactionList(),
                    const SizedBox(height: 80), // Bottom padding for nav bar
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildDrawerItem(
    BuildContext context,
    String title,
    IconData icon, {
    VoidCallback? onTap,
    bool isDestructive = false,
  }) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(12),
      ),
      child: ListTile(
        leading: Container(
          padding: EdgeInsets.all(8),
          decoration: BoxDecoration(
            color: isDestructive
                ? Colors.red.withOpacity(0.1)
                : ColorUtils().primaryColor.withOpacity(0.1),
            borderRadius: BorderRadius.circular(8),
          ),
          child: Icon(
            icon,
            color: isDestructive ? Colors.red : ColorUtils().primaryColor,
            size: 20,
          ),
        ),
        title: Text(
          title,
          style: TextStyle(
            fontSize: 15,
            fontWeight: FontWeight.w600,
            color: isDestructive ? Colors.red : ColorUtils().textColor,
          ),
        ),
        trailing: Icon(Icons.arrow_forward_ios,
            size: 14, color: Colors.grey.shade400),
        onTap: () {
          Navigator.pop(context); // Close drawer
          if (onTap != null) onTap();
        },
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
        visualDensity: VisualDensity.compact,
      ),
    );
  }
}
