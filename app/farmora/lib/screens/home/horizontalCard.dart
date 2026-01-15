import 'package:farmora/utils/colors.dart';
import 'package:farmora/utils/constants.dart';
import 'package:farmora/utils/customUtils.dart';
import 'package:flutter/material.dart';

class HorizontalCard extends StatefulWidget {
  const HorizontalCard({super.key});

  @override
  State<HorizontalCard> createState() => _HorizontalCardState();
}

class _HorizontalCardState extends State<HorizontalCard> {
  int _selectedIndex = 0; // Default to first item selected

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 170, // Slightly taller for better spacing
      child: ListView(
        scrollDirection: Axis.horizontal,
        padding: const EdgeInsets.symmetric(horizontal: 4),
        children: [
          _statCard(
            index: 0,
            title: 'Total Balance',
            amount: '${rupeeSymbol} 12,345.50',
            icon: Icons.account_balance_wallet_rounded,
            trend: '+2.5%',
          ),
          _statCard(
            index: 1,
            title: 'Weekly Income',
            amount: '${rupeeSymbol} 2,300.00',
            icon: Icons.calendar_view_week_rounded,
            trend: '+12%',
          ),
          _statCard(
            index: 2,
            title: 'Monthly Income',
            amount: '${rupeeSymbol} 8,500.00',
            icon: Icons.calendar_view_month_rounded,
            trend: '-5%',
          ),
          _statCard(
            index: 3,
            title: 'Yearly Income',
            amount: '${rupeeSymbol} 20,000.00',
            icon: Icons.calendar_today_rounded,
            trend: '+8%',
          ),
        ],
      ),
    );
  }

  Widget _statCard({
    required int index,
    required String title,
    required String amount,
    required IconData icon,
    String? trend,
  }) {
    final bool isSelected = _selectedIndex == index;

    return GestureDetector(
      onTap: () => setState(() => _selectedIndex = index),
      child: Container(
        width: getWidth(context) / 2.2, // Wider cards
        margin: const EdgeInsets.only(right: 16),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(24),
          gradient: isSelected
              ? LinearGradient(
                  colors: [
                    ColorUtils().primaryColor,
                    ColorUtils().secondaryColor.withOpacity(0.8),
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
                  ? ColorUtils().primaryColor.withOpacity(0.3)
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
            // Decorative Circle for premium feel
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
                              : ColorUtils().primaryColor.withOpacity(0.1),
                          borderRadius: BorderRadius.circular(14),
                        ),
                        child: Icon(
                          icon,
                          color: isSelected
                              ? Colors.white
                              : ColorUtils().primaryColor,
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
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                          color: isSelected
                              ? Colors.white
                              : ColorUtils().textColor,
                        ),
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
