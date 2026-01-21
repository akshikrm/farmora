import 'package:farmora/utils/colors.dart';
import 'package:farmora/utils/constants.dart';
import 'package:farmora/utils/customUtils.dart';
import 'package:flutter/material.dart';

class HorizontalCard extends StatefulWidget {
  final List<dynamic>? metrics;
  const HorizontalCard({super.key, this.metrics});

  @override
  State<HorizontalCard> createState() => _HorizontalCardState();
}

class _HorizontalCardState extends State<HorizontalCard> {
  int _selectedIndex = 0; // Default to first item selected

  Color _getColorFromString(String? colorName) {
    switch (colorName?.toLowerCase()) {
      case 'blue':
        return Colors.blue;
      case 'amber':
        return Colors.amber;
      case 'emerald':
        return const Color(0xFF10B981);
      case 'rose':
        return const Color(0xFFF43F5E);
      case 'orange':
        return Colors.orange;
      case 'green':
        return Colors.green;
      case 'red':
        return Colors.red;
      default:
        return ColorUtils().primaryColor;
    }
  }

  @override
  Widget build(BuildContext context) {
    if (widget.metrics == null || widget.metrics!.isEmpty) {
      return SizedBox(
        height: 170,
        child: Center(
          child: Text(
            'No metrics available',
            style: TextStyle(color: ColorUtils().textColor.withOpacity(0.5)),
          ),
        ),
      );
    }

    return SizedBox(
      height: 170,
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        padding: const EdgeInsets.symmetric(horizontal: 4),
        itemCount: widget.metrics!.length,
        itemBuilder: (context, index) {
          final metric = widget.metrics![index];
          final String label = metric['label'] ?? '';
          final dynamic value = metric['value'] ?? 0;
          final dynamic trend = metric['trend'] ?? 0;
          final String colorName = metric['color'] ?? 'blue';

          IconData icon = Icons.account_balance_wallet_rounded;
          if (label.contains('Revenue')) icon = Icons.trending_up_rounded;
          if (label.contains('Expenses')) icon = Icons.trending_down_rounded;
          if (label.contains('Profit')) icon = Icons.account_balance_rounded;
          if (label.contains('Batches')) icon = Icons.layers_rounded;

          return _statCard(
            index: index,
            title: label,
            amount: value is num
                ? '${rupeeSymbol} ${value.toStringAsFixed(2)}'
                : value.toString(),
            icon: icon,
            trend: trend != 0 ? '${trend > 0 ? "+" : ""}$trend%' : null,
            baseColor: _getColorFromString(colorName),
          );
        },
      ),
    );
  }

  Widget _statCard({
    required int index,
    required String title,
    required String amount,
    required IconData icon,
    String? trend,
    required Color baseColor,
  }) {
    final bool isSelected = _selectedIndex == index;

    return GestureDetector(
      onTap: () => setState(() => _selectedIndex = index),
      child: Container(
        width: getWidth(context) / 2.2,
        margin: const EdgeInsets.only(right: 16),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(24),
          gradient: isSelected
              ? LinearGradient(
                  colors: [
                    baseColor,
                    baseColor.withOpacity(0.8),
                  ],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                )
              : LinearGradient(
                  colors: [
                    ColorUtils().cardColor,
                    ColorUtils().cardColor,
                  ],
                ),
          boxShadow: [
            BoxShadow(
              color: isSelected
                  ? baseColor.withOpacity(0.3)
                  : Colors.grey.withOpacity(0.08),
              blurRadius: 15,
              offset: const Offset(0, 8),
            ),
          ],
          border: Border.all(
            color:
                isSelected ? Colors.transparent : Colors.grey.withOpacity(0.1),
            width: 1,
          ),
        ),
        child: Stack(
          children: [
            if (isSelected)
              Positioned(
                top: -20,
                right: -20,
                child: Container(
                  width: 100,
                  height: 100,
                  decoration: BoxDecoration(
                    color: Colors.white.withOpacity(0.1),
                    shape: BoxShape.circle,
                  ),
                ),
              ),
            Padding(
              padding: const EdgeInsets.all(20.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Container(
                        padding: const EdgeInsets.all(10),
                        decoration: BoxDecoration(
                          color: isSelected
                              ? Colors.white.withOpacity(0.2)
                              : baseColor.withOpacity(0.1),
                          borderRadius: BorderRadius.circular(14),
                        ),
                        child: Icon(
                          icon,
                          color: isSelected ? Colors.white : baseColor,
                          size: 22,
                        ),
                      ),
                      if (trend != null)
                        Container(
                          padding: const EdgeInsets.symmetric(
                              horizontal: 8, vertical: 4),
                          decoration: BoxDecoration(
                            color: isSelected
                                ? Colors.white.withOpacity(0.2)
                                : (trend.startsWith('-')
                                    ? Colors.red.withOpacity(0.1)
                                    : Colors.green.withOpacity(0.1)),
                            borderRadius: BorderRadius.circular(20),
                          ),
                          child: Text(
                            trend,
                            style: TextStyle(
                              fontSize: 10,
                              fontWeight: FontWeight.bold,
                              color: isSelected
                                  ? Colors.white
                                  : (trend.startsWith('-')
                                      ? Colors.red
                                      : Colors.green),
                            ),
                          ),
                        ),
                    ],
                  ),
                  const SizedBox(height: 16),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        title,
                        style: TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.w500,
                          color: isSelected
                              ? Colors.white.withOpacity(0.8)
                              : ColorUtils().textColor.withOpacity(0.6),
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        amount,
                        style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                          color: isSelected
                              ? Colors.white
                              : ColorUtils().textColor,
                        ),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
