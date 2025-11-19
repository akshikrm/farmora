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
  int _selectedIndex = -1;
  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 150,
      child: ListView(
        scrollDirection: Axis.horizontal,
        children: [
          _statCard(
            index: 0,
            title: 'Total',
            amount: '${rupeeSymbol} 12,345',
            icon: Icons.account_balance_wallet,
          ),
          _statCard(
            index: 1,
            title: 'This Week',
            amount: '${rupeeSymbol} 2,300',
            icon: Icons.calendar_view_week,
          ),
          _statCard(
            index: 2,
            title: 'This Month',
            amount: '${rupeeSymbol} 8,500',
            icon: Icons.calendar_view_month,
          ),
          _statCard(
            index: 3,
            title: 'This Year',
            amount: '${rupeeSymbol} 20,000',
            icon: Icons.calendar_today,
          ),
        ],
      ),
    );
  }

  Widget _statCard(
      {required int index,
      required String title,
      required String amount,
      required IconData icon}) {
    final bool isSelected = _selectedIndex == index;
    final iconBgColor = isSelected
        ? ColorUtils().whiteColor.withOpacity(0.2)
        : ColorUtils().primaryColor.withOpacity(.1);
    final iconColor =
        isSelected ? ColorUtils().whiteColor : ColorUtils().primaryColor;
    final titleColor = isSelected
        ? ColorUtils().whiteColor.withOpacity(0.9)
        : ColorUtils().textColor.withOpacity(0.7);
    final amountColor =
        isSelected ? ColorUtils().whiteColor : ColorUtils().textColor;

    return Container(
      width: getWidth(context) / 2.8,
      margin: const EdgeInsets.only(right: 16),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        boxShadow: [
          BoxShadow(
            color: isSelected
                ? ColorUtils().primaryColor.withOpacity(0.3)
                : Colors.grey.withOpacity(0.1),
            blurRadius: 12,
            offset: const Offset(0, 6),
          ),
        ],
      ),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          borderRadius: BorderRadius.circular(20),
          onTap: () => setState(() {
            _selectedIndex = index;
          }),
          child: Ink(
            decoration: BoxDecoration(
              gradient: isSelected
                  ? LinearGradient(
                      colors: [
                        ColorUtils().primaryColor,
                        ColorUtils().secondaryColor
                      ],
                      begin: Alignment.topLeft,
                      end: Alignment.bottomRight,
                    )
                  : BoxDecoration(color: ColorUtils().cardColor).color != null
                      ? null
                      : BoxDecoration(color: ColorUtils().cardColor).gradient,
              color: isSelected ? null : ColorUtils().cardColor,
              borderRadius: BorderRadius.circular(20),
              border: isSelected
                  ? null
                  : Border.all(color: Colors.grey.withOpacity(0.1)),
            ),
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Container(
                        padding: const EdgeInsets.all(8),
                        decoration: BoxDecoration(
                          color: iconBgColor,
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: Icon(icon, color: iconColor, size: 20),
                      ),
                      if (isSelected)
                        Icon(Icons.check_circle,
                            color: Colors.white.withOpacity(0.5), size: 16),
                    ],
                  ),
                  const SizedBox(height: 12),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(title,
                          style: TextStyle(
                              fontSize: 12,
                              color: titleColor,
                              fontWeight: FontWeight.w500)),
                      const SizedBox(height: 4),
                      Text(amount,
                          style: TextStyle(
                              fontSize: 18,
                              fontWeight: FontWeight.bold,
                              color: amountColor)),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
