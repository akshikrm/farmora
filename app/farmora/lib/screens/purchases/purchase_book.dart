import 'package:farmora/providers/purchase_book_provider.dart';
import 'package:farmora/providers/vendors_provider.dart';
import 'package:farmora/utils/colors.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';

class PurchaseBook extends StatefulWidget {
  const PurchaseBook({super.key});

  @override
  State<PurchaseBook> createState() => _PurchaseBookState();
}

class _PurchaseBookState extends State<PurchaseBook> {
  int? _selectedVendor;
  DateTime? _startDate;
  DateTime? _endDate;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<VendorsProvider>().fetchVendorNames();
      // _fetchData();
      context.read<PurchaseBookProvider>().clearPurchaseBookList();
    });
  }

  void _fetchData() {
    context.read<PurchaseBookProvider>().fetchPurchaseBook(
          vendorId: _selectedVendor,
          startDate: _startDate != null
              ? DateFormat('yyyy-MM-dd').format(_startDate!)
              : null,
          endDate: _endDate != null
              ? DateFormat('yyyy-MM-dd').format(_endDate!)
              : null,
        );
  }

  Future<void> _selectDate(BuildContext context, bool isStart) async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: DateTime.now(),
      firstDate: DateTime(2000),
      lastDate: DateTime(2101),
      builder: (context, child) {
        return Theme(
          data: Theme.of(context).copyWith(
            colorScheme: ColorScheme.light(
              primary: ColorUtils().primaryColor,
              onPrimary: Colors.white,
              onSurface: ColorUtils().textColor,
            ),
          ),
          child: child!,
        );
      },
    );
    if (picked != null) {
      setState(() {
        if (isStart) {
          _startDate = picked;
        } else {
          _endDate = picked;
        }
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: ColorUtils().backgroundColor,
        appBar: AppBar(
          title: Text(
            "Purchase Book",
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
        body: SingleChildScrollView(
          child: Column(
            children: [
              // Filters
              Container(
                padding: const EdgeInsets.all(16),
                color: Colors.white,
                child: Column(
                  children: [
                    // Vendor Dropdown
                    Consumer<VendorsProvider>(
                      builder: (context, vendorProvider, child) {
                        return DropdownButtonFormField<int>(
                          value: _selectedVendor,
                          decoration: InputDecoration(
                            labelText: "Filter by Vendor",
                            contentPadding: const EdgeInsets.symmetric(
                                horizontal: 12, vertical: 0),
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(8),
                            ),
                          ),
                          items: vendorProvider.vendorNames.map((e) {
                            return DropdownMenuItem<int>(
                              value: e['id'] as int?,
                              child: Text(e['name'].toString()),
                            );
                          }).toList(),
                          onChanged: (val) {
                            setState(() {
                              _selectedVendor = val;
                            });
                          },
                        );
                      },
                    ),
                    const SizedBox(height: 12),
                    // Date Pickers
                    Row(
                      children: [
                        Expanded(
                          child: InkWell(
                            onTap: () => _selectDate(context, true),
                            child: InputDecorator(
                              decoration: InputDecoration(
                                labelText: "Start Date",
                                contentPadding: const EdgeInsets.symmetric(
                                    horizontal: 12, vertical: 12),
                                border: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(8),
                                ),
                              ),
                              child: Text(
                                _startDate != null
                                    ? DateFormat('yyyy-MM-dd')
                                        .format(_startDate!)
                                    : "Select Date",
                                style: TextStyle(
                                    color: _startDate != null
                                        ? Colors.black
                                        : Colors.grey),
                              ),
                            ),
                          ),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: InkWell(
                            onTap: () => _selectDate(context, false),
                            child: InputDecorator(
                              decoration: InputDecoration(
                                labelText: "End Date",
                                contentPadding: const EdgeInsets.symmetric(
                                    horizontal: 12, vertical: 12),
                                border: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(8),
                                ),
                              ),
                              child: Text(
                                _endDate != null
                                    ? DateFormat('yyyy-MM-dd').format(_endDate!)
                                    : "Select Date",
                                style: TextStyle(
                                    color: _endDate != null
                                        ? Colors.black
                                        : Colors.grey),
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 16),
                    SizedBox(
                      width: double.infinity,
                      child: ElevatedButton(
                        onPressed: _fetchData,
                        style: ElevatedButton.styleFrom(
                          backgroundColor: ColorUtils().primaryColor,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(8),
                          ),
                        ),
                        child: const Text("Apply Filters",
                            style: TextStyle(color: Colors.white)),
                      ),
                    ),
                    // Clear Filters
                    TextButton(
                      onPressed: () {
                        setState(() {
                          _selectedVendor = null;
                          _startDate = null;
                          _endDate = null;
                        });
                        context
                            .read<PurchaseBookProvider>()
                            .clearPurchaseBookList();
                      },
                      child: Text("Clear Filters",
                          style: TextStyle(color: ColorUtils().primaryColor)),
                    )
                  ],
                ),
              ),
              // Summary Section

              SizedBox(
                height: 20,
              ),
              Consumer<PurchaseBookProvider>(
                builder: (context, provider, child) {
                  if (provider.isLoading || provider.purchaseBookList.isEmpty) {
                    return const SizedBox.shrink();
                  }

                  double totalQuantity = 0;
                  double totalAmount = 0;
                  double totalDiscount = 0;
                  double netAmount = 0;

                  for (var item in provider.purchaseBookList) {
                    totalQuantity +=
                        double.tryParse(item['quantity'].toString()) ?? 0;
                    totalAmount +=
                        double.tryParse(item['total_price'].toString()) ?? 0;
                    totalDiscount +=
                        double.tryParse(item['discount_price'].toString()) ?? 0;
                    netAmount +=
                        double.tryParse(item['net_amount'].toString()) ?? 0;
                  }

                  return Container(
                    margin: const EdgeInsets.fromLTRB(16, 0, 16, 16),
                    padding: const EdgeInsets.all(16),
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
                        Row(
                          children: [
                            Expanded(
                              child: _buildSummaryItem(
                                  "Total Quantity", "${totalQuantity.toInt()}"),
                            ),
                            Container(
                                width: 1,
                                height: 40,
                                color: Colors.grey.shade200),
                            Expanded(
                              child: _buildSummaryItem("Total Amount",
                                  "₹${totalAmount.toStringAsFixed(2)}"),
                            ),
                          ],
                        ),
                        const Divider(height: 24),
                        Row(
                          children: [
                            Expanded(
                              child: _buildSummaryItem("Total Discount",
                                  "₹${totalDiscount.toStringAsFixed(2)}"),
                            ),
                            Container(
                                width: 1,
                                height: 40,
                                color: Colors.grey.shade200),
                            Expanded(
                              child: _buildSummaryItem("Net Amount",
                                  "₹${netAmount.toStringAsFixed(2)}"),
                            ),
                          ],
                        ),
                      ],
                    ),
                  );
                },
              ),
              // List
              Consumer<PurchaseBookProvider>(
                builder: (context, provider, child) {
                  if (provider.isLoading) {
                    return const Center(child: CircularProgressIndicator());
                  }

                  if (provider.purchaseBookList.isEmpty) {
                    return Center(
                      child: Text("No records found",
                          style: TextStyle(color: ColorUtils().textColor)),
                    );
                  }

                  return ListView.separated(
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    padding: const EdgeInsets.all(16),
                    separatorBuilder: (_, __) => const SizedBox(height: 12),
                    itemCount: provider.purchaseBookList.length,
                    itemBuilder: (context, index) {
                      final item = provider.purchaseBookList[index];
                      final date = item['invoice_date'] != null
                          ? DateFormat('dd MMM yyyy')
                              .format(DateTime.parse(item['invoice_date']))
                          : 'N/A';
                      final vendorName = item['vendor']?['name'] ?? 'N/A';
                      final itemName = item['name'] ?? 'N/A';
                      final categoryName =
                          item['category']?['name'] ?? 'General';
                      final invoiceNumber = item['invoice_number'] ?? 'N/A';
                      final totalPrice = item['total_price'] ?? '0';

                      return Card(
                        margin: EdgeInsets.zero,
                        elevation: 4,
                        shadowColor: Colors.black.withOpacity(0.1),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(16),
                        ),
                        child: Container(
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(16),
                            color: Colors.white,
                          ),
                          child: Stack(
                            children: [
                              Padding(
                                padding: const EdgeInsets.all(20.0),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Row(
                                      crossAxisAlignment:
                                          CrossAxisAlignment.start,
                                      children: [
                                        Container(
                                          padding: const EdgeInsets.all(12),
                                          decoration: BoxDecoration(
                                            color: ColorUtils()
                                                .primaryColor
                                                .withOpacity(0.1),
                                            borderRadius:
                                                BorderRadius.circular(12),
                                          ),
                                          child: Icon(
                                            Icons.inventory_2_outlined,
                                            color: ColorUtils().primaryColor,
                                            size: 24,
                                          ),
                                        ),
                                        const SizedBox(width: 16),
                                        Expanded(
                                          child: Column(
                                            crossAxisAlignment:
                                                CrossAxisAlignment.start,
                                            children: [
                                              Text(
                                                itemName,
                                                style: TextStyle(
                                                  fontSize: 18,
                                                  fontWeight: FontWeight.bold,
                                                  color: ColorUtils().textColor,
                                                ),
                                              ),
                                              const SizedBox(height: 4),
                                              Row(
                                                children: [
                                                  Icon(
                                                      Icons.storefront_outlined,
                                                      size: 14,
                                                      color: Colors.grey[600]),
                                                  const SizedBox(width: 4),
                                                  Text(
                                                    vendorName,
                                                    style: TextStyle(
                                                      fontSize: 14,
                                                      color: Colors.grey[600],
                                                      fontWeight:
                                                          FontWeight.w500,
                                                    ),
                                                  ),
                                                ],
                                              ),
                                              const SizedBox(height: 4),
                                              Container(
                                                padding:
                                                    const EdgeInsets.symmetric(
                                                        horizontal: 8,
                                                        vertical: 2),
                                                decoration: BoxDecoration(
                                                  color: Colors.grey[100],
                                                  borderRadius:
                                                      BorderRadius.circular(4),
                                                ),
                                                child: Text(
                                                  categoryName,
                                                  style: TextStyle(
                                                    fontSize: 10,
                                                    color: Colors.grey[700],
                                                    fontWeight: FontWeight.w600,
                                                    letterSpacing: 0.5,
                                                  ),
                                                ),
                                              ),
                                            ],
                                          ),
                                        ),
                                      ],
                                    ),
                                    const SizedBox(height: 20),
                                    const Divider(height: 1),
                                    const SizedBox(height: 16),
                                    Row(
                                      mainAxisAlignment:
                                          MainAxisAlignment.spaceBetween,
                                      children: [
                                        _buildInfoItem(
                                            Icons.calendar_today_outlined,
                                            "Date",
                                            date),
                                        _buildInfoItem(
                                            Icons.receipt_long_outlined,
                                            "Invoice",
                                            invoiceNumber),
                                        _buildInfoItem(
                                            Icons.shopping_bag_outlined,
                                            "Qty",
                                            "${item['quantity']}"),
                                      ],
                                    ),
                                  ],
                                ),
                              ),
                              Positioned(
                                top: 16,
                                right: 16,
                                child: Container(
                                  padding: const EdgeInsets.symmetric(
                                      horizontal: 12, vertical: 6),
                                  decoration: BoxDecoration(
                                    gradient: LinearGradient(
                                      colors: [
                                        ColorUtils().primaryColor,
                                        ColorUtils().secondaryColor,
                                      ],
                                      begin: Alignment.topLeft,
                                      end: Alignment.bottomRight,
                                    ),
                                    borderRadius: BorderRadius.circular(20),
                                    boxShadow: [
                                      BoxShadow(
                                        color: ColorUtils()
                                            .primaryColor
                                            .withOpacity(0.3),
                                        blurRadius: 8,
                                        offset: const Offset(0, 4),
                                      ),
                                    ],
                                  ),
                                  child: Text(
                                    "₹$totalPrice",
                                    style: const TextStyle(
                                      color: Colors.white,
                                      fontWeight: FontWeight.bold,
                                      fontSize: 14,
                                    ),
                                  ),
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
            ],
          ),
        ));
  }

  Widget _buildSummaryItem(String label, String value) {
    return Column(
      children: [
        Text(
          label,
          style: TextStyle(
            fontSize: 12,
            color: Colors.grey[600],
            fontWeight: FontWeight.w500,
          ),
        ),
        const SizedBox(height: 4),
        Text(
          value,
          style: TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.bold,
            color: ColorUtils().primaryColor,
          ),
        ),
      ],
    );
  }

  Widget _buildInfoItem(IconData icon, String label, String value) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Icon(icon, size: 12, color: Colors.grey[400]),
            const SizedBox(width: 4),
            Text(
              label,
              style: TextStyle(
                fontSize: 10,
                color: Colors.grey[500],
                fontWeight: FontWeight.w500,
              ),
            ),
          ],
        ),
        const SizedBox(height: 2),
        Text(
          value,
          style: TextStyle(
            fontSize: 13,
            color: ColorUtils().textColor,
            fontWeight: FontWeight.w600,
          ),
        ),
      ],
    );
  }
}
