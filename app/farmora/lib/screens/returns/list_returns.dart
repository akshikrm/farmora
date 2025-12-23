import 'package:farmora/providers/auth/authProvider.dart';
import 'package:farmora/providers/vendors_provider.dart';
import 'package:farmora/screens/returns/add_returns.dart';
import 'package:farmora/utils/colors.dart';
import 'package:farmora/utils/navigationUtils.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';

class ListReturns extends StatefulWidget {
  const ListReturns({super.key});

  @override
  State<ListReturns> createState() => _ListReturnsState();
}

class _ListReturnsState extends State<ListReturns> {
  @override
  void initState() {
    super.initState();
    Future.delayed(Duration.zero, () {
      context.read<VendorsProvider>().fetchReturns();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: ColorUtils().backgroundColor,
      appBar: AppBar(
        title: Text(
          "Returns",
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
        backgroundColor: ColorUtils().primaryColor,
        child: Icon(Icons.add, color: Colors.white),
        onPressed: () {
          NavigationUtils.navigateTo(context, const AddReturns());
        },
      ),
      body: Consumer<VendorsProvider>(builder: (context, provider, child) {
        return provider.returns.isEmpty
            ? Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(Icons.assignment_return_outlined,
                        size: 64, color: Colors.grey),
                    SizedBox(height: 16),
                    Text("No returns found",
                        style: TextStyle(color: ColorUtils().textColor)),
                  ],
                ),
              )
            : ListView.separated(
                padding: const EdgeInsets.all(16),
                separatorBuilder: (context, index) =>
                    const SizedBox(height: 16),
                itemCount: provider.returns.length,
                itemBuilder: (context, index) {
                  final item = provider.returns[index];
                  final isVendor = item['return_type'] == 'vendor';
                  final targetName = isVendor
                      ? (item['to_vendor_data'] != null
                          ? item['to_vendor_data']['name']
                          : 'N/A')
                      : (item['to_batch_data'] != null
                          ? item['to_batch_data']['name']
                          : 'N/A');
                  final sourceName = item['from_batch_data'] != null
                      ? item['from_batch_data']['name']
                      : 'N/A';
                  final date = item['date'] != null
                      ? DateFormat('dd MMM yyyy')
                          .format(DateTime.parse(item['date']))
                      : 'N/A';
                  final categoryName = item['category'] != null
                      ? item['category']['name']
                      : 'General';
                  final totalAmount = item['total_amount'] ?? '0';

                  return Container(
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(16),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.grey.withOpacity(0.1),
                          blurRadius: 10,
                          offset: const Offset(0, 4),
                        ),
                      ],
                    ),
                    child: Column(
                      children: [
                        // Header
                        Padding(
                          padding: const EdgeInsets.all(16.0),
                          child: Row(
                            children: [
                              CircleAvatar(
                                radius: 20,
                                backgroundColor:
                                    ColorUtils().primaryColor.withOpacity(0.1),
                                child: Text(
                                  categoryName[0].toUpperCase(),
                                  style: TextStyle(
                                    color: ColorUtils().primaryColor,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ),
                              const SizedBox(width: 12),
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      categoryName,
                                      style: TextStyle(
                                        fontWeight: FontWeight.bold,
                                        fontSize: 16,
                                        color: ColorUtils().textColor,
                                      ),
                                    ),
                                    const SizedBox(height: 4),
                                    Text(
                                      date,
                                      style: TextStyle(
                                        color: Colors.grey[500],
                                        fontSize: 12,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                              Container(
                                padding: const EdgeInsets.symmetric(
                                    horizontal: 10, vertical: 6),
                                decoration: BoxDecoration(
                                  color: item['status'] == 'completed'
                                      ? Colors.green.withOpacity(0.1)
                                      : Colors.orange.withOpacity(0.1),
                                  borderRadius: BorderRadius.circular(20),
                                ),
                                child: Text(
                                  item['status'].toString().toUpperCase(),
                                  style: TextStyle(
                                    color: item['status'] == 'completed'
                                        ? Colors.green
                                        : Colors.orange,
                                    fontSize: 10,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                        // Flow Section (From -> To)
                        Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 16.0),
                          child: Row(
                            children: [
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      "FROM",
                                      style: TextStyle(
                                        fontSize: 10,
                                        color: Colors.grey[400],
                                        fontWeight: FontWeight.bold,
                                        letterSpacing: 1.0,
                                      ),
                                    ),
                                    const SizedBox(height: 4),
                                    Text(
                                      sourceName,
                                      style: TextStyle(
                                        fontSize: 14,
                                        fontWeight: FontWeight.w600,
                                        color: ColorUtils().textColor,
                                      ),
                                      maxLines: 1,
                                      overflow: TextOverflow.ellipsis,
                                    ),
                                  ],
                                ),
                              ),
                              Padding(
                                padding:
                                    const EdgeInsets.symmetric(horizontal: 8.0),
                                child: Icon(
                                  Icons.arrow_forward,
                                  color: Colors.grey[300],
                                  size: 20,
                                ),
                              ),
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.end,
                                  children: [
                                    Text(
                                      "TO (${item['return_type'].toString().toUpperCase()})",
                                      style: TextStyle(
                                        fontSize: 10,
                                        color: Colors.grey[400],
                                        fontWeight: FontWeight.bold,
                                        letterSpacing: 1.0,
                                      ),
                                    ),
                                    const SizedBox(height: 4),
                                    Text(
                                      targetName,
                                      style: TextStyle(
                                        fontSize: 14,
                                        fontWeight: FontWeight.w600,
                                        color: ColorUtils().textColor,
                                      ),
                                      maxLines: 1,
                                      overflow: TextOverflow.ellipsis,
                                    ),
                                  ],
                                ),
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(height: 16),
                        // Footer
                        Container(
                          padding: const EdgeInsets.symmetric(
                              horizontal: 16, vertical: 12),
                          decoration: BoxDecoration(
                            color: ColorUtils().primaryColor.withOpacity(0.05),
                            borderRadius: const BorderRadius.only(
                              bottomLeft: Radius.circular(16),
                              bottomRight: Radius.circular(16),
                            ),
                          ),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Row(
                                    children: [
                                      Text(
                                        "Qty: ",
                                        style: TextStyle(
                                          fontSize: 12,
                                          color: Colors.grey[600],
                                        ),
                                      ),
                                      Text(
                                        "${item['quantity']}",
                                        style: TextStyle(
                                          fontWeight: FontWeight.bold,
                                          fontSize: 13,
                                          color: ColorUtils().textColor,
                                        ),
                                      ),
                                    ],
                                  ),
                                  Text(
                                    "@ ₹${item['rate_per_bag']}/bag",
                                    style: TextStyle(
                                      fontSize: 11,
                                      color: Colors.grey[500],
                                    ),
                                  ),
                                ],
                              ),
                              Row(
                                children: [
                                  Text(
                                    "₹$totalAmount",
                                    style: TextStyle(
                                      fontSize: 18,
                                      fontWeight: FontWeight.bold,
                                      color: ColorUtils().primaryColor,
                                    ),
                                  ),
                                  const SizedBox(width: 8),
                                  Container(
                                    height: 24,
                                    width: 1,
                                    color: Colors.grey[300],
                                  ),
                                  IconButton(
                                    icon: const Icon(Icons.edit_outlined,
                                        size: 20),
                                    color: Colors.grey[600],
                                    constraints: const BoxConstraints(),
                                    padding: const EdgeInsets.only(left: 8),
                                    onPressed: () {
                                      NavigationUtils.navigateTo(context,
                                          AddReturns(returnData: item));
                                    },
                                  ),
                                ],
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  );
                },
              );
      }),
    );
  }
}
