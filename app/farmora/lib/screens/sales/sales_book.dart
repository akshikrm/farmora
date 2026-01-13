import 'package:farmora/providers/sales/sales_provider.dart';
import 'package:farmora/providers/vendors_provider.dart';
import 'package:farmora/utils/colors.dart';
import 'package:farmora/utils/snackbar_utils.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';

class SalesBookPage extends StatefulWidget {
  const SalesBookPage({super.key});

  @override
  State<SalesBookPage> createState() => _SalesBookPageState();
}

class _SalesBookPageState extends State<SalesBookPage> {
  int? _selectedBuyer;
  DateTime? _startDate;
  DateTime? _endDate;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<VendorsProvider>().fetchVendorNames();
    });
  }

  Future<void> _selectDate(BuildContext context, bool isStart) async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: isStart
          ? (_startDate ?? DateTime.now())
          : (_endDate ?? DateTime.now()),
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

  void _applyFilters() {
    if (_selectedBuyer == null) {
      SnackbarUtils.showError("Please select a buyer first");
      return;
    }

    context.read<SalesProvider>().fetchSalesLedger(
          buyerId: _selectedBuyer!,
          startDate: _startDate != null
              ? DateFormat('yyyy-MM-dd').format(_startDate!)
              : null,
          endDate: _endDate != null
              ? DateFormat('yyyy-MM-dd').format(_endDate!)
              : null,
        );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: ColorUtils().backgroundColor,
      appBar: AppBar(
        centerTitle: false,
        title: Text(
          "Sales Book",
          style: TextStyle(
            color: ColorUtils().textColor,
            fontSize: 22,
          ),
        ),
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          icon: Icon(Icons.arrow_back_ios_new,
              size: 20, color: ColorUtils().textColor),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: Column(
        children: [
          _buildFilterSection(),
          Expanded(
            child: Consumer<SalesProvider>(
              builder: (context, provider, child) {
                if (provider.isLoading) {
                  return const Center(child: CircularProgressIndicator());
                }

                if (provider.salesLedger == null) {
                  return _buildEmptyState(
                      "Select a buyer and apply filters\nto view the ledger",
                      Icons.filter_alt_off_outlined);
                }

                final ledger = provider.salesLedger!;
                final openingBalance = ledger['opening_balance'] ?? 0;
                final closingBalance = ledger['closing_balance'] ?? 0;
                final transactions = ledger['transactions'] as List? ?? [];

                if (transactions.isEmpty &&
                    openingBalance == 0 &&
                    closingBalance == 0) {
                  return _buildEmptyState("No records found for this period",
                      Icons.hourglass_empty_rounded);
                }

                return ListView(
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  children: [
                    const SizedBox(height: 8),
                    _buildBalanceSummary(openingBalance, closingBalance),
                    const SizedBox(height: 20),
                    Row(
                      children: [
                        Icon(Icons.history,
                            size: 18, color: ColorUtils().textColor),
                        const SizedBox(width: 8),
                        Text(
                          "Transactions",
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                            color: ColorUtils().textColor,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),
                    ...transactions.map((tx) => _buildTransactionItem(tx)),
                    const SizedBox(height: 40),
                  ],
                );
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildEmptyState(String message, IconData icon) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Container(
            padding: const EdgeInsets.all(24),
            decoration: BoxDecoration(
              color: Colors.grey[100],
              shape: BoxShape.circle,
            ),
            child: Icon(icon, size: 48, color: Colors.grey[400]),
          ),
          const SizedBox(height: 16),
          Text(
            message,
            textAlign: TextAlign.center,
            style: TextStyle(
              color: Colors.grey[600],
              fontSize: 16,
              fontWeight: FontWeight.w500,
              height: 1.5,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildFilterSection() {
    return Container(
      margin: const EdgeInsets.fromLTRB(16, 8, 16, 16),
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(24),
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.08),
            blurRadius: 20,
            offset: const Offset(0, 8),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Consumer<VendorsProvider>(
            builder: (context, vendorsProvider, child) {
              return DropdownButtonFormField<int>(
                value: _selectedBuyer,
                decoration: InputDecoration(
                  labelText: "Select Buyer",
                  labelStyle: TextStyle(color: Colors.grey[600], fontSize: 14),
                  filled: true,
                  fillColor: Colors.grey[50],
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(12),
                    borderSide: BorderSide.none,
                  ),
                  contentPadding:
                      const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                  prefixIcon: Icon(Icons.person_outline,
                      color: ColorUtils().primaryColor),
                ),
                icon: const Icon(Icons.keyboard_arrow_down_rounded),
                items: vendorsProvider.vendorNames.map((e) {
                  return DropdownMenuItem<int>(
                    value: e['id'] as int?,
                    child: Text(
                      e['name'].toString(),
                      style: const TextStyle(fontWeight: FontWeight.w500),
                    ),
                  );
                }).toList(),
                onChanged: (val) => setState(() => _selectedBuyer = val),
              );
            },
          ),
          const SizedBox(height: 16),
          Row(
            children: [
              Expanded(
                  child: _buildDateSelector("Start Date", _startDate, true)),
              const SizedBox(width: 12),
              Expanded(child: _buildDateSelector("End Date", _endDate, false)),
            ],
          ),
          const SizedBox(height: 20),
          ElevatedButton(
            onPressed: _applyFilters,
            style: ElevatedButton.styleFrom(
              backgroundColor: ColorUtils().primaryColor,
              foregroundColor: Colors.white,
              elevation: 0,
              shadowColor: Colors.transparent,
              padding: const EdgeInsets.symmetric(vertical: 16),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12),
              ),
            ),
            child: const Text(
              "View Ledger",
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
                letterSpacing: 0.5,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildDateSelector(String label, DateTime? date, bool isStart) {
    return InkWell(
      onTap: () => _selectDate(context, isStart),
      borderRadius: BorderRadius.circular(12),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 12),
        decoration: BoxDecoration(
          color: Colors.grey[50],
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: Colors.grey[200]!),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              label,
              style: TextStyle(
                fontSize: 11,
                color: Colors.grey[500],
                fontWeight: FontWeight.w600,
              ),
            ),
            const SizedBox(height: 4),
            Row(
              children: [
                Icon(Icons.calendar_today_rounded,
                    size: 14, color: ColorUtils().primaryColor),
                const SizedBox(width: 6),
                Text(
                  date != null
                      ? DateFormat('dd MMM yy').format(date)
                      : "Select",
                  style: TextStyle(
                    fontSize: 13,
                    fontWeight: FontWeight.bold,
                    color: date != null ? Colors.grey[800] : Colors.grey[400],
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildBalanceSummary(dynamic opening, dynamic closing) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: ColorUtils().primaryColor,
        borderRadius: BorderRadius.circular(20),
        image: const DecorationImage(
          image: AssetImage("assets/images/pattern_bg.png"),
          fit: BoxFit.cover,
          opacity: 0.1,
        ), // Fallback if asset missing is smooth color
        boxShadow: [
          BoxShadow(
            color: ColorUtils().primaryColor.withOpacity(0.3),
            blurRadius: 16,
            offset: const Offset(0, 8),
          ),
        ],
      ),
      child: Row(
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  "Opening Balance",
                  style: TextStyle(
                    color: Colors.white.withOpacity(0.8),
                    fontSize: 12,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  "₹$opening",
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
          ),
          Container(width: 1, height: 40, color: Colors.white.withOpacity(0.2)),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                Text(
                  "Closing Balance",
                  style: TextStyle(
                    color: Colors.white.withOpacity(0.8),
                    fontSize: 12,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  "₹$closing",
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTransactionItem(Map<String, dynamic> tx) {
    final type = tx['type']?.toString().toUpperCase() ?? 'UNKNOWN';
    final isCash = type == 'CASH';
    final date = tx['created_date'] != null
        ? DateFormat('dd MMM').format(DateTime.parse(tx['created_date']))
        : '';
    final year = tx['created_date'] != null
        ? DateFormat('yyyy').format(DateTime.parse(tx['created_date']))
        : '';

    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.04),
            blurRadius: 12,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(16),
        child: IntrinsicHeight(
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // Date Strip
              Container(
                width: 60,
                color: isCash
                    ? const Color(0xFFE8F5E9)
                    : const Color(0xFFFFF3E0), // Green vs Orange tint
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      date,
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 14,
                        color: isCash ? Colors.green[800] : Colors.orange[900],
                      ),
                    ),
                    Text(
                      year,
                      style: TextStyle(
                        fontSize: 10,
                        color: isCash ? Colors.green[600] : Colors.orange[700],
                      ),
                    ),
                  ],
                ),
              ),
              Expanded(
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Container(
                            padding: const EdgeInsets.symmetric(
                                horizontal: 8, vertical: 3),
                            decoration: BoxDecoration(
                              color: isCash
                                  ? Colors.green.withOpacity(0.1)
                                  : Colors.orange.withOpacity(0.1),
                              borderRadius: BorderRadius.circular(6),
                            ),
                            child: Text(
                              type,
                              style: TextStyle(
                                fontSize: 10,
                                fontWeight: FontWeight.bold,
                                color: isCash
                                    ? Colors.green[700]
                                    : Colors.orange[800],
                                letterSpacing: 0.5,
                              ),
                            ),
                          ),
                          Text(
                            "₹${tx['amount']}",
                            style: TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.w800,
                              color: isCash
                                  ? const Color(0xFF2E7D32)
                                  : const Color(0xFFEF6C00),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 10),
                      if (tx['bird_no'] != null || tx['weight'] != null)
                        Row(
                          children: [
                            if (tx['bird_no'] != null &&
                                tx['bird_no'] != 0) ...[
                              _buildMetaItem(
                                  Icons.pest_control, "${tx['bird_no']} Birds"),
                              const SizedBox(width: 12),
                            ],
                            if (tx['weight'] != null && tx['weight'] != 0)
                              _buildMetaItem(Icons.scale, "${tx['weight']} kg"),
                          ],
                        ),
                      if (tx['price'] != null && tx['price'] != 0) ...[
                        const SizedBox(height: 6),
                        Text(
                          "@ ₹${tx['price']} per unit",
                          style: TextStyle(
                            fontSize: 11,
                            color: Colors.grey[500],
                            fontStyle: FontStyle.italic,
                          ),
                        ),
                      ],
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildMetaItem(IconData icon, String label) {
    return Row(
      children: [
        Icon(icon, size: 12, color: Colors.grey[400]),
        const SizedBox(width: 4),
        Text(
          label,
          style: TextStyle(
            fontSize: 12,
            color: Colors.grey[600],
            fontWeight: FontWeight.w500,
          ),
        ),
      ],
    );
  }
}
