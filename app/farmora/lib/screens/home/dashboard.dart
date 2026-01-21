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
import 'package:farmora/screens/overview/batch_overview.dart';
import 'package:farmora/screens/overview/season_overview.dart';
import 'package:farmora/utils/colors.dart';
import 'package:farmora/utils/localStorage.dart';
import 'package:farmora/utils/navigationUtils.dart';
import 'package:provider/provider.dart';
import 'package:farmora/providers/theme_provider.dart';
import 'package:farmora/providers/users_provider.dart';
// import 'package:fl_chart/fl_chart.dart';
import 'package:farmora/providers/dashboard_provider.dart';
import 'package:flutter/material.dart';

class Dashboard extends StatefulWidget {
  const Dashboard({super.key});

  @override
  State<Dashboard> createState() => _DashboardState();
}

class _DashboardState extends State<Dashboard> {
  int _currentPage = 0;
  final ScrollController _scrollController = ScrollController();
  String _userName = 'Farmora User';
  String _userEmail = 'farmer@farmora.com';
  String _userInitial = 'F';
  String? _userType;

  @override
  void initState() {
    super.initState();
    _loadUserData();
  }

  void _fetchDashboardData() {
    context.read<DashboardProvider>().fetchDashboardData();
  }

  Future<void> _loadUserData() async {
    try {
      final loginData = await SharedPreferenceHelper.getMapData("loginData");
      if (loginData != null && loginData['data'] != null) {
        final userData = loginData['data'];
        final dashboardProvider = context.read<DashboardProvider>();

        setState(() {
          _userName = userData['name'] ?? 'Farmora User';
          _userEmail =
              userData['email'] ?? userData['username'] ?? 'farmer@farmora.com';
          _userType = userData['user_type']?.toString().toLowerCase();
          if (_userName.isNotEmpty) {
            _userInitial = _userName[0].toUpperCase();
          }
        });

        dashboardProvider.setUserType(_userType);
        dashboardProvider.fetchDashboardData();
      }
    } catch (e) {
      debugPrint('Error loading user data: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    context.watch<ThemeProvider>();
    final dashboardProvider = context.watch<DashboardProvider>();

    return Scaffold(
      backgroundColor: ColorUtils().backgroundColor,
      drawer: _buildDrawer(context),
      appBar: _currentPage != 0
          ? null
          : AppBar(
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
          Icon(Icons.home_rounded,
              color: _currentPage == 0
                  ? ColorUtils().bottomNavSelectedIconColor
                  : ColorUtils().bottomNavUnselectedIconColor),
          Icon(Icons.notifications_rounded,
              color: _currentPage == 1
                  ? ColorUtils().bottomNavSelectedIconColor
                  : ColorUtils().bottomNavUnselectedIconColor),
          Icon(Icons.grid_view_rounded,
              color: _currentPage == 2
                  ? ColorUtils().bottomNavSelectedIconColor
                  : ColorUtils().bottomNavUnselectedIconColor),
          Icon(Icons.person_rounded,
              color: _currentPage == 3
                  ? ColorUtils().bottomNavSelectedIconColor
                  : ColorUtils().bottomNavUnselectedIconColor),
        ],
      ),
      body: IndexedStack(
        index: _currentPage,
        children: [
          dashboardProvider.isLoading
              ? const Center(child: CircularProgressIndicator())
              : _buildHomeContent(dashboardProvider.dashboardData),
          const BatchOverviewPage(),
          const ListItems(),
          const SettingsPage(),
        ],
      ),
    );
  }

  Widget _buildDrawer(BuildContext context) {
    return Drawer(
      backgroundColor: ColorUtils().whiteColor,
      child: Column(
        children: [
          UserAccountsDrawerHeader(
            decoration: BoxDecoration(
              color: ColorUtils().primaryColor,
              image: DecorationImage(
                image: AssetImage("assets/images/logo.png"),
                fit: BoxFit.cover,
                colorFilter: ColorFilter.mode(
                    ColorUtils().primaryColor.withOpacity(0.8),
                    BlendMode.srcOver),
              ),
            ),
            accountName: Text(_userName,
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),
            accountEmail:
                Text(_userEmail, style: TextStyle(color: Colors.white70)),
            currentAccountPicture: CircleAvatar(
              backgroundColor: Colors.white,
              child: Text(_userInitial,
                  style: TextStyle(
                      fontSize: 24, color: ColorUtils().primaryColor)),
            ),
          ),
          Expanded(
            child: ListView(
              padding: EdgeInsets.symmetric(vertical: 8),
              children: [
                _buildExpansionTile(
                  context,
                  title: 'Overview',
                  icon: Icons.dashboard,
                  children: [
                    _buildDrawerItem(context, 'Batch Overview', Icons.layers,
                        onTap: () => NavigationUtils.navigateTo(
                            context, const BatchOverviewPage())),
                    _buildDrawerItem(
                        context, 'Season Overview', Icons.calendar_today,
                        onTap: () => NavigationUtils.navigateTo(
                            context, const SeasonOverviewPage())),
                  ],
                ),
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
                        onTap: () =>
                            NavigationUtils.navigateTo(context, ListSeasons())),
                    _buildDrawerItem(context, 'Batches', Icons.batch_prediction,
                        onTap: () =>
                            NavigationUtils.navigateTo(context, ListBatches())),
                    _buildDrawerItem(context, 'Vendors', Icons.store,
                        onTap: () => NavigationUtils.navigateTo(
                            context, const ListVendors())),
                    _buildDrawerItem(context, 'Employees', Icons.people,
                        onTap: () => NavigationUtils.navigateTo(
                            context, const ListUsers())),
                  ],
                ),
                const Divider(),
                _buildDrawerItem(
                    context, 'Roles and Permissions', Icons.security,
                    onTap: () =>
                        NavigationUtils.navigateTo(context, ListRolesPage())),
                _buildDrawerItem(context, 'Settings', Icons.settings,
                    onTap: () => NavigationUtils.navigateTo(
                        context, const SettingsPage())),
                const Divider(),
                _buildDrawerItem(
                  context,
                  'Logout',
                  Icons.logout,
                  onTap: () async {
                    await SharedPreferenceHelper.clearData();
                    if (context.mounted) {
                      NavigationUtils.navigateAndRemoveUntil(
                          context, const AuthenticationUI());
                    }
                  },
                  isDestructive: true,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildHomeContent(Map<String, dynamic>? dashboardData) {
    if (_userType == 'admin') {
      return _buildAdminContent(dashboardData);
    }

    return RefreshIndicator(
      onRefresh: () async => _fetchDashboardData(),
      child: SingleChildScrollView(
        controller: _scrollController,
        child: Column(
          children: [
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
                    _userName,
                    style: TextStyle(
                        color: ColorUtils().textColor,
                        fontSize: 24,
                        fontWeight: FontWeight.bold),
                  ),
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 4),
                    child: Text(
                      'Overview',
                      style: TextStyle(
                          color: ColorUtils().textColor,
                          fontSize: 18,
                          fontWeight: FontWeight.bold),
                    ),
                  ),
                  const SizedBox(height: 16),
                  HorizontalCard(metrics: dashboardData?['metrics']),
                ],
              ),
            ),
            const SizedBox(height: 24),
            _buildHorizontalSection('Our Farms', dashboardData?['farms'],
                (farm) => _buildFarmItem(farm)),
            const SizedBox(height: 24),
            _buildHorizontalSection('Active Batches', dashboardData?['batches'],
                (batch) => _buildBatchItem(batch)),
            const SizedBox(height: 24),
            _buildHorizontalSection('Seasons', dashboardData?['seasons'],
                (season) => _buildSeasonItem(season)),
            const SizedBox(height: 24),
            _buildHorizontalSection('Recent Sales', dashboardData?['sales'],
                (sale) => _buildSaleItem(sale)),
            const SizedBox(height: 24),
            _buildHorizontalSection(
                'Recent Purchases',
                dashboardData?['purchases'],
                (purchase) => _buildPurchaseItem(purchase)),
            const SizedBox(height: 24),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'Quick Actions',
                        style: TextStyle(
                            color: ColorUtils().textColor,
                            fontSize: 18,
                            fontWeight: FontWeight.bold),
                      ),
                      TextButton(
                        onPressed: () {},
                        child: Text("Edit",
                            style: TextStyle(
                                color: ColorUtils().primaryColor,
                                fontWeight: FontWeight.w600)),
                      )
                    ],
                  ),
                  const SizedBox(height: 12),
                  HorizontalSelector(onSelected: (index) {}),
                  const SizedBox(height: 24),
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
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
                  TransactionList(transactions: dashboardData?['transactions']),
                  const SizedBox(height: 80),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildHorizontalSection(String title, List<dynamic>? items,
      Widget Function(dynamic) itemBuilder) {
    if (items == null || items.isEmpty) return const SizedBox.shrink();

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Text(
            title,
            style: TextStyle(
                color: ColorUtils().textColor,
                fontSize: 18,
                fontWeight: FontWeight.bold),
          ),
        ),
        const SizedBox(height: 12),
        SizedBox(
          height: 120,
          child: ListView.builder(
            padding: const EdgeInsets.symmetric(horizontal: 20),
            scrollDirection: Axis.horizontal,
            itemCount: items.length,
            itemBuilder: (context, index) => itemBuilder(items[index]),
          ),
        ),
      ],
    );
  }

  Widget _buildFarmItem(dynamic farm) {
    return Container(
      width: 160,
      margin: const EdgeInsets.only(right: 12),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: ColorUtils().cardColor,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.grey.withOpacity(0.05)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(farm['name'] ?? '',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
              maxLines: 1,
              overflow: TextOverflow.ellipsis),
          const SizedBox(height: 2),
          Text(farm['place'] ?? '',
              style: TextStyle(color: Colors.grey, fontSize: 11)),
          const SizedBox(height: 4),
          Text(farm['capacity'] ?? '',
              style: TextStyle(
                  color: ColorUtils().primaryColor,
                  fontWeight: FontWeight.w600,
                  fontSize: 11)),
        ],
      ),
    );
  }

  Widget _buildBatchItem(dynamic batch) {
    return Container(
      width: 180,
      margin: const EdgeInsets.only(right: 12),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: ColorUtils().cardColor,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.grey.withOpacity(0.05)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(batch['name'] ?? '',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
              maxLines: 1,
              overflow: TextOverflow.ellipsis),
          const SizedBox(height: 2),
          Text(batch['farm_name'] ?? '',
              style: TextStyle(color: Colors.grey, fontSize: 11),
              maxLines: 1,
              overflow: TextOverflow.ellipsis),
          const SizedBox(height: 4),
          Row(
            children: [
              Container(
                width: 8,
                height: 8,
                decoration: BoxDecoration(
                  color:
                      batch['status'] == 'active' ? Colors.green : Colors.grey,
                  shape: BoxShape.circle,
                ),
              ),
              const SizedBox(width: 4),
              Text(batch['status'] ?? '',
                  style: TextStyle(fontSize: 10, fontWeight: FontWeight.w500)),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildSeasonItem(dynamic season) {
    return Container(
      width: 160,
      margin: const EdgeInsets.only(right: 12),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: ColorUtils().cardColor,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.grey.withOpacity(0.05)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(season['name'] ?? '',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
              maxLines: 1,
              overflow: TextOverflow.ellipsis),
          const SizedBox(height: 2),
          Text(season['status'] ?? '',
              style: TextStyle(
                  color:
                      season['status'] == 'active' ? Colors.green : Colors.grey,
                  fontSize: 11,
                  fontWeight: FontWeight.w500)),
          const SizedBox(height: 4),
          Text('Margin: ${season['margin'] ?? 0}%',
              style: TextStyle(fontSize: 10, fontWeight: FontWeight.w500)),
        ],
      ),
    );
  }

  Widget _buildSaleItem(dynamic sale) {
    return Container(
      width: 180,
      margin: const EdgeInsets.only(right: 12),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: ColorUtils().cardColor,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.grey.withOpacity(0.05)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(sale['buyer_name'] ?? '',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
              maxLines: 1,
              overflow: TextOverflow.ellipsis),
          const SizedBox(height: 2),
          Text(sale['batch_name'] ?? '',
              style: TextStyle(color: Colors.grey, fontSize: 11),
              maxLines: 1,
              overflow: TextOverflow.ellipsis),
          const SizedBox(height: 4),
          Text('₹${sale['amount'] ?? 0}',
              style: TextStyle(
                  color: Colors.green,
                  fontWeight: FontWeight.bold,
                  fontSize: 12)),
        ],
      ),
    );
  }

  Widget _buildPurchaseItem(dynamic purchase) {
    return Container(
      width: 180,
      margin: const EdgeInsets.only(right: 12),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: ColorUtils().cardColor,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.grey.withOpacity(0.05)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(purchase['name'] ?? '',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
              maxLines: 1,
              overflow: TextOverflow.ellipsis),
          const SizedBox(height: 2),
          Text(purchase['vendor_name'] ?? '',
              style: TextStyle(color: Colors.grey, fontSize: 11),
              maxLines: 1,
              overflow: TextOverflow.ellipsis),
          const SizedBox(height: 4),
          Text('₹${purchase['net_amount'] ?? 0}',
              style: TextStyle(
                  color: Colors.redAccent,
                  fontWeight: FontWeight.bold,
                  fontSize: 12)),
        ],
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

  Widget _buildAdminContent(Map<String, dynamic>? dashboardData) {
    return RefreshIndicator(
      onRefresh: () async => _fetchDashboardData(),
      child: SingleChildScrollView(
        controller: _scrollController,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Administrator',
                    style: TextStyle(
                        color: ColorUtils().textColor.withOpacity(0.6),
                        fontSize: 14,
                        fontWeight: FontWeight.w500),
                  ),
                  Text(
                    _userName,
                    style: TextStyle(
                        color: ColorUtils().textColor,
                        fontSize: 24,
                        fontWeight: FontWeight.bold),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 4),
                    child: Text(
                      'System Overview',
                      style: TextStyle(
                          color: ColorUtils().textColor,
                          fontSize: 18,
                          fontWeight: FontWeight.bold),
                    ),
                  ),
                  const SizedBox(height: 16),
                  HorizontalCard(metrics: dashboardData?['metrics']),
                ],
              ),
            ),
            const SizedBox(height: 20),
            _buildHorizontalSection(
                'Stock Levels',
                dashboardData?['stockLevels'],
                (stock) => _buildStockItem(stock)),
            const SizedBox(height: 20),
            _buildHorizontalSection(
                'Recent Activity',
                dashboardData?['recentActivity'],
                (activity) => _buildActivityItem(activity)),
            const SizedBox(height: 30),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: Text(
                'Batch Status Breakdown',
                style: TextStyle(
                    color: ColorUtils().textColor,
                    fontSize: 18,
                    fontWeight: FontWeight.bold),
              ),
            ),
            const SizedBox(height: 16),
            _buildHorizontalSection('', dashboardData?['batchStatus'],
                (status) => _buildStatusOverview(status)),
            const SizedBox(height: 30),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: Text(
                'Quick Controls',
                style: TextStyle(
                    color: ColorUtils().textColor,
                    fontSize: 18,
                    fontWeight: FontWeight.bold),
              ),
            ),
            const SizedBox(height: 16),
            HorizontalSelector(onSelected: (index) {}),
            const SizedBox(height: 80),
          ],
        ),
      ),
    );
  }

  Widget _buildActivityItem(dynamic activity) {
    return Container(
      width: 220,
      margin: const EdgeInsets.only(right: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: ColorUtils().cardColor,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.02),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Row(
            children: [
              Container(
                padding: const EdgeInsets.all(8),
                decoration: BoxDecoration(
                  color: ColorUtils().primaryColor.withOpacity(0.1),
                  shape: BoxShape.circle,
                ),
                child: Icon(Icons.notifications_active_outlined,
                    size: 14, color: ColorUtils().primaryColor),
              ),
              const SizedBox(width: 8),
              Expanded(
                child: Text(
                  activity['time'] ?? 'Recently',
                  style: TextStyle(fontSize: 10, color: Colors.grey[600]),
                  maxLines: 1,
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Text(
            activity['activity'] ?? 'Update',
            style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
          ),
          if (activity['value'] != null) ...[
            const SizedBox(height: 4),
            Text(
              activity['value'].toString(),
              style: TextStyle(
                  fontSize: 12,
                  color: ColorUtils().primaryColor,
                  fontWeight: FontWeight.w600),
            ),
          ],
        ],
      ),
    );
  }

  Widget _buildStockItem(dynamic stock) {
    double current = double.parse(stock['current']?.toString() ?? '0');
    double target = double.parse(stock['target']?.toString() ?? '0');
    double progress = target > 0 ? (current / target).clamp(0.0, 1.0) : 0.0;

    return Container(
      width: 160,
      margin: const EdgeInsets.only(right: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: ColorUtils().cardColor,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.grey.withOpacity(0.05)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            stock['name'] ?? 'Item',
            style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14),
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
          ),
          const SizedBox(height: 12),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text('${current.toInt()}',
                  style: const TextStyle(
                      fontSize: 12, fontWeight: FontWeight.w600)),
              Text('${target.toInt()}',
                  style: TextStyle(fontSize: 10, color: Colors.grey[500])),
            ],
          ),
          const SizedBox(height: 8),
          ClipRRect(
            borderRadius: BorderRadius.circular(4),
            child: LinearProgressIndicator(
              value: progress,
              backgroundColor: Colors.grey[200],
              valueColor: AlwaysStoppedAnimation<Color>(
                progress < 0.3
                    ? Colors.red
                    : (progress < 0.7 ? Colors.orange : Colors.green),
              ),
              minHeight: 6,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildStatusOverview(dynamic status) {
    return Container(
      width: 120,
      margin: const EdgeInsets.only(right: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: ColorUtils().cardColor,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.grey.withOpacity(0.05)),
      ),
      child: Column(
        children: [
          Text(
            status['value']?.toString() ?? '0',
            style: TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
              color: ColorUtils().primaryColor,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            status['name'] ?? 'Status',
            style: TextStyle(fontSize: 12, color: Colors.grey[600]),
            textAlign: TextAlign.center,
          ),
        ],
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
