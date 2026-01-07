import 'package:farmora/providers/sales/sales_provider.dart';
import 'package:farmora/screens/sales/add_sale.dart';
import 'package:farmora/utils/colors.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';

class SalesListingPage extends StatefulWidget {
  const SalesListingPage({super.key});

  @override
  State<SalesListingPage> createState() => _SalesListingPageState();
}

class _SalesListingPageState extends State<SalesListingPage> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<SalesProvider>().fetchSalesEntries();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: ColorUtils().backgroundColor,
      appBar: AppBar(
        title: Text(
          "Sales",
          style: TextStyle(
              color: ColorUtils().textColor, fontWeight: FontWeight.bold),
        ),
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          icon: Icon(Icons.arrow_back, color: ColorUtils().textColor),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => const AddSalePage(),
            ),
          ).then((_) {
            if (mounted) {
              context.read<SalesProvider>().fetchSalesEntries();
            }
          });
        },
        backgroundColor: ColorUtils().primaryColor,
        child: const Icon(Icons.add, color: Colors.white),
      ),
      body: Consumer<SalesProvider>(
        builder: (context, provider, child) {
          if (provider.isLoading) {
            return const Center(child: CircularProgressIndicator());
          }

          if (provider.salesList.isEmpty) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Container(
                    padding: const EdgeInsets.all(24),
                    decoration: BoxDecoration(
                      color: Colors.grey[50],
                      shape: BoxShape.circle,
                    ),
                    child: Icon(Icons.receipt_long_outlined,
                        size: 48, color: Colors.grey[400]),
                  ),
                  const SizedBox(height: 16),
                  Text(
                    "No sales records yet",
                    style: TextStyle(
                      color: Colors.grey[600],
                      fontSize: 16,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ],
              ),
            );
          }

          return ListView.separated(
            padding: const EdgeInsets.fromLTRB(16, 16, 16, 80),
            separatorBuilder: (_, __) => const SizedBox(height: 16),
            itemCount: provider.salesList.length,
            itemBuilder: (context, index) {
              final item = provider.salesList[index];

              final double weight =
                  double.tryParse(item['weight']?.toString() ?? '0') ?? 0;
              final int birds =
                  int.tryParse(item['bird_no']?.toString() ?? '0') ?? 0;
              final paymentType =
                  item['payment_type']?.toString().toUpperCase() ?? 'N/A';
              final isPaid = paymentType == 'PAID' || paymentType == 'CASH';

              String formattedDate = '';
              if (item['date'] != null) {
                try {
                  final dateObj = DateTime.parse(item['date'].toString());
                  formattedDate = DateFormat('dd MMM, yyyy').format(dateObj);
                } catch (e) {
                  formattedDate = item['date'].toString();
                }
              }

              final buyerName = item['buyer']?['name'] ?? 'Unknown Buyer';
              final initial =
                  buyerName.isNotEmpty ? buyerName[0].toUpperCase() : '?';

              return Container(
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(16),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.grey.withOpacity(0.06),
                      blurRadius: 16,
                      offset: const Offset(0, 6),
                    ),
                  ],
                ),
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(16),
                  child: Stack(
                    children: [
                      // Status Indicator Bar
                      Positioned(
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: 4,
                        child: Container(
                          color: isPaid
                              ? const Color(0xFF43A047)
                              : const Color(0xFFFB8C00),
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.only(left: 12),
                        child: Column(
                          children: [
                            Padding(
                              padding: const EdgeInsets.all(16),
                              child: Row(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  // Buyer Avatar
                                  Container(
                                    width: 42,
                                    height: 42,
                                    decoration: BoxDecoration(
                                      color: ColorUtils()
                                          .primaryColor
                                          .withOpacity(0.08),
                                      shape: BoxShape.circle,
                                    ),
                                    alignment: Alignment.center,
                                    child: Text(
                                      initial,
                                      style: TextStyle(
                                        fontSize: 18,
                                        fontWeight: FontWeight.bold,
                                        color: ColorUtils().primaryColor,
                                      ),
                                    ),
                                  ),
                                  const SizedBox(width: 14),
                                  Expanded(
                                    child: Column(
                                      crossAxisAlignment:
                                          CrossAxisAlignment.start,
                                      children: [
                                        Text(
                                          buyerName,
                                          style: TextStyle(
                                            fontSize: 16,
                                            fontWeight: FontWeight.bold,
                                            color: Colors.grey[800],
                                          ),
                                        ),
                                        const SizedBox(height: 4),
                                        Text(
                                          formattedDate,
                                          style: TextStyle(
                                            fontSize: 12,
                                            color: Colors.grey[500],
                                            fontWeight: FontWeight.w500,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                  Column(
                                    crossAxisAlignment: CrossAxisAlignment.end,
                                    children: [
                                      Text(
                                        "₹${item['amount'] ?? '0'}",
                                        style: TextStyle(
                                          fontSize: 18,
                                          fontWeight: FontWeight.w800,
                                          color: isPaid
                                              ? const Color(0xFF2E7D32)
                                              : const Color(0xFFEF6C00),
                                        ),
                                      ),
                                      const SizedBox(height: 6),
                                      Container(
                                        padding: const EdgeInsets.symmetric(
                                            horizontal: 8, vertical: 3),
                                        decoration: BoxDecoration(
                                          color: isPaid
                                              ? Colors.green.withOpacity(0.08)
                                              : Colors.orange.withOpacity(0.08),
                                          borderRadius:
                                              BorderRadius.circular(6),
                                        ),
                                        child: Text(
                                          paymentType,
                                          style: TextStyle(
                                            fontSize: 10,
                                            fontWeight: FontWeight.bold,
                                            color: isPaid
                                                ? Colors.green[700]
                                                : Colors.orange[800],
                                            letterSpacing: 0.5,
                                          ),
                                        ),
                                      ),
                                    ],
                                  ),
                                ],
                              ),
                            ),

                            // Stats Grid
                            Container(
                              margin:
                                  const EdgeInsets.symmetric(horizontal: 16),
                              padding: const EdgeInsets.symmetric(
                                  vertical: 12, horizontal: 16),
                              decoration: BoxDecoration(
                                color: Colors
                                    .grey[50], // Subtle background for stats
                                borderRadius: BorderRadius.circular(12),
                              ),
                              child: Row(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceBetween,
                                children: [
                                  _buildStatItem("Weight",
                                      "${weight.toStringAsFixed(1)} kg"),
                                  Container(
                                      height: 24,
                                      width: 1,
                                      color: Colors.grey[200]),
                                  _buildStatItem("Birds", "$birds"),
                                  Container(
                                      height: 24,
                                      width: 1,
                                      color: Colors.grey[200]),
                                  _buildStatItem(
                                      "Price", "₹${item['price'] ?? '0'}"),
                                ],
                              ),
                            ),

                            const SizedBox(height: 16),

                            // Footer Info
                            Padding(
                              padding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
                              child: Row(
                                children: [
                                  Icon(Icons.inventory_2_outlined,
                                      size: 14, color: Colors.grey[400]),
                                  const SizedBox(width: 6),
                                  Expanded(
                                    child: Text(
                                      "${item['season']?['name'] ?? ''} • ${item['batch']?['name'] ?? ''}",
                                      style: TextStyle(
                                        fontSize: 12,
                                        color: Colors.grey[500],
                                        fontWeight: FontWeight.w500,
                                      ),
                                      maxLines: 1,
                                      overflow: TextOverflow.ellipsis,
                                    ),
                                  ),
                                  Container(
                                    padding: const EdgeInsets.symmetric(
                                        horizontal: 8, vertical: 4),
                                    decoration: BoxDecoration(
                                      color: Colors.blueGrey.withOpacity(0.05),
                                      borderRadius: BorderRadius.circular(6),
                                    ),
                                    child: Row(
                                      children: [
                                        Icon(Icons.local_shipping_outlined,
                                            size: 12,
                                            color: Colors.blueGrey[400]),
                                        const SizedBox(width: 4),
                                        Text(
                                          item['vehicle_no'] ?? 'N/A',
                                          style: TextStyle(
                                            fontSize: 11,
                                            fontWeight: FontWeight.w600,
                                            color: Colors.blueGrey[600],
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              );
            },
          );
        },
      ),
    );
  }

  Widget _buildStatItem(String label, String value) {
    return Expanded(
      child: Column(
        children: [
          Text(label, style: TextStyle(fontSize: 11, color: Colors.grey[500])),
          const SizedBox(height: 2),
          Text(
            value,
            style: TextStyle(
              fontSize: 13,
              fontWeight: FontWeight.bold,
              color: Colors.grey[800],
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }
}
