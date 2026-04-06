import 'package:flutter/material.dart';
import 'package:farmora/utils/colors.dart';
import 'package:farmora/utils/webService.dart';
import 'package:farmora/urls/urls.dart';
import 'package:intl/intl.dart';
import 'package:farmora/screens/purchases/add_purchase.dart';
import 'package:farmora/screens/sales/add_sale.dart';
import 'package:farmora/screens/returns/add_returns.dart';

class BatchOverviewPage extends StatefulWidget {
  const BatchOverviewPage({super.key});

  @override
  State<BatchOverviewPage> createState() => _BatchOverviewPageState();
}

class _BatchOverviewPageState extends State<BatchOverviewPage> {
  final WebService _webService = WebService();

  bool _isLoadingSeasons = true;
  bool _isLoadingBatches = false;
  bool _isLoadingOverview = false;

  Map<String, dynamic>? _selectedSeason;
  Map<String, dynamic>? _selectedBatch;
  Map<String, dynamic>? _overviewData;

  List<Map<String, dynamic>> _seasons = [];
  List<Map<String, dynamic>> _allBatches = [];
  List<Map<String, dynamic>> _filteredBatches = [];

  @override
  void initState() {
    super.initState();
    _fetchSeasons();
    _fetchBatches();
  }

  Future<void> _fetchSeasons() async {
    try {
      setState(() {
        _isLoadingSeasons = true;
      });

      final response = await _webService.get(Urls.seasons);

      if (!mounted) return;

      if (response['status'] == 'success') {
        setState(() {
          _seasons =
              List<Map<String, dynamic>>.from(response['data']['data'] ?? []);
          _isLoadingSeasons = false;
        });
      } else {
        setState(() {
          _isLoadingSeasons = false;
        });
      }
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _isLoadingSeasons = false;
      });
    }
  }

  Future<void> _fetchBatches() async {
    try {
      setState(() {
        _isLoadingBatches = true;
      });

      final response = await _webService.get(Urls.batches);

      if (!mounted) return;

      if (response['status'] == 'success') {
        setState(() {
          _allBatches =
              List<Map<String, dynamic>>.from(response['data']['data'] ?? []);
          _isLoadingBatches = false;
        });
      } else {
        setState(() {
          _isLoadingBatches = false;
        });
      }
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _isLoadingBatches = false;
      });
    }
  }

  void _onSeasonSelected(Map<String, dynamic>? season) {
    setState(() {
      _selectedSeason = season;
      _selectedBatch = null;
      _overviewData = null;

      if (season != null) {
        // Filter batches by selected season
        _filteredBatches = _allBatches
            .where((batch) => batch['season']?['id'] == season['id'])
            .toList();
      } else {
        _filteredBatches = [];
      }
    });
  }

  Future<void> _fetchBatchOverview(int batchId) async {
    try {
      setState(() {
        _isLoadingOverview = true;
      });

      final response =
          await _webService.get('${Urls.batchOverview}?batch_id=$batchId');

      if (!mounted) return;

      if (response['status'] == 'success') {
        setState(() {
          _overviewData = response['data'];
          _isLoadingOverview = false;
        });
      } else {
        setState(() {
          _isLoadingOverview = false;
        });
      }
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _isLoadingOverview = false;
      });
    }
  }

  void _onBatchSelected(Map<String, dynamic>? batch) {
    setState(() {
      _selectedBatch = batch;
      _overviewData = null;
    });

    if (batch != null && batch['id'] != null) {
      _fetchBatchOverview(batch['id']);
    }
  }

  double _toDouble(dynamic value) {
    if (value == null) return 0.0;
    if (value is num) return value.toDouble();
    if (value is String) return double.tryParse(value) ?? 0.0;
    return 0.0;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Batch Overview'),
        backgroundColor: Colors.white,
      ),
      body: Column(
        children: [
          // Selection Section
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Colors.white,
              boxShadow: [
                BoxShadow(
                  color: Colors.grey.withOpacity(0.1),
                  blurRadius: 4,
                  offset: const Offset(0, 2),
                ),
              ],
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                // Season Dropdown
                Text(
                  'Select Season',
                  style: TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.w600,
                    color: ColorUtils().textColor,
                  ),
                ),
                const SizedBox(height: 8),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(color: Colors.grey.withOpacity(0.3)),
                  ),
                  child: DropdownButtonHideUnderline(
                    child: DropdownButton<Map<String, dynamic>>(
                      value: _selectedSeason,
                      isExpanded: true,
                      hint: Text(
                        _isLoadingSeasons
                            ? 'Loading seasons...'
                            : 'Select a season',
                        style: TextStyle(color: Colors.grey[600]),
                      ),
                      items: _seasons.map((season) {
                        return DropdownMenuItem<Map<String, dynamic>>(
                          value: season,
                          child: Text(
                            season['name'] ?? 'Unknown',
                            style: TextStyle(color: ColorUtils().textColor),
                          ),
                        );
                      }).toList(),
                      onChanged: _isLoadingSeasons ? null : _onSeasonSelected,
                    ),
                  ),
                ),
                const SizedBox(height: 16),

                // Batch Dropdown
                Text(
                  'Select Batch',
                  style: TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.w600,
                    color: ColorUtils().textColor,
                  ),
                ),
                const SizedBox(height: 8),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(color: Colors.grey.withOpacity(0.3)),
                  ),
                  child: DropdownButtonHideUnderline(
                    child: DropdownButton<Map<String, dynamic>>(
                      value: _selectedBatch,
                      isExpanded: true,
                      hint: Text(
                        _selectedSeason == null
                            ? 'Select a season first'
                            : _isLoadingBatches
                                ? 'Loading batches...'
                                : _filteredBatches.isEmpty
                                    ? 'No batches found'
                                    : 'Select a batch',
                        style: TextStyle(color: Colors.grey[600]),
                      ),
                      items: _filteredBatches.map((batch) {
                        return DropdownMenuItem<Map<String, dynamic>>(
                          value: batch,
                          child: Text(
                            batch['name'] ?? 'Unknown',
                            style: TextStyle(color: ColorUtils().textColor),
                          ),
                        );
                      }).toList(),
                      onChanged: _selectedSeason == null || _isLoadingBatches
                          ? null
                          : _onBatchSelected,
                    ),
                  ),
                ),
              ],
            ),
          ),

          // Overview Data Section
          Expanded(
            child: _isLoadingOverview
                ? const Center(child: CircularProgressIndicator())
                : _overviewData == null
                    ? Center(
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Icon(
                              Icons.analytics_outlined,
                              size: 64,
                              color: Colors.grey[400],
                            ),
                            const SizedBox(height: 16),
                            Text(
                              'Select a batch to view overview',
                              style: TextStyle(
                                color: Colors.grey[600],
                                fontSize: 16,
                              ),
                            ),
                          ],
                        ),
                      )
                    : _buildOverviewContent(),
          ),
        ],
      ),
    );
  }

  Widget _buildOverviewContent() {
    final batch = _overviewData?['batch'];
    final expenses =
        List<Map<String, dynamic>>.from(_overviewData?['expenses'] ?? []);
    final sales =
        List<Map<String, dynamic>>.from(_overviewData?['sales'] ?? []);
    final returns =
        List<Map<String, dynamic>>.from(_overviewData?['returns'] ?? []);

    // Extract pre-calculated metrics from API
    final calcs = _overviewData?['overviewCalculations'] ?? {};

    final totalPurchaseAmount = _toDouble(calcs['total_purchase_amount']);
    final totalPurchaseFeeds = _toDouble(calcs['total_purchase_feeds']);
    final totalSaleAmount = _toDouble(calcs['total_sale_amount']);
    final totalWeight = _toDouble(calcs['total_sale_weight']);
    final totalSaleCount = _toDouble(calcs['total_sale_birds']);
    final totalReturnAmount = _toDouble(calcs['total_returned_amount']);
    final totalReturnFeeds = _toDouble(calcs['total_returned_feeds']);

    final averageWeight = _toDouble(calcs['avg_weight']);
    final fcr = _toDouble(calcs['fcr']);
    final cfcr = _toDouble(calcs['cfcr']);
    final totalExpenseFromApi = _toDouble(calcs['total_expense']);

    final divisor = totalWeight != 0 ? totalWeight : 1.0;
    final avgCost = totalExpenseFromApi / divisor;
    final avgRate = totalSaleAmount / divisor;
    final costRateDifference = avgRate - avgCost;

    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Batch Info Card
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: ColorUtils().primaryColor.withOpacity(0.1),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Row(
              children: [
                Icon(Icons.layers, color: ColorUtils().primaryColor, size: 32),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        batch?['name'] ?? 'Unknown Batch',
                        style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                          color: ColorUtils().textColor,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        'Season: ${batch?['season']?['name'] ?? 'N/A'}',
                        style: TextStyle(fontSize: 14, color: Colors.grey[600]),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 24),

          // Financial Summary
          _buildFinancialSummaryTable(totalExpenseFromApi, totalSaleAmount),

          const SizedBox(height: 24),

          // Performance Metrics
          _buildPerformanceMetrics(
            averageWeight: averageWeight,
            fcr: fcr,
            cfcr: cfcr,
            avgCost: avgCost,
            avgRate: avgRate,
            costRateDifference: costRateDifference,
          ),
          const SizedBox(height: 24),

          // Expenses Section
          _buildSectionHeader('Expenses', Icons.money_off, Colors.red,
              onAdd: () {
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => const AddPurchases()),
            );
          }),
          const SizedBox(height: 12),
          _buildExpenseList(expenses, totalPurchaseFeeds, totalPurchaseAmount),
          const SizedBox(height: 24),

          // Sales Section
          _buildSectionHeader('Sales', Icons.attach_money, Colors.green,
              onAdd: () {
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => const AddSalePage()),
            );
          }),
          const SizedBox(height: 12),
          _buildSalesList(sales, totalWeight, totalSaleCount, totalSaleAmount),
          const SizedBox(height: 24),

          // Returns Section
          _buildSectionHeader('Returns', Icons.assignment_return, Colors.orange,
              onAdd: () {
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => const AddReturns()),
            );
          }),
          const SizedBox(height: 12),
          _buildReturnsList(returns, totalReturnFeeds, totalReturnAmount),
        ],
      ),
    );
  }

  Widget _buildFinancialSummaryTable(
      double totalExpense, double totalSaleAmount) {
    final profit = totalSaleAmount - totalExpense;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Financial Summary',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 12),
        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(12),
            border: Border.all(color: Colors.grey.shade200),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withOpacity(0.02),
                blurRadius: 10,
                offset: const Offset(0, 4),
              ),
            ],
          ),
          child: Column(
            children: [
              _buildSummaryRow('Total Expense:', totalExpense, Colors.red),
              const Divider(height: 24),
              _buildSummaryRow('Total Sales:', totalSaleAmount, Colors.blue),
              const Divider(height: 24),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text('Total Profit (T.P.):',
                      style:
                          TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                  Text(
                    '₹${NumberFormat('#,##,###.00').format(profit)}',
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 18,
                      color: profit >= 0 ? Colors.green : Colors.red,
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildSummaryRow(String label, double amount, Color color) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(label, style: TextStyle(color: Colors.grey[600], fontSize: 14)),
        Text(
          '₹${NumberFormat('#,##,###.00').format(amount)}',
          style: TextStyle(
              fontWeight: FontWeight.bold, fontSize: 16, color: color),
        ),
      ],
    );
  }

  Widget _buildPerformanceMetrics({
    required double averageWeight,
    required double fcr,
    required double cfcr,
    required double avgCost,
    required double avgRate,
    required double costRateDifference,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Performance Metrics',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 12),
        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(12),
            border: Border.all(color: Colors.grey.shade200),
          ),
          child: Column(
            children: [
              _buildMetricRow('Average Weight (kg/bird):', averageWeight, null),
              _buildMetricRow('FCR (Feed Conversion Ratio):', fcr, null),
              _buildMetricRow('CFCR (Corrected FCR):', cfcr, Colors.blue),
              _buildMetricRow('AVG COST (₹/kg):', avgCost, null),
              _buildMetricRow('AVG RATE (₹/kg):', avgRate, null),
              _buildMetricRow('AVG COST - RATE DIFFERENCE:', costRateDifference,
                  costRateDifference >= 0 ? Colors.green : Colors.red),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildMetricRow(String label, double value, Color? valueColor) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12.0),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(label,
                  style: TextStyle(color: Colors.grey[600], fontSize: 13)),
              Text(
                NumberFormat('#,##0.00').format(value),
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 15,
                  color: valueColor ?? ColorUtils().textColor,
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Divider(height: 1, color: Colors.grey.shade100),
        ],
      ),
    );
  }

  Widget _buildExpenseList(List items, double totalQty, double totalAmount) {
    if (items.isEmpty) return _buildEmptyState("No expenses found");
    return Column(
      children: [
        ...items.map((item) => _buildDataCard(
              title: item['category']?['type'] ??
                  item['category']?['name'] ??
                  item['purpose'] ??
                  'N/A',
              date: _formatDate(item['invoice_date'] ?? item['date']),
              color: Colors.red,
              details: {
                "Inv No": item['invoice_number'] ?? 'N/A',
                "Quantity": item['quantity']?.toString() ?? '0',
                "Price":
                    '₹${_toDouble(item['price_per_unit'] ?? item['price'])}',
                "Amount": '₹${_toDouble(item['net_amount'] ?? item['amount'])}',
              },
            )),
        _buildTotalCard(
            "Total Expenses",
            {"Qty": totalQty.toString(), "Amount": '₹$totalAmount'},
            Colors.red),
      ],
    );
  }

  Widget _buildSalesList(
      List items, double totalWeight, double totalBirds, double totalAmount) {
    if (items.isEmpty) return _buildEmptyState("No sales found");
    return Column(
      children: [
        ...items.map((item) => _buildDataCard(
              title: item['vehicle_no'] ?? 'Vehicle -',
              date: _formatDate(item['date']),
              color: Colors.green,
              details: {
                "Weight": '${item['weight'] ?? 0} kg',
                "Birds": item['bird_no']?.toString() ?? '0',
                "Avg Wt": '${item['avg_weight'] ?? 0} kg',
                "Price": '₹${item['price'] ?? 0}',
                "Amount": '₹${item['amount'] ?? 0}',
              },
            )),
        _buildTotalCard(
            "Total Sales",
            {
              "Weight": '${totalWeight}kg',
              "Birds": totalBirds.toString(),
              "Amount": '₹$totalAmount'
            },
            Colors.green),
      ],
    );
  }

  Widget _buildReturnsList(List items, double totalQty, double totalAmount) {
    if (items.isEmpty) return _buildEmptyState("No returns found");
    return Column(
      children: [
        ...items.map((item) => _buildDataCard(
              title: item['purpose'] ?? 'N/A',
              date: _formatDate(item['date']),
              color: Colors.orange,
              details: {
                "Quantity": item['quantity']?.toString() ?? '0',
                "Price": '₹${item['rate_per_bag'] ?? '0'}',
                "Amount": '₹${item['total_amount'] ?? item['amount'] ?? '0'}',
              },
            )),
        _buildTotalCard(
            "Total Returns",
            {"Qty": totalQty.toString(), "Amount": '₹$totalAmount'},
            Colors.orange),
      ],
    );
  }

  Widget _buildDataCard({
    required String title,
    required String date,
    required Color color,
    required Map<String, String> details,
  }) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      width: double.infinity,
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border(left: BorderSide(width: 4, color: color)),
        boxShadow: [
          BoxShadow(
              color: Colors.black.withOpacity(0.03),
              blurRadius: 8,
              offset: const Offset(0, 2)),
        ],
      ),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Expanded(
                  child: Text(
                    title,
                    style: const TextStyle(
                        fontWeight: FontWeight.bold, fontSize: 16),
                  ),
                ),
                Text(date,
                    style: TextStyle(color: Colors.grey[500], fontSize: 12)),
              ],
            ),
            const SizedBox(height: 12),
            Wrap(
              spacing: 16,
              runSpacing: 8,
              children: details.entries
                  .map((e) => Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(e.key,
                              style: TextStyle(
                                  color: Colors.grey[500], fontSize: 11)),
                          Text(e.value,
                              style: const TextStyle(
                                  fontWeight: FontWeight.w600, fontSize: 13)),
                        ],
                      ))
                  .toList(),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildTotalCard(String title, Map<String, String> stats, Color color) {
    return Container(
      margin: const EdgeInsets.symmetric(vertical: 8),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: color.withOpacity(0.05),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: color.withOpacity(0.2)),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(title,
              style: TextStyle(
                  fontWeight: FontWeight.bold, color: color, fontSize: 13)),
          Row(
            children: stats.entries
                .map((e) => Padding(
                      padding: const EdgeInsets.only(left: 12),
                      child: RichText(
                        text: TextSpan(
                          style: const TextStyle(
                              fontSize: 12, color: Colors.black87),
                          children: [
                            TextSpan(
                                text: "${e.key}: ",
                                style: const TextStyle(
                                    fontWeight: FontWeight.w400)),
                            TextSpan(
                                text: e.value,
                                style: const TextStyle(
                                    fontWeight: FontWeight.bold)),
                          ],
                        ),
                      ),
                    ))
                .toList(),
          ),
        ],
      ),
    );
  }

  String _formatDate(String? date) {
    if (date == null) return 'N/A';
    try {
      return DateFormat('dd-MM-yyyy').format(DateTime.parse(date));
    } catch (e) {
      return 'N/A';
    }
  }

  Widget _buildSectionHeader(String title, IconData icon, Color color,
      {VoidCallback? onAdd}) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Row(
          children: [
            Container(
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                color: color.withOpacity(0.1),
                borderRadius: BorderRadius.circular(8),
              ),
              child: Icon(icon, color: color, size: 20),
            ),
            const SizedBox(width: 12),
            Text(
              title,
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                color: ColorUtils().textColor,
              ),
            ),
          ],
        ),
        if (onAdd != null)
          TextButton.icon(
            onPressed: onAdd,
            icon: const Icon(Icons.add, size: 18),
            label: const Text('Add'),
            style: TextButton.styleFrom(
              foregroundColor: color,
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(8),
                side: BorderSide(color: color.withOpacity(0.5)),
              ),
            ),
          ),
      ],
    );
  }

  Widget _buildEmptyState(String message) {
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: Colors.grey[50],
        borderRadius: BorderRadius.circular(12),
      ),
      child: Center(
        child: Text(
          message,
          style: TextStyle(
            color: Colors.grey[600],
            fontSize: 14,
          ),
        ),
      ),
    );
  }
}
