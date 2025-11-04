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
      height: 130,
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

  Widget _statCard({required int index, required String title, required String amount, required IconData icon}) {
    final bool isSelected = _selectedIndex == index;
    final bgColor = isSelected ? ColorUtils().primaryColor : ColorUtils().cardColor;
    final cardElevation = isSelected ? 4.0 : 2.0;
    final iconBgColor = isSelected ? ColorUtils().whiteColor : ColorUtils().primaryColor.withOpacity(.12);
    final iconColor = isSelected ? ColorUtils().primaryColor : ColorUtils().primaryColor;
    final titleColor = isSelected ? ColorUtils().whiteColor : Colors.black54;
    final amountColor = isSelected ? ColorUtils().whiteColor : Colors.black;

    return Container(
      width: getWidth(context) / 3,
      margin: const EdgeInsets.only(right: 12),
      child: Card(
        margin: EdgeInsets.all(0),
        color: bgColor,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        elevation: cardElevation,
        child: InkWell(
          borderRadius: BorderRadius.circular(12),
          onTap: () => setState(() {
            _selectedIndex = index;
          }),
          child: Padding(
            padding: const EdgeInsets.all(12.0),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Container(
                  width: 30,
                  height: 30,
                  decoration: BoxDecoration(
                    color: iconBgColor,
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Icon(icon, color: iconColor, size: 18),
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(title,
                          style: TextStyle(fontSize: 10, color: titleColor)),
                      const SizedBox(height: 6),
                      Text(amount,
                          style: TextStyle(
                              fontSize: 14, fontWeight: FontWeight.bold, color: amountColor)),
                    ],
                  ),
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}
