import 'package:farmora/providers/items_provider.dart';
import 'package:farmora/screens/purchases/add_purchase.dart';
import 'package:farmora/utils/colors.dart';
import 'package:farmora/utils/date_formatter.dart';
import 'package:farmora/widgets/confirmation_dialog.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class ListPurchase extends StatefulWidget {
  const ListPurchase({super.key});

  @override
  State<ListPurchase> createState() => _ListPurchaseState();
}

class _ListPurchaseState extends State<ListPurchase> {
  @override
  void initState() {
    super.initState();
    Future.delayed(Duration(seconds: 0), () {
      context.read<ItemsProvider>().loadItems();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: ColorUtils().backgroundColor,
      appBar: AppBar(
        title: Text("Purchases", style: TextStyle(fontWeight: FontWeight.w600)),
        centerTitle: true,
        backgroundColor: ColorUtils().backgroundColor,
        elevation: 0,
      ),
      body: context.watch<ItemsProvider>().isLoading
          ? Center(
              child: CircularProgressIndicator(
                color: ColorUtils().primaryColor,
              ),
            )
          : ListView.builder(
              padding: EdgeInsets.all(16),
              itemCount: context.watch<ItemsProvider>().items.length,
              itemBuilder: (context, index) {
                var item = context.watch<ItemsProvider>().items[index];
                return Container(
                  margin: EdgeInsets.only(bottom: 16),
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      colors: [
                        ColorUtils().cardColor,
                        ColorUtils().cardColor.withOpacity(0.95),
                      ],
                      begin: Alignment.topLeft,
                      end: Alignment.bottomRight,
                    ),
                    borderRadius: BorderRadius.circular(16),
                    boxShadow: [
                      BoxShadow(
                        color: ColorUtils().primaryColor.withOpacity(0.08),
                        blurRadius: 15,
                        offset: Offset(0, 5),
                        spreadRadius: 0,
                      ),
                    ],
                    border: Border.all(
                      color: ColorUtils().primaryColor.withOpacity(0.1),
                      width: 1,
                    ),
                  ),
                  child: Material(
                    color: Colors.transparent,
                    child: InkWell(
                      borderRadius: BorderRadius.circular(16),
                      child: Padding(
                        padding: EdgeInsets.all(16),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            // Header Row with Invoice Number and Amount
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                // Invoice Number with Icon
                                Expanded(
                                  child: Row(
                                    children: [
                                      Container(
                                        padding: EdgeInsets.all(8),
                                        decoration: BoxDecoration(
                                          gradient: LinearGradient(
                                            colors: [
                                              ColorUtils().primaryColor,
                                              ColorUtils()
                                                  .primaryColor
                                                  .withOpacity(0.8),
                                            ],
                                          ),
                                          borderRadius:
                                              BorderRadius.circular(10),
                                          boxShadow: [
                                            BoxShadow(
                                              color: ColorUtils()
                                                  .primaryColor
                                                  .withOpacity(0.3),
                                              blurRadius: 8,
                                              offset: Offset(0, 3),
                                            ),
                                          ],
                                        ),
                                        child: Icon(
                                          Icons.receipt_long,
                                          color: Colors.white,
                                          size: 20,
                                        ),
                                      ),
                                      SizedBox(width: 12),
                                      Expanded(
                                        child: Column(
                                          crossAxisAlignment:
                                              CrossAxisAlignment.start,
                                          children: [
                                            Text(
                                              "Invoice",
                                              style: TextStyle(
                                                fontSize: 11,
                                                color: Colors.grey[600],
                                                fontWeight: FontWeight.w500,
                                              ),
                                            ),
                                            SizedBox(height: 2),
                                            Text(
                                              "${item["invoice_number"]}",
                                              style: TextStyle(
                                                fontWeight: FontWeight.w700,
                                                fontSize: 16,
                                                color: ColorUtils().textColor,
                                              ),
                                              overflow: TextOverflow.ellipsis,
                                            ),
                                          ],
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                                // Total Amount Badge
                                Container(
                                  padding: EdgeInsets.symmetric(
                                    horizontal: 12,
                                    vertical: 8,
                                  ),
                                  decoration: BoxDecoration(
                                    gradient: LinearGradient(
                                      colors: [
                                        ColorUtils()
                                            .primaryColor
                                            .withOpacity(0.15),
                                        ColorUtils()
                                            .primaryColor
                                            .withOpacity(0.08),
                                      ],
                                    ),
                                    borderRadius: BorderRadius.circular(12),
                                    border: Border.all(
                                      color: ColorUtils()
                                          .primaryColor
                                          .withOpacity(0.3),
                                      width: 1.5,
                                    ),
                                  ),
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.end,
                                    children: [
                                      Text(
                                        "Total",
                                        style: TextStyle(
                                          fontSize: 10,
                                          color: ColorUtils()
                                              .primaryColor
                                              .withOpacity(0.8),
                                          fontWeight: FontWeight.w600,
                                        ),
                                      ),
                                      SizedBox(height: 2),
                                      Text(
                                        "₹${item["total_price"]}",
                                        style: TextStyle(
                                          fontWeight: FontWeight.w800,
                                          fontSize: 16,
                                          color: ColorUtils().primaryColor,
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              ],
                            ),
                            SizedBox(height: 16),
                            // Divider
                            Container(
                              height: 1,
                              decoration: BoxDecoration(
                                gradient: LinearGradient(
                                  colors: [
                                    Colors.transparent,
                                    Colors.grey.withOpacity(0.2),
                                    Colors.transparent,
                                  ],
                                ),
                              ),
                            ),
                            SizedBox(height: 16),
                            // Details Section
                            Row(
                              children: [
                                // Supplier Info
                                Expanded(
                                  child: _buildInfoChip(
                                    icon: Icons.store_outlined,
                                    label: "Supplier",
                                    value: item["vendor"]["name"].toString(),
                                  ),
                                ),
                                SizedBox(width: 8),
                                // Category Info
                                Expanded(
                                  child: _buildInfoChip(
                                    icon: Icons.category_outlined,
                                    label: "Category",
                                    value: item["category"]["name"].toString(),
                                  ),
                                ),
                              ],
                            ),
                            SizedBox(height: 12),
                            // Date Row
                            Container(
                              padding: EdgeInsets.symmetric(
                                horizontal: 12,
                                vertical: 8,
                              ),
                              decoration: BoxDecoration(
                                color:
                                    ColorUtils().primaryColor.withOpacity(0.05),
                                borderRadius: BorderRadius.circular(8),
                              ),
                              child: Row(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  Icon(
                                    Icons.calendar_today_outlined,
                                    size: 14,
                                    color: ColorUtils().primaryColor,
                                  ),
                                  SizedBox(width: 6),
                                  Text(
                                    DateFormatter.formatDate(
                                        item["invoice_date"].toString()),
                                    style: TextStyle(
                                      fontSize: 13,
                                      color: ColorUtils().primaryColor,
                                      fontWeight: FontWeight.w600,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            SizedBox(height: 16),
                            // Action Buttons Row
                            Row(
                              children: [
                                // Edit Button
                                Expanded(
                                  child: OutlinedButton.icon(
                                    onPressed: () async {
                                      final result = await Navigator.push(
                                        context,
                                        MaterialPageRoute(
                                          builder: (context) =>
                                              AddPurchases(item: item),
                                        ),
                                      );
                                      if (result == true && mounted) {
                                        context
                                            .read<ItemsProvider>()
                                            .loadItems();
                                      }
                                    },
                                    icon: Icon(
                                      Icons.edit_outlined,
                                      size: 18,
                                      color: ColorUtils().primaryColor,
                                    ),
                                    label: Text(
                                      'Edit',
                                      style: TextStyle(
                                        color: ColorUtils().primaryColor,
                                        fontWeight: FontWeight.w600,
                                      ),
                                    ),
                                    style: OutlinedButton.styleFrom(
                                      side: BorderSide(
                                        color: ColorUtils().primaryColor,
                                        width: 1.5,
                                      ),
                                      shape: RoundedRectangleBorder(
                                        borderRadius: BorderRadius.circular(8),
                                      ),
                                      padding:
                                          EdgeInsets.symmetric(vertical: 10),
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                );
              },
            ),
      floatingActionButton: FloatingActionButton(
        onPressed: () async {
          final result = await Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => const AddPurchases(),
            ),
          );
          // Reload items if add was successful
          if (result == true && mounted) {
            context.read<ItemsProvider>().loadItems();
          }
        },
        backgroundColor: ColorUtils().primaryColor,
        child: Icon(Icons.add, color: Colors.white),
      ),
    );
  }

  Widget _buildInfoChip({
    required IconData icon,
    required String label,
    required String value,
  }) {
    return Container(
      padding: EdgeInsets.all(10),
      decoration: BoxDecoration(
        color: ColorUtils().backgroundColor,
        borderRadius: BorderRadius.circular(10),
        border: Border.all(
          color: Colors.grey.withOpacity(0.2),
          width: 1,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(
                icon,
                size: 14,
                color: ColorUtils().primaryColor.withOpacity(0.7),
              ),
              SizedBox(width: 4),
              Text(
                label,
                style: TextStyle(
                  fontSize: 10,
                  color: Colors.grey[600],
                  fontWeight: FontWeight.w500,
                ),
              ),
            ],
          ),
          SizedBox(height: 4),
          Text(
            value,
            style: TextStyle(
              fontSize: 13,
              color: ColorUtils().textColor,
              fontWeight: FontWeight.w600,
            ),
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
          ),
        ],
      ),
    );
  }

  void _showDeleteConfirmation(
      BuildContext context, int itemId, String invoiceNumber) {
    ConfirmationDialog.showDeleteConfirmation(
      context: context,
      title: 'Delete Purchase',
      itemName: 'Invoice: $invoiceNumber',
      itemIcon: Icons.receipt_long,
      customMessage: 'Are you sure you want to delete this purchase?',
      onConfirm: () => _deleteItem(itemId),
    );
  }

  Future<void> _deleteItem(int itemId) async {
    final provider = context.read<ItemsProvider>();
    final success = await provider.deleteItem(itemId);

    if (!mounted) return;

    if (success) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Purchase deleted successfully'),
          backgroundColor: Colors.green,
          behavior: SnackBarBehavior.floating,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(8),
          ),
        ),
      );
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(provider.error ?? 'Failed to delete purchase'),
          backgroundColor: Colors.red,
          behavior: SnackBarBehavior.floating,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(8),
          ),
        ),
      );
    }
  }
}
