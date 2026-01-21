import 'package:farmora/utils/colors.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class TransactionList extends StatelessWidget {
  final List<dynamic>? transactions;
  const TransactionList({super.key, this.transactions});

  String _formatDate(String? dateStr) {
    if (dateStr == null) return '';
    try {
      final DateTime date = DateTime.parse(dateStr);
      return DateFormat('MMM d, hh:mm a').format(date);
    } catch (e) {
      return dateStr;
    }
  }

  @override
  Widget build(BuildContext context) {
    if (transactions == null || transactions!.isEmpty) {
      return Center(
        child: Padding(
          padding: const EdgeInsets.all(20.0),
          child: Text(
            'No transactions available',
            style: TextStyle(color: ColorUtils().textColor.withOpacity(0.5)),
          ),
        ),
      );
    }

    return ListView.separated(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      itemCount: transactions!.length,
      separatorBuilder: (context, index) => const SizedBox(height: 12),
      itemBuilder: (context, index) {
        final transaction = transactions![index];
        final String title = transaction['description'] ??
            transaction['buyer_name'] ??
            transaction['name'] ??
            'Transaction';
        final String date = _formatDate(
            transaction['date'] ?? transaction['invoice_date'] ?? '');
        final dynamic amountValue =
            transaction['amount'] ?? transaction['net_amount'] ?? 0;
        final double amount =
            (amountValue is num) ? amountValue.toDouble() : 0.0;
        final String type = transaction['type'] ??
            (transaction['buyer_name'] != null ? 'credit' : 'debit');

        final bool isCredit = type == 'credit';

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
                Container(
                  width: 48,
                  height: 48,
                  decoration: BoxDecoration(
                    color: !isCredit
                        ? Colors.red.withOpacity(0.08)
                        : Colors.green.withOpacity(0.08),
                    borderRadius: BorderRadius.circular(14),
                  ),
                  child: Icon(
                    !isCredit
                        ? Icons.arrow_outward_rounded
                        : Icons.arrow_downward_rounded,
                    color: !isCredit ? Colors.redAccent : Colors.green,
                    size: 22,
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        title,
                        style: TextStyle(
                          fontSize: 14,
                          color: ColorUtils().textColor,
                          fontWeight: FontWeight.w600,
                        ),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                      const SizedBox(height: 4),
                      Row(
                        children: [
                          Icon(Icons.access_time_rounded,
                              size: 12, color: Colors.grey.shade400),
                          const SizedBox(width: 4),
                          Text(
                            date,
                            style: TextStyle(
                              fontSize: 11,
                              color: Colors.grey.shade500,
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    Text(
                      '${!isCredit ? "-" : "+"} ₹${amount.abs().toStringAsFixed(2)}',
                      style: TextStyle(
                        fontSize: 15,
                        fontWeight: FontWeight.bold,
                        color: !isCredit
                            ? ColorUtils().textColor
                            : Colors.green.shade600,
                        letterSpacing: -0.5,
                      ),
                    ),
                    if (transaction['category'] != null ||
                        transaction['payment_type'] != null)
                      const SizedBox(height: 4),
                    if (transaction['category'] != null ||
                        transaction['payment_type'] != null)
                      Container(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 8, vertical: 2),
                        decoration: BoxDecoration(
                          color: Colors.blue.withOpacity(0.08),
                          borderRadius: BorderRadius.circular(6),
                        ),
                        child: Text(
                          transaction['category'] ??
                              transaction['payment_type'],
                          style: TextStyle(
                            fontSize: 10,
                            fontWeight: FontWeight.w600,
                            color: Colors.blue.shade700,
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
