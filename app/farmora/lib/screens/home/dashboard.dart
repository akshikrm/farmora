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
import 'package:farmora/screens/seasons/listSeasons.dart';
import 'package:farmora/screens/settings/settings_page.dart';
import 'package:farmora/screens/users/list_users.dart';
import 'package:farmora/screens/vendor/list_vendors.dart';
import 'package:farmora/screens/returns/list_returns.dart';
import 'package:farmora/screens/purchases/purchase_book.dart';
import 'package:farmora/screens/integration_book/integration_book_listing.dart';
import 'package:farmora/screens/working_cost/working_cost_listing.dart';
import 'package:farmora/screens/sales/sales_listing.dart';
import 'package:farmora/screens/sales/sales_book.dart';
import 'package:farmora/screens/general_expenses/general_expenses_listing.dart';
import 'package:farmora/screens/general_sales/general_sales_listing.dart';
import 'package:farmora/screens/list_roles.dart';
import 'package:farmora/utils/colors.dart';
import 'package:farmora/utils/customUtils.dart';
import 'package:farmora/utils/localStorage.dart';
import 'package:farmora/utils/navigationUtils.dart';
import 'package:provider/provider.dart';
import 'package:farmora/providers/theme_provider.dart';
import 'package:farmora/providers/users_provider.dart';
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
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      // Provider.of<UsersProvider>(context, listen: false).loadUsers();
    });
  }

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
                  // Expenses Group
                  _buildExpansionTile(
                    context,
                    title: 'Expenses',
                    icon: Icons.money_off,
                    children: [
                      _buildDrawerItem(context, 'Purchases', Icons.inventory,
                          onTap: () => NavigationUtils.navigateTo(
                              context, const ListPurchase())),
                      _buildDrawerItem(
                          context, 'Returns', Icons.assignment_return,
                          onTap: () => NavigationUtils.navigateTo(
                              context, const ListReturns())),
                      _buildDrawerItem(
                          context, 'Purchase Book', Icons.book_online,
                          onTap: () => NavigationUtils.navigateTo(
                              context, const PurchaseBook())),
                      _buildDrawerItem(
                          context, 'Integration Book', Icons.library_books,
                          onTap: () => NavigationUtils.navigateTo(
                              context, const IntegrationBookListingPage())),
                      _buildDrawerItem(
                          context, 'Working Cost', Icons.monetization_on,
                          onTap: () => NavigationUtils.navigateTo(
                              context, const WorkingCostListingPage())),
                    ],
                  ),

                  // Sales Group
                  _buildExpansionTile(
                    context,
                    title: 'Sales',
                    icon: Icons.attach_money,
                    children: [
                      _buildDrawerItem(context, 'Sale', Icons.point_of_sale,
                          onTap: () => NavigationUtils.navigateTo(
                              context, const SalesListingPage())),
                      _buildDrawerItem(
                          context, 'Sales Book', Icons.menu_book_outlined,
                          onTap: () => NavigationUtils.navigateTo(
                              context, const SalesBookPage())),
                    ],
                  ),

                  // General Group
                  _buildExpansionTile(
                    context,
                    title: 'General',
                    icon: Icons.category,
                    children: [
                      _buildDrawerItem(
                          context, 'General Expense', Icons.receipt_long,
                          onTap: () => NavigationUtils.navigateTo(
                              context, const GeneralExpensesListingPage())),
                      _buildDrawerItem(context, 'General Sales',
                          Icons.monetization_on_outlined,
                          onTap: () => NavigationUtils.navigateTo(
                              context, const GeneralSalesListingPage())),
                    ],
                  ),

                  // Configuration Group
                  _buildExpansionTile(
                    context,
                    title: 'Configuration',
                    icon: Icons.settings_applications,
                    children: [
                      _buildDrawerItem(
                          context, 'Items', Icons.inventory_2_outlined,
                          onTap: () => NavigationUtils.navigateTo(
                              context, const ListItems())),
                      _buildDrawerItem(context, 'Farms', Icons.agriculture,
                          onTap: () => NavigationUtils.navigateTo(
                              context, const ListFarms())),
                      _buildDrawerItem(context, 'Seasons', Icons.calendar_today,
                          onTap: () => NavigationUtils.navigateTo(
                              context, ListSeasons())),
                      _buildDrawerItem(
                          context, 'Batches', Icons.batch_prediction,
                          onTap: () => NavigationUtils.navigateTo(
                              context, ListBatches())),
                      _buildDrawerItem(context, 'Vendors', Icons.store,
                          onTap: () => NavigationUtils.navigateTo(
                              context, const ListVendors())),
                      _buildDrawerItem(context, 'Employees', Icons.people,
                          onTap: () => NavigationUtils.navigateTo(
                              context, const ListUsers())),
                    ],
                  ),

                  const Divider(),

                  // Standalone Items
                  _buildDrawerItem(
                      context, 'Roles and Permissions', Icons.security,
                      onTap: () =>
                          NavigationUtils.navigateTo(context, ListRolesPage())),

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
        centerTitle: false,
        leading: Builder(builder: (context) {
          return IconButton(
            icon: Icon(Icons.menu_rounded,
                color: ColorUtils().textColor, size: 28),
            onPressed: () => Scaffold.of(context).openDrawer(),
          );
        }),
        actions: [
          Padding(
            padding: const EdgeInsets.only(right: 16.0),
            child: CircleAvatar(
              radius: 20,
              backgroundColor: ColorUtils().primaryColor.withOpacity(0.1),
              child: Icon(
                Icons.person_rounded,
                color: ColorUtils().primaryColor,
                size: 24,
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
            Icons.home_rounded,
            color: _currentPage == 0
                ? ColorUtils().bottomNavSelectedIconColor
                : ColorUtils().bottomNavUnselectedIconColor,
          ),
          Icon(
            Icons.notifications_rounded,
            color: _currentPage == 1
                ? ColorUtils().bottomNavSelectedIconColor
                : ColorUtils().bottomNavUnselectedIconColor,
          ),
          Icon(
            Icons.grid_view_rounded,
            color: _currentPage == 2
                ? ColorUtils().bottomNavSelectedIconColor
                : ColorUtils().bottomNavUnselectedIconColor,
          ),
          Icon(
            Icons.person_rounded,
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
            // Header Greeting
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Good Morning,',
                    style: TextStyle(
                        color: ColorUtils().textColor.withOpacity(0.6),
                        fontSize: 14,
                        fontWeight: FontWeight.w500),
                  ),
                  Text(
                    'Farmora User',
                    style: TextStyle(
                        color: ColorUtils().textColor,
                        fontSize: 24,
                        fontWeight: FontWeight.bold),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 20),

            // Overview Section
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 4),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          'Overview',
                          style: TextStyle(
                              color: ColorUtils().textColor,
                              fontSize: 18,
                              fontWeight: FontWeight.bold),
                        ),
                        Icon(Icons.more_horiz, color: Colors.grey.shade400),
                      ],
                    ),
                  ),
                  const SizedBox(height: 16),
                  HorizontalCard(),
                ],
              ),
            ),

            const SizedBox(height: 30),

            // Quick Menus
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 20),
                  child: Text(
                    'Quick Actions',
                    style: TextStyle(
                        color: ColorUtils().textColor,
                        fontSize: 18,
                        fontWeight: FontWeight.bold),
                  ),
                ),
                const SizedBox(height: 16),
                HorizontalSelector(
                  onSelected: (index) {
                    // Handle selection
                  },
                ),
              ],
            ),

            const SizedBox(height: 10),

            // Recent Transactions
            Padding(
              padding: const EdgeInsets.all(20.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'Recent Transactions',
                        style: TextStyle(
                            color: ColorUtils().textColor,
                            fontSize: 18,
                            fontWeight: FontWeight.bold),
                      ),
                      TextButton(
                        onPressed: () {},
                        child: Text("View All",
                            style: TextStyle(
                                color: ColorUtils().primaryColor,
                                fontWeight: FontWeight.w600)),
                      )
                    ],
                  ),
                  TransactionList(),
                  const SizedBox(height: 80), // Bottom padding for nav bar
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildExpansionTile(
    BuildContext context, {
    required String title,
    required IconData icon,
    required List<Widget> children,
  }) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
      decoration: BoxDecoration(
        color: Colors.transparent,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Theme(
        data: Theme.of(context).copyWith(
          dividerColor: Colors.transparent,
          listTileTheme: ListTileTheme.of(context).copyWith(dense: true),
        ),
        child: ExpansionTile(
          collapsedIconColor: ColorUtils().textColor,
          iconColor: ColorUtils().primaryColor,
          leading: Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: ColorUtils().primaryColor.withOpacity(0.1),
              borderRadius: BorderRadius.circular(8),
            ),
            child: Icon(icon, color: ColorUtils().primaryColor, size: 20),
          ),
          title: Text(
            title,
            style: TextStyle(
              fontSize: 15,
              fontWeight: FontWeight.w600,
              color: ColorUtils().textColor,
            ),
          ),
          children: children,
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
