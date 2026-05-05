import 'dart:async';
import 'package:farmora/providers/balance_sheet_provider.dart';
import 'package:farmora/utils/colors.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';

class BalanceSheetPage extends StatefulWidget {
  const BalanceSheetPage({super.key});

  @override
  State<BalanceSheetPage> createState() => _BalanceSheetPageState();
}

class _BalanceSheetPageState extends State<BalanceSheetPage> {
  final TextEditingController _searchController = TextEditingController();
  Timer? _debounce;
  String _searchQuery = '';

  @override
  void initState() {
    super.initState();
    _searchController.addListener(_onSearchChanged);
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<BalanceSheetProvider>().fetchBalanceSheet();
    });
  }

  void _onSearchChanged() {
    if (_debounce?.isActive ?? false) _debounce!.cancel();
    _debounce = Timer(const Duration(milliseconds: 500), () {
      if (_searchQuery != _searchController.text.toLowerCase()) {
        setState(() {
          _searchQuery = _searchController.text.toLowerCase();
        });
        context
            .read<BalanceSheetProvider>()
            .fetchBalanceSheet(purpose: _searchQuery);
      }
    });
  }

  @override
  void dispose() {
    _searchController.removeListener(_onSearchChanged);
    _searchController.dispose();
    _debounce?.cancel();
    super.dispose();
  }

  String formatCurrency(dynamic amount) {
    final number =
        amount is num ? amount : double.tryParse(amount.toString()) ?? 0.0;
    return NumberFormat.currency(
      locale: 'en_IN',
      symbol: '₹',
      decimalDigits: 2,
    ).format(number);
  }

  String formatDate(String dateStr) {
    try {
      final date = DateTime.parse(dateStr);
      return DateFormat('MMM dd, yyyy').format(date);
    } catch (e) {
      return dateStr;
    }
  }

  Future<void> _selectDateRange(BuildContext context) async {
    final provider = context.read<BalanceSheetProvider>();
    final DateTimeRange? picked = await showDateRangePicker(
      context: context,
      initialDateRange:
          DateTimeRange(start: provider.fromDate, end: provider.toDate),
      firstDate: DateTime(2020),
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
      provider.setDates(picked.start, picked.end);
    }
  }

  @override
  Widget build(BuildContext context) {
    final provider = context.watch<BalanceSheetProvider>();
    final data = provider.balanceSheetData;

    return Scaffold(
      backgroundColor: ColorUtils().backgroundColor,
      appBar: AppBar(
        title: const Text('Balance Sheet'),
        actions: [
          IconButton(
            icon: const Icon(Icons.calendar_month_outlined),
            onPressed: () => _selectDateRange(context),
          ),
        ],
      ),
      body: provider.isLoading
          ? const Center(child: CircularProgressIndicator())
          : provider.errorMessage != null
              ? _buildErrorPlaceholder(provider.errorMessage!)
              : data == null
                  ? _buildEmptyPlaceholder()
                  : RefreshIndicator(
                      onRefresh: () =>
                          provider.fetchBalanceSheet(purpose: _searchQuery),
                      child: SingleChildScrollView(
                        physics: const AlwaysScrollableScrollPhysics(),
                        padding: const EdgeInsets.symmetric(
                            horizontal: 16.0, vertical: 8),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            _buildDateRangeInfo(provider),
                            const SizedBox(height: 16),
                            _buildSearchField(),
                            const SizedBox(height: 16),
                            _buildSummaryGrid(data),
                            const SizedBox(height: 16),
                            _buildNetBalanceCard(data),
                            const SizedBox(height: 24),
                            _buildSectionHeader('Breakdown'),
                            const SizedBox(height: 12),
                            _buildBreakdownList(data),
                            const SizedBox(height: 24),
                            _buildSectionHeader('Recent Transactions'),
                            const SizedBox(height: 12),
                            _buildTransactionsList(data),
                            const SizedBox(height: 40),
                          ],
                        ),
                      ),
                    ),
    );
  }

  Widget _buildSearchField() {
    return Container(
      decoration: BoxDecoration(
        color: ColorUtils().cardColor,
        borderRadius: BorderRadius.circular(12),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.04),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: TextField(
        controller: _searchController,
        decoration: InputDecoration(
          hintText: 'Search by purpose...',
          hintStyle: TextStyle(color: Colors.grey[400], fontSize: 14),
          prefixIcon: Icon(Icons.search, color: Colors.grey[400], size: 20),
          suffixIcon: _searchController.text.isNotEmpty
              ? IconButton(
                  icon: const Icon(Icons.close, size: 18),
                  onPressed: () {
                    _searchController.clear();
                    context.read<BalanceSheetProvider>().fetchBalanceSheet();
                  },
                )
              : null,
          border: InputBorder.none,
          enabledBorder: InputBorder.none,
          focusedBorder: InputBorder.none,
          contentPadding: const EdgeInsets.symmetric(vertical: 12),
        ),
      ),
    );
  }

  Widget _buildDateRangeInfo(BalanceSheetProvider provider) {
    final fromStr = DateFormat('MMM dd').format(provider.fromDate);
    final toStr = DateFormat('MMM dd').format(provider.toDate);
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      decoration: BoxDecoration(
        color: ColorUtils().primaryColor.withOpacity(0.1),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Text(
        '$fromStr - $toStr',
        style: TextStyle(
          color: ColorUtils().primaryColor,
          fontSize: 12,
          fontWeight: FontWeight.w600,
        ),
      ),
    );
  }

  Widget _buildSectionHeader(String title) {
    return Text(
      title,
      style: TextStyle(
        fontSize: 18,
        fontWeight: FontWeight.bold,
        color: ColorUtils().textColor,
      ),
    );
  }

  Widget _buildSummaryGrid(Map<String, dynamic> data) {
    final openingBalance = data['opening_balance'] ?? 0;
    final summary = data['summary'] ?? {};
    final totalIn = summary['total_in'] ?? 0;
    final totalOut = summary['total_out'] ?? 0;
    final closingBalance = summary['closing_balance'] ?? 0;

    return GridView.count(
      crossAxisCount: 2,
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      crossAxisSpacing: 12,
      mainAxisSpacing: 12,
      childAspectRatio: 1.4,
      children: [
        _buildMetricCard('Opening Balance', openingBalance, Colors.blueGrey,
            Icons.account_balance_outlined),
        _buildMetricCard(
            'Total In', totalIn, Colors.green, Icons.arrow_downward_rounded),
        _buildMetricCard(
            'Total Out', totalOut, Colors.red, Icons.arrow_upward_rounded),
        _buildMetricCard('Closing Balance', closingBalance,
            ColorUtils().primaryColor, Icons.account_balance_wallet_outlined,
            isHighlighted: true),
      ],
    );
  }

  Widget _buildMetricCard(
      String title, dynamic value, Color color, IconData icon,
      {bool isHighlighted = false}) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: isHighlighted ? color : ColorUtils().cardColor,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.grey.withOpacity(0.05)),
        boxShadow: [
          BoxShadow(
              color: Colors.black.withOpacity(0.03),
              blurRadius: 8,
              offset: const Offset(0, 4)),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Container(
                padding: const EdgeInsets.all(6),
                decoration: BoxDecoration(
                  color: isHighlighted
                      ? Colors.white.withOpacity(0.2)
                      : color.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Icon(icon,
                    size: 16, color: isHighlighted ? Colors.white : color),
              ),
            ],
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                title,
                style: TextStyle(
                  fontSize: 11,
                  fontWeight: FontWeight.w500,
                  color: isHighlighted
                      ? Colors.white.withOpacity(0.9)
                      : Colors.grey[600],
                ),
              ),
              const SizedBox(height: 2),
              FittedBox(
                child: Text(
                  formatCurrency(value),
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                    color: isHighlighted ? Colors.white : color,
                    letterSpacing: -0.5,
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildNetBalanceCard(Map<String, dynamic> data) {
    final summary = data['summary'] ?? {};
    final liability = summary['liability'] ?? 0;
    final receivable = summary['receivable'] ?? 0;
    final net = summary['net'] ?? 0;

    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: ColorUtils().cardColor,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.grey.withOpacity(0.05)),
      ),
      child: Column(
        children: [
          _buildDetailListItem('Liability (Unpaid)', liability,
              Colors.orange[800]!, Icons.pending_actions),
          const Padding(
            padding: EdgeInsets.symmetric(vertical: 8.0),
            child: Divider(height: 1, thickness: 0.5),
          ),
          _buildDetailListItem('Receivable (Unpaid)', receivable,
              Colors.blue[800]!, Icons.call_received),
          const SizedBox(height: 16),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
            decoration: BoxDecoration(
              color: (net >= 0 ? Colors.green : Colors.red).withOpacity(0.05),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  children: [
                    Icon(Icons.pie_chart_outline,
                        size: 20, color: net >= 0 ? Colors.green : Colors.red),
                    const SizedBox(width: 8),
                    const Text('Net Balance',
                        style: TextStyle(
                            fontWeight: FontWeight.bold, fontSize: 14)),
                  ],
                ),
                Text(
                  formatCurrency(net),
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 16,
                    color: net >= 0 ? Colors.green[700] : Colors.red[700],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildDetailListItem(
      String label, dynamic value, Color color, IconData icon) {
    return Row(
      children: [
        Icon(icon, size: 18, color: color.withOpacity(0.7)),
        const SizedBox(width: 12),
        Text(label,
            style: TextStyle(
                color: ColorUtils().textColor.withOpacity(0.8), fontSize: 13)),
        const Spacer(),
        Text(
          formatCurrency(value),
          style: TextStyle(
              fontWeight: FontWeight.w700, color: color, fontSize: 14),
        ),
      ],
    );
  }

  Widget _buildBreakdownList(Map<String, dynamic> data) {
    final breakdown = data['breakdown'] ?? {};

    final items = [
      {
        'label': 'Purchases',
        'in': breakdown['purchases']?['in'] ?? 0,
        'out': breakdown['purchases']?['out'] ?? 0,
        'pending': breakdown['purchases']?['liability'] ?? 0,
        'pendingLabel': 'Liability'
      },
      {
        'label': 'Sales',
        'in': breakdown['sales']?['in'] ?? 0,
        'out': 0,
        'pending': breakdown['sales']?['receivable'] ?? 0,
        'pendingLabel': 'Receivable'
      },
      {
        'label': 'Purchase Returns',
        'in': breakdown['purchase_returns']?['in'] ?? 0,
        'out': 0,
        'pending': breakdown['purchase_returns']?['liability_reduction'] ?? 0,
        'pendingLabel': 'Liability Reduction'
      },
      {
        'label': 'Working Costs',
        'in': breakdown['working_costs']?['in'] ?? 0,
        'out': breakdown['working_costs']?['out'] ?? 0,
        'pending': 0,
        'pendingLabel': ''
      },
      {
        'label': 'General Expenses',
        'in': 0,
        'out': breakdown['general_expenses']?['out'] ?? 0,
        'pending': 0,
        'pendingLabel': ''
      },
      {
        'label': 'Expense Sales',
        'in': breakdown['expense_sales']?['in'] ?? 0,
        'out': 0,
        'pending': 0,
        'pendingLabel': ''
      },
      {
        'label': 'Integration Books',
        'in': 0,
        'out': breakdown['integration_books']?['out'] ?? 0,
        'pending': breakdown['integration_books']?['liability'] ?? 0,
        'pendingLabel': 'Liability'
      },
    ];

    return ListView.separated(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      itemCount: items.length,
      separatorBuilder: (context, index) => const SizedBox(height: 10),
      itemBuilder: (context, index) {
        final item = items[index];
        final num inVal = item['in'] as num;
        final num outVal = item['out'] as num;
        final num pendingVal = item['pending'] as num;

        return Container(
          padding: const EdgeInsets.all(12),
          decoration: BoxDecoration(
            color: ColorUtils().cardColor,
            borderRadius: BorderRadius.circular(14),
            border: Border.all(color: Colors.grey.withOpacity(0.05)),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(item['label'].toString(),
                  style: const TextStyle(
                      fontWeight: FontWeight.bold, fontSize: 14)),
              const SizedBox(height: 8),
              Row(
                children: [
                  if (inVal > 0) _buildInOutputItem('In', inVal, Colors.green),
                  if (inVal > 0 && outVal > 0) const SizedBox(width: 16),
                  if (outVal > 0) _buildInOutputItem('Out', outVal, Colors.red),
                  const Spacer(),
                  if (pendingVal > 0)
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.end,
                      children: [
                        Text(item['pendingLabel'].toString(),
                            style: TextStyle(
                                fontSize: 10, color: Colors.grey[600])),
                        Text(formatCurrency(pendingVal),
                            style: const TextStyle(
                                fontSize: 12,
                                fontWeight: FontWeight.w600,
                                color: Colors.orange)),
                      ],
                    ),
                ],
              ),
            ],
          ),
        );
      },
    );
  }

  Widget _buildInOutputItem(String label, dynamic value, Color color) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label, style: TextStyle(fontSize: 10, color: Colors.grey[600])),
        Text(formatCurrency(value),
            style: TextStyle(
                fontSize: 12, fontWeight: FontWeight.w600, color: color)),
      ],
    );
  }

  Widget _buildTransactionsList(Map<String, dynamic> data) {
    final List transactions = data['transactions'] ?? [];

    if (transactions.isEmpty) {
      return Container(
        width: double.infinity,
        padding: const EdgeInsets.all(32),
        decoration: BoxDecoration(
          color: ColorUtils().cardColor,
          borderRadius: BorderRadius.circular(16),
        ),
        child: Column(
          children: [
            Icon(Icons.history_toggle_off, size: 48, color: Colors.grey[300]),
            const SizedBox(height: 12),
            const Text('No transactions found',
                style: TextStyle(color: Colors.grey, fontSize: 13)),
          ],
        ),
      );
    }

    return ListView.separated(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      itemCount: transactions.length,
      separatorBuilder: (context, index) => const SizedBox(height: 12),
      itemBuilder: (context, index) {
        final t = transactions[index];
        final type = t['type'] ?? 'in';
        final bool isIn = type == 'in';

        return Container(
          padding: const EdgeInsets.all(12),
          decoration: BoxDecoration(
            color: ColorUtils().cardColor,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: Colors.grey.withOpacity(0.05)),
          ),
          child: Row(
            children: [
              Container(
                width: 44,
                height: 44,
                decoration: BoxDecoration(
                  color: (isIn ? Colors.green : Colors.red).withOpacity(0.08),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Icon(
                  isIn
                      ? Icons.arrow_downward_rounded
                      : Icons.arrow_upward_rounded,
                  color: isIn ? Colors.green : Colors.red,
                  size: 20,
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      t['purpose'].toString(),
                      style: const TextStyle(
                          fontWeight: FontWeight.bold, fontSize: 14),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                    const SizedBox(height: 4),
                    Text(
                      formatDate(t['date'].toString()),
                      style: TextStyle(color: Colors.grey[500], fontSize: 11),
                    ),
                  ],
                ),
              ),
              Column(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  Text(
                    '${isIn ? "+" : "-"} ${formatCurrency(t['amount'])}',
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 14,
                      color: isIn ? Colors.green[700] : Colors.red[700],
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    'Bal: ${formatCurrency(t['balance'])}',
                    style: TextStyle(
                        color: Colors.grey[700],
                        fontSize: 10,
                        fontWeight: FontWeight.w500),
                  ),
                ],
              ),
            ],
          ),
        );
      },
    );
  }

  Widget _buildErrorPlaceholder(String error) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(Icons.error_outline, size: 64, color: Colors.redAccent),
            const SizedBox(height: 16),
            Text('Oops! Something went wrong',
                style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    color: ColorUtils().textColor)),
            const SizedBox(height: 8),
            Text(error,
                textAlign: TextAlign.center,
                style: TextStyle(color: Colors.grey[600], fontSize: 14)),
            const SizedBox(height: 24),
            ElevatedButton(
              onPressed: () => context
                  .read<BalanceSheetProvider>()
                  .fetchBalanceSheet(purpose: _searchQuery),
              child: const Text('Try Again'),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildEmptyPlaceholder() {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(32.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.account_balance_wallet_outlined,
                size: 80, color: Colors.grey[200]),
            const SizedBox(height: 24),
            Text('No Data Found',
                style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                    color: ColorUtils().textColor)),
            const SizedBox(height: 12),
            Text(
                'Apply filters or change the date range to view the balance sheet.',
                textAlign: TextAlign.center,
                style: TextStyle(color: Colors.grey[600], fontSize: 14)),
          ],
        ),
      ),
    );
  }
}
