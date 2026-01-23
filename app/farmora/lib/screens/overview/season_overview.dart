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
    final summary = data['summary'] ?? {};
    final batches = List<Map<String, dynamic>>.from(data['batches'] ?? []);
    final generalCosts =
        List<Map<String, dynamic>>.from(data['general_costs'] ?? []);
    final generalSales =
        List<Map<String, dynamic>>.from(data['general_sales'] ?? []);

    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        // Summary Section
        _buildSectionHeader(
            'Summary', Icons.summarize, ColorUtils().primaryColor),
        const SizedBox(height: 12),
        _buildSummaryGrid(summary),
        const SizedBox(height: 24),

        // Batches Section
        _buildSectionHeader('Batches', Icons.layers, Colors.blue),
        const SizedBox(height: 12),
        batches.isEmpty
            ? _buildEmptyState('No batches found')
            : Column(children: batches.map((b) => _buildBatchCard(b)).toList()),
        const SizedBox(height: 24),

        // General Costs Section
        _buildSectionHeader('General Costs', Icons.money_off, Colors.red),
        const SizedBox(height: 12),
        generalCosts.isEmpty
            ? _buildEmptyState('No general costs found')
            : Column(
                children: generalCosts
                    .map((c) => _buildTransactionCard(c, Colors.red))
                    .toList()),
        const SizedBox(height: 24),

        // General Sales Section
        _buildSectionHeader('General Sales', Icons.attach_money, Colors.green),
        const SizedBox(height: 12),
        generalSales.isEmpty
            ? _buildEmptyState('No general sales found')
            : Column(
                children: generalSales
                    .map((s) => _buildTransactionCard(s, Colors.green))
                    .toList()),
      ],
    );
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
        Text(title,
            style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                color: ColorUtils().textColor)),
      ],
    );
  }

  Widget _buildSummaryGrid(Map<String, dynamic> summary) {
    return GridView.count(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      crossAxisCount: 2,
      childAspectRatio: 1.5,
      crossAxisSpacing: 12,
      mainAxisSpacing: 12,
      children: [
        _buildSummaryCard(
            'Batch Profit', summary['total_batch_profit'], Colors.blue),
        _buildSummaryCard(
            'General Costs', summary['total_general_cost'], Colors.red),
        _buildSummaryCard(
            'General Sales', summary['total_general_sales'], Colors.green),
        _buildSummaryCard('Inv. Profit', summary['investor_profit'],
            ColorUtils().primaryColor),
      ],
    );
  }

  Widget _buildSummaryCard(String title, dynamic amount, Color color) {
    return Container(
      padding: const EdgeInsets.all(12),
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
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(title,
              style: TextStyle(
                  fontSize: 12,
                  color: Colors.grey[600],
                  fontWeight: FontWeight.w500)),
          const SizedBox(height: 4),
          FittedBox(
            child: Text(
              '₹${NumberFormat('#,##,###.##').format(amount ?? 0)}',
              style: TextStyle(
                  fontSize: 16, fontWeight: FontWeight.bold, color: color),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildBatchCard(Map<String, dynamic> batch) {
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
              Text(batch['batch_name'] ?? 'N/A',
                  style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                      color: ColorUtils().textColor)),
              Text(
                '₹${NumberFormat('#,##,###.##').format(batch['profit'] ?? 0)}',
                style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                    color: (batch['profit'] ?? 0) >= 0
                        ? Colors.green
                        : Colors.red),
              ),
            ],
          ),
          const Divider(height: 24),
          _buildBatchMetricsRow([
            _buildMetric('Avg Wt', '${batch['avg_weight'] ?? 0} kg'),
            _buildMetric('FCR', '${batch['fcr'] ?? 0}'),
            _buildMetric(
                'Profit %', '${batch['profit_loss_percentage'] ?? 0}%'),
          ]),
          const SizedBox(height: 8),
          _buildBatchMetricsRow([
            _buildMetric('Avg Cost', '₹${batch['avg_cost'] ?? 0}'),
            _buildMetric('Avg Rate', '₹${batch['avg_rate'] ?? 0}'),
            _buildMetric('CFSR', '${batch['cfsr'] ?? 0}'),
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
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(item['purpose'] ?? 'N/A',
                    style: TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.w600,
                        color: ColorUtils().textColor)),
                const SizedBox(height: 4),
                Text(
                  item['date'] != null
                      ? DateFormat('dd MMM yyyy')
                          .format(DateTime.parse(item['date']))
                      : 'N/A',
                  style: TextStyle(fontSize: 12, color: Colors.grey[600]),
                ),
              ],
            ),
          ),
          Text(
            '₹${NumberFormat('#,##,###.##').format(item['amount'] ?? 0)}',
            style: TextStyle(
                fontSize: 14, fontWeight: FontWeight.bold, color: color),
          ),
        ],
      ),
    );
  }

  Widget _buildEmptyState(String message) {
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
          color: Colors.grey[50], borderRadius: BorderRadius.circular(12)),
      child: Center(
          child: Text(message,
              style: TextStyle(color: Colors.grey[600], fontSize: 14))),
    );
  }
}
