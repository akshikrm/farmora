import 'package:dot_curved_bottom_nav/dot_curved_bottom_nav.dart';
import 'package:farmora/screens/authentication/loginPage.dart';
import 'package:farmora/screens/authentication/new_login.dart';
import 'package:farmora/screens/batches/listBatches.dart';
import 'package:farmora/screens/farms/listFarms.dart';
import 'package:farmora/screens/home/horizontalCard.dart';
import 'package:farmora/screens/home/horizontalSelector.dart';
import 'package:farmora/screens/home/transactionList.dart';
import 'package:farmora/screens/packages/list_packages.dart';
import 'package:farmora/screens/seasons/listSeasons.dart';
import 'package:farmora/screens/users/list_users.dart';
import 'package:farmora/utils/colors.dart';
import 'package:farmora/utils/customUtils.dart';
import 'package:farmora/utils/localStorage.dart';
import 'package:farmora/utils/navigationUtils.dart';
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
    return Scaffold(
      // backgroundColor: ColorUtils().backgroundColor,
      drawer: Drawer(
        backgroundColor: ColorUtils().whiteColor,
        child: ListView(
          padding: EdgeInsets.zero,
          children: [
            Container(
              padding:
                  EdgeInsets.only(top: MediaQuery.of(context).padding.top + 20),
              child: Column(
                children: [
                  AppIcon(),
                  const SizedBox(height: 12),
                  Divider(color: ColorUtils().primaryColor.withOpacity(.5)),
                ],
              ),
            ),
            _buildDrawerItem(context, 'Users', Icons.people,
                onTap: () =>
                    NavigationUtils.navigateTo(context, const ListUsers())),
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
            _buildDrawerItem(context, 'Items', Icons.inventory),
            _buildDrawerItem(context, 'Packages', Icons.inventory_2,
                onTap: () =>
                    NavigationUtils.navigateTo(context, ListPackages())),
            _buildDrawerItem(context, 'Root', Icons.account_tree),
            _buildDrawerItem(context, 'Season', Icons.calendar_today,
                onTap: () =>
                    NavigationUtils.navigateTo(context, ListSeasons())),
            _buildDrawerItem(context, 'Subscriptions', Icons.subscriptions),
            _buildDrawerItem(context, 'Vendor', Icons.store),
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
            ),
          ],
        ),
      ),
      appBar: AppBar(
        iconTheme: IconThemeData(color: ColorUtils().blackColor),
        backgroundColor: ColorUtils().backgroundColor,
        actions: [
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: CircleAvatar(
              radius: 15,
              backgroundColor: ColorUtils().primaryColor,
              child: Icon(
                Icons.person,
                color: ColorUtils().whiteColor,
              ),
            ),
          ),
        ],
      ),
      bottomNavigationBar: DotCurvedBottomNav(
        scrollController: _scrollController,
        hideOnScroll: true,
        indicatorColor: ColorUtils().primaryColor,
        backgroundColor: Colors.black,
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
                ? ColorUtils().bottomNavIconColor
                : Colors.white,
          ),
          Icon(
            Icons.notification_add,
            color: _currentPage == 1
                ? ColorUtils().bottomNavIconColor
                : Colors.white,
          ),
          Icon(
            Icons.color_lens,
            color: _currentPage == 2
                ? ColorUtils().bottomNavIconColor
                : Colors.white,
          ),
          Icon(
            Icons.person,
            color: _currentPage == 3
                ? ColorUtils().bottomNavIconColor
                : Colors.white,
          ),
        ],
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 0, vertical: 0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Horizontally scrollable stat cards

              Container(
                  color: Colors.grey.withOpacity(.1),
                  padding: EdgeInsets.all(0),
                  child: Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Overview',
                          style: TextStyle(
                              color: ColorUtils().textColor,
                              fontSize: 18,
                              fontWeight: FontWeight.w600),
                        ),
                        HorizontalCard(),
                      ],
                    ),
                  )),
              const SizedBox(height: 20),

              Container(
                width: double.infinity,
                height: getHeight(context),
                decoration: BoxDecoration(
                  color: ColorUtils().backgroundColor,
                  borderRadius: BorderRadius.horizontal(
                    left: Radius.circular(20),
                    right: Radius.circular(20),
                  ),
                ),
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 0.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 8),
                        child: Text(
                          'Quick Menus',
                          style: TextStyle(
                              color: ColorUtils().textColor,
                              fontSize: 18,
                              fontWeight: FontWeight.w600),
                        ),
                      ),
                      // horizontally scrollable selector widgets
                      HorizontalSelector(
                        onSelected: (index) {
                          // You can react to selection here if needed
                          // e.g. fetch data or update charts below
                          // print('Selected: $index');
                        },
                      ),
                      const SizedBox(height: 12),
                      // Placeholder for charts / other content
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 8),
                        child: Text(
                          'Latest Transactions',
                          style: TextStyle(
                              color: ColorUtils().textColor,
                              fontSize: 18,
                              fontWeight: FontWeight.w600),
                        ),
                      ),
                      const SizedBox(height: 12),
                      TransactionList(),
                      Expanded(
                        child: Center(
                          child: Text('Charts / other widgets go here'),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildDrawerItem(
    BuildContext context,
    String title,
    IconData icon, {
    VoidCallback? onTap,
  }) {
    return ListTile(
      leading: Icon(
        icon,
        color: ColorUtils().primaryColor,
        size: 22,
      ),
      title: Text(
        title,
        style: const TextStyle(
          fontSize: 14,
          fontWeight: FontWeight.w500,
        ),
      ),
      onTap: () {
        Navigator.pop(context); // Close drawer
        if (onTap != null) onTap();
      },
      contentPadding: const EdgeInsets.symmetric(horizontal: 24),
      visualDensity: VisualDensity.compact,
      minLeadingWidth: 20,
    );
  }
}
