import 'package:farmora/utils/colors.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:farmora/providers/seasons/seasonsProvider.dart';
import 'package:intl/intl.dart';

class SeasonOverviewPage extends StatefulWidget {
  const SeasonOverviewPage({super.key});

  @override
  State<SeasonOverviewPage> createState() => _SeasonOverviewPageState();
}

class _SeasonOverviewPageState extends State<SeasonOverviewPage> {
  Map<String, dynamic>? _selectedSeason;

  @override
  void initState() {
    super.initState();
    Future.microtask(() => _fetchSeasons());
  }

  Future<void> _fetchSeasons() async {
    final provider = context.read<SeasonsProvider>();
    await provider.loadSeasons();
  }

  void _onSeasonSelected(Map<String, dynamic>? season) {
    if (season == null) return;
    setState(() {
      _selectedSeason = season;
    });
    context.read<SeasonsProvider>().loadSeasonOverview(season['id']);
  }

  @override
  Widget build(BuildContext context) {
    final provider = context.watch<SeasonsProvider>();
    final seasons = provider.seasons;
    final overviewData = provider.seasonOverviewData;
    final isLoading = provider.loading;
    final isLoadingOverview = provider.loadingOverview;
    final error = provider.error;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Season Overview'),
        backgroundColor: Colors.white,
      ),
      body: Column(
        children: [
          // Season Selection Dropdown
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
                        isLoading ? 'Loading seasons...' : 'Select a season',
                        style: TextStyle(color: Colors.grey[600]),
                      ),
                      items: seasons.map((season) {
                        return DropdownMenuItem<Map<String, dynamic>>(
                          value: season,
                          child: Text(
                            season['name'] ?? 'Unknown',
                            style: TextStyle(color: ColorUtils().textColor),
                          ),
                        );
                      }).toList(),
                      onChanged: isLoading ? null : _onSeasonSelected,
                    ),
                  ),
                ),
              ],
            ),
          ),

          // Overview Content
          Expanded(
            child: isLoadingOverview
                ? const Center(child: CircularProgressIndicator())
                : error != null
                    ? Center(
                        child: Text(error,
                            style: const TextStyle(color: Colors.red)))
                    : overviewData == null
                        ? Center(
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Icon(Icons.analytics_outlined,
                                    size: 64, color: Colors.grey[400]),
                                const SizedBox(height: 16),
                                Text(
                                  seasons.isEmpty && !isLoading
                                      ? 'No seasons found'
                                      : 'Select a season to view overview',
                                  style: TextStyle(
                                      color: Colors.grey[600], fontSize: 16),
                                ),
                              ],
                            ),
                          )
                        : _buildOverviewContent(overviewData),
          ),
        ],
      ),
    );
  }

  Widget _buildOverviewContent(Map<String, dynamic> data) {
    final season = data['season'] ?? {};
    final batches = List<Map<String, dynamic>>.from(data['batches'] ?? []);

    final generalCosts =
        List<Map<String, dynamic>>.from(data['general_costs'] ?? []);
    final generalSales =
        List<Map<String, dynamic>>.from(data['general_sales'] ?? []);

    // Calculations based on provided utility logic
    final totalBatchProfit = _calculateTotalBatchProfit(batches);
    final totalGenCost = _calculateTotalGeneralCost(generalCosts);
    final totalGenSale = _calculateTotalGeneralSale(generalSales);

    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        // Season Information Card
        _buildSeasonInformation(
          name: season['name'] ?? 'N/A',
          batchLength: batches.length,
          closedOn: season['closed_on'],
          seasonId: season['id'],
        ),
        const SizedBox(height: 20),

        // Batches Section Header
        _buildSectionHeader('Batches', Icons.layers, Colors.blue),
        const SizedBox(height: 12),
        batches.isEmpty
            ? _buildEmptyState('No batches found')
            : Column(children: batches.map((b) => _buildBatchCard(b)).toList()),
        const SizedBox(height: 24),

        // General Costs & Sales Grid
        Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _buildSectionHeader('General Cost', Icons.money_off, Colors.red),
                  const SizedBox(height: 12),
                  generalCosts.isEmpty
                      ? _buildEmptyState('No costs')
                      : Column(
                          children: generalCosts
                              .map((c) => _buildTransactionCard(c, Colors.red))
                              .toList()),
                ],
              ),
            ),
            const SizedBox(width: 16),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _buildSectionHeader(
                      'General Sales', Icons.attach_money, Colors.green),
                  const SizedBox(height: 12),
                  generalSales.isEmpty
                      ? _buildEmptyState('No sales')
                      : Column(
                          children: generalSales
                              .map((s) => _buildTransactionCard(s, Colors.green))
                              .toList()),
                ],
              ),
            ),
          ],
        ),
        const SizedBox(height: 24),

        // Investor Profit Summary
        _buildInvestorProfitSummary(
          totalProfit: totalBatchProfit,
          totalGeneralCost: totalGenCost,
          totalGeneralSale: totalGenSale,
        ),
      ],
    );
  }

  Widget _buildSeasonInformation({
    required String name,
    required int batchLength,
    required String? closedOn,
    required int? seasonId,
  }) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.grey.withOpacity(0.2)),
        boxShadow: [
          BoxShadow(
              color: Colors.black.withOpacity(0.02),
              blurRadius: 10,
              offset: const Offset(0, 4))
        ],
      ),
      child: Column(
        children: [
          Row(
            children: [
              Expanded(
                flex: 2,
                child: _buildInfoColumn('Season', name),
              ),
              const SizedBox(width: 12),
              Flexible(
                child: _buildInfoColumn('Total Batches', batchLength.toString()),
              ),
              const SizedBox(width: 12),
              if (closedOn == null)
                ElevatedButton(
                  onPressed: seasonId == null
                      ? null
                      : () => _showCloseSeasonConfirmation(seasonId),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: ColorUtils().primaryColor,
                    foregroundColor: Colors.white,
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(8)),
                    padding: const EdgeInsets.symmetric(horizontal: 12),
                  ),
                  child: const Text('Close Season',
                      style: TextStyle(fontSize: 13)),
                )
              else
                _buildInfoColumn(
                  'Status',
                  'Closed: ${DateFormat('dd MMM yyyy').format(DateTime.parse(closedOn))}',
                  isHighlight: true,
                ),
            ],
          ),

        ],
      ),
    );
  }

  Widget _buildInfoColumn(String label, String value, {bool isHighlight = false}) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label, style: TextStyle(fontSize: 11, color: Colors.grey[600])),
        const SizedBox(height: 4),
        Text(
          value,
          style: TextStyle(
            fontSize: 14,
            fontWeight: FontWeight.bold,
            color: isHighlight ? Colors.orange : ColorUtils().textColor,
          ),
          maxLines: 1,
          overflow: TextOverflow.ellipsis,
        ),
      ],
    );
  }


  Widget _buildInvestorProfitSummary({
    required double totalProfit,
    required double totalGeneralCost,
    required double totalGeneralSale,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text('Investor Profit Summary',
            style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
        const SizedBox(height: 16),
        Row(
          children: [
            Expanded(
              child: _buildSimpleSummaryCard(
                  'Total Batch Profit', totalProfit, Colors.blue[50]!, Colors.blue),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: _buildSimpleSummaryCard(
                  'Total Gen. Cost', totalGeneralCost, Colors.red[50]!, Colors.red),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: _buildSimpleSummaryCard(
                  'Total Gen. Sales', totalGeneralSale, Colors.green[50]!, Colors.green),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildSimpleSummaryCard(
      String title, double value, Color bgColor, Color textColor) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: bgColor,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(title, style: TextStyle(fontSize: 12, color: Colors.grey[700])),
          const SizedBox(height: 8),
          Text(
            '₹${NumberFormat('#,##,###').format(value)}',
            style: TextStyle(
                fontSize: 18, fontWeight: FontWeight.bold, color: textColor),
          ),
        ],
      ),
    );
  }

  void _showCloseSeasonConfirmation(int seasonId) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Close Season?'),
        content: const Text(
            'Are you sure you want to close this season? This action cannot be undone.'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () async {
              Navigator.pop(context);
              final success =
                  await context.read<SeasonsProvider>().closeSeason(seasonId);
              if (success && mounted) {
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('Season closed successfully')),
                );
              }
            },
            style: ElevatedButton.styleFrom(backgroundColor: Colors.red),
            child: const Text('Close Season', style: TextStyle(color: Colors.white)),
          ),
        ],
      ),
    );
  }

  double _calculateTotalBatchProfit(List<Map<String, dynamic>> batches) {
    double total = 0;
    for (var batch in batches) {
      final calcs = batch['overviewCalculations'] ?? {};
      final sale = _toDouble(calcs['total_sale_amount']);
      final expense = _toDouble(calcs['total_expense']);
      total += (sale - expense);
    }
    return total;
  }

  double _calculateTotalGeneralCost(List<Map<String, dynamic>> costs) {
    return costs.fold(0.0, (sum, item) => sum + _toDouble(item['amount']));
  }

  double _calculateTotalGeneralSale(List<Map<String, dynamic>> sales) {
    return sales.fold(0.0, (sum, item) => sum + _toDouble(item['amount']));
  }

  double _toDouble(dynamic value) {
    if (value == null) return 0.0;
    if (value is double) return value;
    if (value is int) return value.toDouble();
    if (value is String) return double.tryParse(value) ?? 0.0;
    return 0.0;
  }

  Widget _buildSectionHeader(String title, IconData icon, Color color) {
    return Row(
      children: [
        Container(
          padding: const EdgeInsets.all(8),
          decoration: BoxDecoration(
              color: color.withOpacity(0.1),
              borderRadius: BorderRadius.circular(8)),
          child: Icon(icon, color: color, size: 20),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: Text(title,
              style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                  color: ColorUtils().textColor),
              overflow: TextOverflow.ellipsis),
        ),
      ],
    );
  }

  Widget _buildBatchCard(Map<String, dynamic> batch) {
    final calcs = batch['overviewCalculations'] ?? {};
    final profit = _toDouble(calcs['total_sale_amount']) - _toDouble(calcs['total_expense']);
    
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        boxShadow: [
          BoxShadow(
              color: Colors.grey.withOpacity(0.1),
              blurRadius: 4,
              offset: const Offset(0, 2))
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(batch['name'] ?? 'N/A',
                  style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                      color: ColorUtils().textColor)),
              Text(
                '₹${NumberFormat('#,##,###.##').format(profit)}',
                style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                    color: profit >= 0 ? Colors.green : Colors.red),
              ),
            ],
          ),
          const Divider(height: 24),
          _buildBatchMetricsRow([
            _buildMetric('Avg Wt', '${_toDouble(calcs['avg_weight']).toStringAsFixed(2)} kg'),
            _buildMetric('FCR', _toDouble(calcs['fcr']).toStringAsFixed(2)),
            _buildMetric('CFCR', _toDouble(calcs['cfcr']).toStringAsFixed(2)),
          ]),
        ],
      ),
    );
  }

  Widget _buildBatchMetricsRow(List<Widget> children) {
    return Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween, children: children);
  }

  Widget _buildMetric(String label, String value) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label, style: TextStyle(fontSize: 10, color: Colors.grey[500])),
        Text(value,
            style: TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.w600,
                color: ColorUtils().textColor)),
      ],
    );
  }

  Widget _buildTransactionCard(Map<String, dynamic> item, Color color) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: Colors.grey.withOpacity(0.1)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(item['purpose'] ?? 'N/A',
              style: TextStyle(
                  fontSize: 13,
                  fontWeight: FontWeight.w600,
                  color: ColorUtils().textColor)),
          const SizedBox(height: 4),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                item['date'] != null
                    ? DateFormat('dd-MM-yy')
                        .format(DateTime.parse(item['date']))
                    : 'N/A',
                style: TextStyle(fontSize: 11, color: Colors.grey[500]),
              ),
              Text(
                '₹${NumberFormat('#,##,###').format(_toDouble(item['amount']))}',
                style: TextStyle(
                    fontSize: 13, fontWeight: FontWeight.bold, color: color),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildEmptyState(String message) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
          color: Colors.grey[50], borderRadius: BorderRadius.circular(12)),
      child: Center(
          child: Text(message,
              style: TextStyle(color: Colors.grey[400], fontSize: 12))),
    );
  }
}
