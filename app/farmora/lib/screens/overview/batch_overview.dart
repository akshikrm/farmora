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

    // Calculate totals
    final totalExpenses = expenses.fold<double>(
        0, (sum, item) => sum + (item['amount'] ?? 0).toDouble());
    final totalSales = sales.fold<double>(
        0, (sum, item) => sum + (item['amount'] ?? 0).toDouble());
    final totalReturns = returns.fold<double>(
        0, (sum, item) => sum + (item['amount'] ?? 0).toDouble());

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
                Icon(
                  Icons.layers,
                  color: ColorUtils().primaryColor,
                  size: 32,
                ),
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
                        style: TextStyle(
                          fontSize: 14,
                          color: Colors.grey[600],
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 24),

          // Summary Cards
          Row(
            children: [
              Expanded(
                child: _buildSummaryCard(
                  'Total Expenses',
                  totalExpenses,
                  Icons.trending_down,
                  Colors.red,
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: _buildSummaryCard(
                  'Total Sales',
                  totalSales,
                  Icons.trending_up,
                  Colors.green,
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Row(
            children: [
              Expanded(
                child: _buildSummaryCard(
                  'Total Returns',
                  totalReturns,
                  Icons.assignment_return,
                  Colors.orange,
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: _buildSummaryCard(
                  'Net Amount',
                  totalSales - totalExpenses - totalReturns,
                  Icons.account_balance,
                  ColorUtils().primaryColor,
                ),
              ),
            ],
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
          expenses.isEmpty
              ? _buildEmptyState('No expenses found')
              : _buildTransactionList(expenses, Colors.red),

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
          sales.isEmpty
              ? _buildEmptyState('No sales found')
              : _buildTransactionList(sales, Colors.green),

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
          returns.isEmpty
              ? _buildEmptyState('No returns found')
              : _buildTransactionList(returns, Colors.orange),
        ],
      ),
    );
  }

  Widget _buildSummaryCard(
      String title, double amount, IconData icon, Color color) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.1),
            blurRadius: 4,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
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
              const SizedBox(width: 8),
              Expanded(
                child: Text(
                  title,
                  style: TextStyle(
                    fontSize: 12,
                    color: Colors.grey[600],
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Text(
            '₹${NumberFormat('#,##,###.00').format(amount)}',
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
              color: ColorUtils().textColor,
            ),
          ),
        ],
      ),
    );
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

  Widget _buildTransactionList(
      List<Map<String, dynamic>> transactions, Color color) {
    return Column(
      children: transactions.map((transaction) {
        return Container(
          margin: const EdgeInsets.only(bottom: 12),
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(12),
            border: Border(
              left: BorderSide(
                width: 4,
                color: color,
              ),
            ),
            boxShadow: [
              BoxShadow(
                color: Colors.grey.withOpacity(0.1),
                blurRadius: 4,
                offset: const Offset(0, 2),
              ),
            ],
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Expanded(
                    child: Text(
                      transaction['purpose'] ??
                          transaction['vehicle_no'] ??
                          'N/A',
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.w600,
                        color: ColorUtils().textColor,
                      ),
                    ),
                  ),
                  Text(
                    '₹${NumberFormat('#,##,###.00').format(transaction['amount'] ?? 0)}',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                      color: color,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 8),
              Row(
                children: [
                  Icon(Icons.calendar_today, size: 14, color: Colors.grey[600]),
                  const SizedBox(width: 4),
                  Text(
                    transaction['date'] != null
                        ? DateFormat('dd MMM yyyy').format(
                            DateTime.parse(transaction['date']),
                          )
                        : 'N/A',
                    style: TextStyle(
                      fontSize: 12,
                      color: Colors.grey[600],
                    ),
                  ),
                  const SizedBox(width: 16),
                  Icon(Icons.inventory_2, size: 14, color: Colors.grey[600]),
                  const SizedBox(width: 4),
                  Text(
                    'Qty: ${transaction['quantity'] ?? 0}',
                    style: TextStyle(
                      fontSize: 12,
                      color: Colors.grey[600],
                    ),
                  ),
                  const SizedBox(width: 16),
                  Icon(Icons.currency_rupee, size: 14, color: Colors.grey[600]),
                  const SizedBox(width: 4),
                  Text(
                    'Price: ₹${transaction['price'] ?? 0}',
                    style: TextStyle(
                      fontSize: 12,
                      color: Colors.grey[600],
                    ),
                  ),
                ],
              ),
            ],
          ),
        );
      }).toList(),
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
