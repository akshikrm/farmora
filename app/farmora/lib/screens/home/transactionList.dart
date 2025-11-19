import 'package:farmora/utils/colors.dart';
import 'package:flutter/material.dart';

class TransactionList extends StatelessWidget {
  const TransactionList({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView.separated(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      itemCount: _dummyTransactions.length,
      separatorBuilder: (context, index) =>
          Divider(height: 1, color: Colors.grey.withOpacity(0.1)),
      itemBuilder: (context, index) {
        final transaction = _dummyTransactions[index];
        return Container(
          margin: const EdgeInsets.symmetric(vertical: 4, horizontal: 8),
          decoration: BoxDecoration(
            color: ColorUtils().cardColor,
            borderRadius: BorderRadius.circular(12),
            boxShadow: [
              BoxShadow(
                color: Colors.grey.withOpacity(0.05),
                blurRadius: 4,
                offset: const Offset(0, 2),
              ),
            ],
          ),
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Container(
                  padding: const EdgeInsets.all(10),
                  decoration: BoxDecoration(
                    color: transaction.amount < 0
                        ? Colors.red.withOpacity(0.1)
                        : Colors.green.withOpacity(0.1),
                    shape: BoxShape.circle,
                  ),
                  child: Icon(
                    transaction.amount < 0
                        ? Icons.arrow_upward
                        : Icons.arrow_downward,
                    color: transaction.amount < 0 ? Colors.red : Colors.green,
                    size: 20,
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        transaction.title,
                        style: TextStyle(
                          fontSize: 16,
                          color: ColorUtils().textColor,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        transaction.date,
                        style: TextStyle(
                          fontSize: 13,
                          color: Colors.grey.shade500,
                        ),
                      ),
                    ],
                  ),
                ),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    Text(
                      '₹${transaction.amount.abs().toStringAsFixed(2)}',
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.w700,
                        color: transaction.amount < 0
                            ? ColorUtils().textColor
                            : Colors.green.shade700,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Container(
                      padding: const EdgeInsets.symmetric(
                          horizontal: 8, vertical: 4),
                      decoration: BoxDecoration(
                        color: transaction.isOnline
                            ? ColorUtils().primaryColor.withOpacity(0.1)
                            : Colors.orange.withOpacity(0.1),
                        borderRadius: BorderRadius.circular(6),
                      ),
                      child: Text(
                        transaction.isOnline ? 'Online' : 'Cash',
                        style: TextStyle(
                          fontSize: 11,
                          fontWeight: FontWeight.w500,
                          color: transaction.isOnline
                              ? ColorUtils().primaryColor
                              : Colors.orange.shade800,
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}

// Sample Transaction Model
class _Transaction {
  final String title;
  final String date;
  final double amount;
  final bool isOnline;

  const _Transaction({
    required this.title,
    required this.date,
    required this.amount,
    required this.isOnline,
  });
}

// Sample Data
final List<_Transaction> _dummyTransactions = [
  _Transaction(
    title: 'Fertilizer Purchase',
    date: 'Nov 4, 2025',
    amount: -2500.00,
    isOnline: true,
  ),
  _Transaction(
    title: 'Crop Sale - Wheat',
    date: 'Nov 3, 2025',
    amount: 15000.00,
    isOnline: true,
  ),
  _Transaction(
    title: 'Labor Payment',
    date: 'Nov 2, 2025',
    amount: -1200.00,
    isOnline: false,
  ),
  _Transaction(
    title: 'Equipment Rental',
    date: 'Nov 1, 2025',
    amount: -3500.00,
    isOnline: true,
  ),
  _Transaction(
    title: 'Vegetable Sale',
    date: 'Oct 31, 2025',
    amount: 8000.00,
    isOnline: false,
  ),
];
