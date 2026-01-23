import 'package:farmora/screens/batches/listBatches.dart';
import 'package:farmora/screens/farms/listFarms.dart';
import 'package:farmora/screens/purchases/list_purchase.dart';
import 'package:farmora/screens/packages/list_packages.dart';
import 'package:farmora/screens/root/list_root.dart';
import 'package:farmora/screens/seasons/listSeasons.dart';
import 'package:farmora/screens/subscriptions/list_subscriptions.dart';
import 'package:farmora/screens/vendor/list_vendors.dart';
import 'package:farmora/utils/colors.dart';

import 'package:farmora/utils/navigationUtils.dart';
import 'package:flutter/material.dart';

class HorizontalSelector extends StatefulWidget {
  /// Optional callback that reports the selected index
  final void Function(int index)? onSelected;

  const HorizontalSelector({Key? key, this.onSelected}) : super(key: key);

  @override
  State<HorizontalSelector> createState() => _HorizontalSelectorState();
}

class _HorizontalSelectorState extends State<HorizontalSelector> {
  int _visibleIndex = 0; // For dots indicator
  late final ScrollController _scrollController;

  @override
  void initState() {
    super.initState();
    _scrollController = ScrollController()..addListener(_onScroll);
  }

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  void _onScroll() {
    if (!_scrollController.hasClients) return;

    // Calculate center point of viewport
    // final scrollCenter = _scrollController.offset + (viewportWidth / 2);

    // Find which card is most visible - simple approximation for dots
    // final totalContentWidth = (_items.length * cardWidth) +
    //     ((_items.length - 1) * separation) +
    //     (horizontalPadding * 2);
    final progress = _scrollController.offset /
        (_scrollController.position.maxScrollExtent > 0
            ? _scrollController.position.maxScrollExtent
            : 1);

    // Update visible index based on simplified progress for 3 dots
    final index = (progress * 2).round().clamp(0, 2);

    if (index != _visibleIndex) {
      setState(() => _visibleIndex = index);
    }
  }

  final List<_SelectorItem> _items = [
    _SelectorItem('Batches', Icons.grid_view_rounded, Colors.blue),
    _SelectorItem('Farms', Icons.agriculture_rounded, Colors.green),
    _SelectorItem('Items', Icons.category_rounded, Colors.orange),
    // _SelectorItem('Packages', Icons.local_offer_rounded, Colors.purple),
    // _SelectorItem('Root', Icons.admin_panel_settings_rounded, Colors.red),
    _SelectorItem('Seasons', Icons.wb_sunny_rounded, Colors.amber),
    // _SelectorItem('Subs', Icons.card_membership_rounded, Colors.teal),
    _SelectorItem('Vendor', Icons.storefront_rounded, Colors.indigo),
  ];

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        SizedBox(
          height: 110,
          child: ListView.separated(
            controller: _scrollController,
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 4),
            scrollDirection: Axis.horizontal,
            itemCount: _items.length,
            separatorBuilder: (_, __) => const SizedBox(width: 20),
            itemBuilder: (context, index) {
              final item = _items[index];
              return GestureDetector(
                onTap: () {
                  switch (index) {
                    case 0:
                      NavigationUtils.navigateTo(context, ListBatches());
                      break;
                    case 1:
                      NavigationUtils.navigateTo(context, ListFarms());
                      break;
                    case 2:
                      NavigationUtils.navigateTo(context, const ListPurchase());
                      break;
                    // case 3:
                    //   NavigationUtils.navigateTo(context, ListPackages());
                    //   break;
                    // case 4:
                    //   NavigationUtils.navigateTo(context, const ListRoot());
                    //   break;
                    case 3:
                      NavigationUtils.navigateTo(context, ListSeasons());
                      break;
                    // case 6:
                    //   NavigationUtils.navigateTo(
                    //       context, const ListSubscriptions());
                    //   break;
                    case 4:
                      NavigationUtils.navigateTo(context, const ListVendors());
                      break;
                  }
                },
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Container(
                      width: 65,
                      height: 65,
                      decoration: BoxDecoration(
                        color: item.color.withOpacity(0.1),
                        borderRadius: BorderRadius.circular(22), // Squircle
                        border: Border.all(
                            color: item.color.withOpacity(0.2), width: 1.5),
                      ),
                      child: Icon(item.icon, color: item.color, size: 30),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      item.title,
                      style: TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.w600,
                          color: ColorUtils().textColor.withOpacity(0.8)),
                      textAlign: TextAlign.center,
                    ),
                  ],
                ),
              );
            },
          ),
        ),
      ],
    );
  }
}

class _SelectorItem {
  final String title;
  final IconData icon;
  final Color color;

  _SelectorItem(this.title, this.icon, this.color);
}
