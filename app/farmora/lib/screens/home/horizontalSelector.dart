import 'package:farmora/screens/batches/listBatches.dart';
import 'package:farmora/screens/farms/listFarms.dart';
import 'package:farmora/screens/purchases/list_purchase.dart';
import 'package:farmora/screens/packages/list_packages.dart';
import 'package:farmora/screens/root/list_root.dart';
import 'package:farmora/screens/seasons/listSeasons.dart';
import 'package:farmora/screens/subscriptions/list_subscriptions.dart';
import 'package:farmora/screens/vendor/list_vendors.dart';
import 'package:farmora/utils/colors.dart';
import 'package:farmora/utils/customUtils.dart';
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
  int _selectedIndex = -1; // For card highlighting
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

    // Calculate visible area
    final viewportWidth = _scrollController.position.viewportDimension;
    final cardWidth = getWidth(context) * 0.6;
    final separation = 12.0;
    final horizontalPadding = 16.0;

    // Calculate center point of viewport
    final scrollCenter = _scrollController.offset + (viewportWidth / 2);

    // Find which card is most visible
    final rawIndex =
        (scrollCenter - horizontalPadding) / (cardWidth + separation);
    final index = rawIndex.round().clamp(0, _items.length - 1);

    if (index != _visibleIndex) {
      setState(() => _visibleIndex = index);
    }
  }

  final List<_SelectorItem> _items = [
    _SelectorItem('Batches', Icons.task),
    _SelectorItem('Farms', Icons.notifications),
    _SelectorItem('Items', Icons.inventory_2),
    _SelectorItem('Packages', Icons.insert_drive_file),
    _SelectorItem('Root', Icons.insert_drive_file),
    _SelectorItem('Seasons', Icons.show_chart),
    _SelectorItem('Subscriptions', Icons.insert_drive_file),
    _SelectorItem('Vendor', Icons.insert_drive_file),
  ];

  @override
  Widget build(BuildContext context) {
    // Height accounts for the item row + dot indicator area
    return SizedBox(
      height: 150,
      child: Column(
        children: [
          SizedBox(
            height: 130,
            child: ListView.separated(
              controller: _scrollController,
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
              scrollDirection: Axis.horizontal,
              itemCount: _items.length,
              separatorBuilder: (_, __) => const SizedBox(width: 12),
              itemBuilder: (context, index) {
                final item = _items[index];
                final isSelected = _selectedIndex == index;
                // Card styling based only on selection, not scroll position
                final bg =
                    isSelected ? ColorUtils().primaryColor : Colors.white;
                final textColor = isSelected ? Colors.white : Colors.black87;
                final iconBg = isSelected
                    ? Colors.white.withOpacity(.18)
                    : ColorUtils().primaryColor.withOpacity(.12);
                final iconColor =
                    isSelected ? Colors.white : ColorUtils().primaryColor;

                return GestureDetector(
                  onTap: () {
                    // setState(() => _selectedIndex = index);
                    // if (widget.onSelected != null) widget.onSelected!(index);
                    switch (index) {
                      case 0:
                        NavigationUtils.navigateTo(context, ListBatches());
                        break;
                      case 1:
                        NavigationUtils.navigateTo(context, ListFarms());
                        break;
                      case 2:
                        NavigationUtils.navigateTo(
                            context, const ListPurchase());
                        break;
                      case 3:
                        NavigationUtils.navigateTo(context, ListPackages());
                        break;
                      case 4:
                        NavigationUtils.navigateTo(context, const ListRoot());
                        break;
                      case 5:
                        NavigationUtils.navigateTo(context, ListSeasons());
                        break;
                      case 6:
                        NavigationUtils.navigateTo(
                            context, const ListSubscriptions());
                        break;
                      case 7:
                        NavigationUtils.navigateTo(
                            context, const ListVendors());
                        break;
                    }
                  },
                  child: Container(
                    width: getWidth(context) * 0.4,
                    decoration: BoxDecoration(
                      color: bg,
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(
                        color: isSelected
                            ? ColorUtils().primaryColor
                            : Colors.grey.withOpacity(0.1),
                      ),
                      boxShadow: [
                        BoxShadow(
                          color: isSelected
                              ? ColorUtils().primaryColor.withOpacity(0.2)
                              : Colors.grey.withOpacity(0.05),
                          blurRadius: 8,
                          offset: const Offset(0, 4),
                        )
                      ],
                    ),
                    padding: const EdgeInsets.all(12),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Container(
                          width: 48,
                          height: 48,
                          decoration: BoxDecoration(
                            color: iconBg,
                            shape: BoxShape.circle,
                          ),
                          child: Icon(item.icon, color: iconColor, size: 24),
                        ),
                        const SizedBox(height: 8),
                        Text(
                          item.title,
                          style: TextStyle(
                              fontSize: 13,
                              fontWeight: FontWeight.w600,
                              color: textColor),
                          textAlign: TextAlign.center,
                          overflow: TextOverflow.ellipsis,
                        ),
                      ],
                    ),
                  ),
                );
              },
            ),
          ),

          // Three-dot indicator
          const SizedBox(height: 6),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: List.generate(3, (i) {
              // Calculate which section we're in (0, 1, or 2)
              final totalSections = 3;
              final sectionSize = _items.length / totalSections;
              final currentSection = (_visibleIndex / sectionSize).floor();

              // Calculate highlight intensity
              double intensity = 0.0;
              if (i == currentSection) {
                intensity = 1.0;
              } else if (i == currentSection + 1) {
                final progress = (_visibleIndex % sectionSize) / sectionSize;
                intensity = progress * 0.3; // Slight glow for next dot
              } else if (i == currentSection - 1) {
                final progress =
                    1 - (_visibleIndex % sectionSize) / sectionSize;
                intensity = progress * 0.3; // Slight glow for previous dot
              }

              return AnimatedContainer(
                duration: const Duration(milliseconds: 200),
                margin: const EdgeInsets.symmetric(horizontal: 4),
                width: 8 + (2 * intensity),
                height: 8 + (2 * intensity),
                decoration: BoxDecoration(
                  color: Color.lerp(Colors.grey.shade300,
                      ColorUtils().primaryColor, intensity),
                  shape: BoxShape.circle,
                  boxShadow: intensity > 0.1
                      ? [
                          BoxShadow(
                              color: ColorUtils()
                                  .primaryColor
                                  .withOpacity(.18 * intensity),
                              blurRadius: 4,
                              offset: const Offset(0, 2))
                        ]
                      : null,
                ),
              );
            }),
          ),
        ],
      ),
    );
  }
}

class _SelectorItem {
  final String title;
  final IconData icon;

  _SelectorItem(this.title, this.icon);
}
