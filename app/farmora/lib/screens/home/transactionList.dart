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
          const SizedBox(height: 12), // Spacing between items
      itemBuilder: (context, index) {
        final transaction = _dummyTransactions[index];
        return Container(
          decoration: BoxDecoration(
            color: ColorUtils().cardColor,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: Colors.grey.withOpacity(0.05)),
          ),
          child: Padding(
            padding: const EdgeInsets.all(12),
            child: Row(
              children: [
                // Icon
                Container(
                  width: 48,
                  height: 48,
                  decoration: BoxDecoration(
                    color: transaction.amount < 0
                        ? Colors.red.withOpacity(0.08)
                        : Colors.green.withOpacity(0.08),
                    borderRadius: BorderRadius.circular(14),
                  ),
                  child: Icon(
                    transaction.amount < 0
                        ? Icons.arrow_outward_rounded
                        : Icons.arrow_downward_rounded,
                    color: transaction.amount < 0
                        ? Colors.redAccent
                        : Colors.green,
                    size: 22,
                  ),
                ),
                const SizedBox(width: 16),

                // Title & Date
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        transaction.title,
                        style: TextStyle(
                          fontSize: 15,
                          color: ColorUtils().textColor,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Row(
                        children: [
                          Icon(Icons.access_time_rounded,
                              size: 12, color: Colors.grey.shade400),
                          const SizedBox(width: 4),
                          Text(
                            transaction.date,
                            style: TextStyle(
                              fontSize: 12,
                              color: Colors.grey.shade500,
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),

                // Amount & Status
                Column(
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    Text(
                      '${transaction.amount < 0 ? "-" : "+"} ₹${transaction.amount.abs().toStringAsFixed(2)}',
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                        color: transaction.amount < 0
                            ? ColorUtils().textColor
                            : Colors.green.shade600,
                        letterSpacing: -0.5,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Container(
                      padding: const EdgeInsets.symmetric(
                          horizontal: 8, vertical: 2),
                      decoration: BoxDecoration(
                        color: transaction.isOnline
                            ? Colors.blue.withOpacity(0.08)
                            : Colors.orange.withOpacity(0.08),
                        borderRadius: BorderRadius.circular(6),
                      ),
                      child: Text(
                        transaction.isOnline ? 'Online' : 'Cash',
                        style: TextStyle(
                          fontSize: 10,
                          fontWeight: FontWeight.w600,
                          color: transaction.isOnline
                              ? Colors.blue.shade700
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
    date: 'Nov 4, 10:30 AM',
    amount: -2500.00,
    isOnline: true,
  ),
  _Transaction(
    title: 'Crop Sale - Wheat',
    date: 'Nov 3, 02:15 PM',
    amount: 15000.00,
    isOnline: true,
  ),
  _Transaction(
    title: 'Labor Payment',
    date: 'Nov 2, 05:00 PM',
    amount: -1200.00,
    isOnline: false,
  ),
  _Transaction(
    title: 'Equipment Rental',
    date: 'Nov 1, 09:00 AM',
    amount: -3500.00,
    isOnline: true,
  ),
  _Transaction(
    title: 'Vegetable Sale',
    date: 'Oct 31, 11:45 AM',
    amount: 8000.00,
    isOnline: false,
  ),
];
