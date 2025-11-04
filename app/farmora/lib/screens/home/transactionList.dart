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
      separatorBuilder: (context, index) => const Divider(height: 1),
      itemBuilder: (context, index) {
        final transaction = _dummyTransactions[index];
        return Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Left side: Title and Date
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      transaction.title,
                      style:  TextStyle(
                        fontSize: 16,
                        color: ColorUtils().textColor,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      transaction.date,
                      style: TextStyle(
                        fontSize: 13,
                        color: Colors.grey.shade600,
                      ),
                    ),
                  ],
                ),
              ),
              
              // Right side: Amount and Payment Mode
              Column(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  Text(
                    '₹${transaction.amount.toStringAsFixed(2)}',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w600,
                      color: transaction.amount < 0 
                          ? Colors.red.shade700
                          : Colors.green.shade700,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                    decoration: BoxDecoration(
                      color: transaction.isOnline 
                          ? ColorUtils().primaryColor.withOpacity(0.1)
                          : Colors.orange.withOpacity(0.1),
                      borderRadius: BorderRadius.circular(4),
                    ),
                    child: Text(
                      transaction.isOnline ? 'Online' : 'Cash',
                      style: TextStyle(
                        fontSize: 12,
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