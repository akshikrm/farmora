import 'package:farmora/providers/seasons/seasonsProvider.dart';
import 'package:farmora/providers/working_cost/working_cost_provider.dart';
import 'package:farmora/screens/working_cost/add_working_cost.dart';
import 'package:farmora/utils/colors.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';

class WorkingCostListingPage extends StatefulWidget {
  const WorkingCostListingPage({super.key});

  @override
  State<WorkingCostListingPage> createState() => _WorkingCostListingPageState();
}

class _WorkingCostListingPageState extends State<WorkingCostListingPage> {
  int? _selectedSeason;
  DateTime? _startDate;
  DateTime? _endDate;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<SeasonsProvider>().loadSeasons();
      context.read<WorkingCostProvider>().clearWorkingCostList();
    });
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
          "Working Cost",
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
              builder: (context) => const AddWorkingCostPage(),
            ),
          );
        },
        backgroundColor: ColorUtils().primaryColor,
        child: const Icon(Icons.add, color: Colors.white),
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
                  // Season Dropdown
                  Consumer<SeasonsProvider>(
                    builder: (context, seasonsProvider, child) {
                      return DropdownButtonFormField<int>(
                        value: _selectedSeason,
                        decoration: InputDecoration(
                          labelText: "Filter by Season",
                          contentPadding: const EdgeInsets.symmetric(
                              horizontal: 12, vertical: 0),
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(8),
                          ),
                        ),
                        items: seasonsProvider.seasons.map((e) {
                          return DropdownMenuItem<int>(
                            value: e['id'] as int?,
                            child: Text(e['name'].toString()),
                          );
                        }).toList(),
                        onChanged: (val) {
                          setState(() {
                            _selectedSeason = val;
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
                                  ? DateFormat('yyyy-MM-dd').format(_startDate!)
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
                      onPressed: () {
                        context
                            .read<WorkingCostProvider>()
                            .fetchWorkingCostEntries(
                              seasonId: _selectedSeason,
                              startDate: _startDate != null
                                  ? DateFormat('yyyy-MM-dd').format(_startDate!)
                                  : null,
                              endDate: _endDate != null
                                  ? DateFormat('yyyy-MM-dd').format(_endDate!)
                                  : null,
                            );
                      },
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
                        _selectedSeason = null;
                        _startDate = null;
                        _endDate = null;
                      });
                      context
                          .read<WorkingCostProvider>()
                          .clearWorkingCostList();
                    },
                    child: Text("Clear Filters",
                        style: TextStyle(color: ColorUtils().primaryColor)),
                  )
                ],
              ),
            ),

            // Tabs and List
            DefaultTabController(
              length: 2,
              child: Consumer<WorkingCostProvider>(
                builder: (context, provider, child) {
                  return Column(
                    children: [
                      Container(
                        height: 50,
                        margin: const EdgeInsets.symmetric(horizontal: 16),
                        padding: const EdgeInsets.all(4),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(16),
                          boxShadow: [
                            BoxShadow(
                              color: Colors.black.withOpacity(0.04),
                              blurRadius: 10,
                              offset: const Offset(0, 4),
                            ),
                          ],
                        ),
                        child: TabBar(
                          indicator: BoxDecoration(
                            borderRadius: BorderRadius.circular(12),
                            color: ColorUtils().primaryColor,
                          ),
                          dividerColor: Colors.transparent,
                          indicatorSize: TabBarIndicatorSize.tab,
                          labelColor: Colors.white,
                          unselectedLabelColor: Colors.grey[400],
                          labelStyle: const TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 13,
                            letterSpacing: 0.3,
                          ),
                          unselectedLabelStyle: const TextStyle(
                            fontWeight: FontWeight.w600,
                            fontSize: 13,
                          ),
                          tabs: const [
                            Tab(
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  Icon(Icons.trending_up, size: 16),
                                  SizedBox(width: 8),
                                  Text("Income"),
                                ],
                              ),
                            ),
                            Tab(
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  Icon(Icons.trending_down, size: 16),
                                  SizedBox(width: 8),
                                  Text("Expense"),
                                ],
                              ),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(height: 16),
                      SizedBox(
                        height: MediaQuery.of(context).size.height * 0.6,
                        child: TabBarView(
                          children: [
                            _buildCategorizedList(
                                context, provider, provider.incomeItems),
                            _buildCategorizedList(
                                context, provider, provider.expenseItems),
                          ],
                        ),
                      ),
                    ],
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildCategorizedList(
      BuildContext context, WorkingCostProvider provider, List items) {
    if (provider.isLoading) {
      return const Center(child: CircularProgressIndicator());
    }

    if (items.isEmpty) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.receipt_long_outlined,
                size: 48, color: Colors.grey[300]),
            const SizedBox(height: 12),
            Text(
              "No records found",
              style: TextStyle(color: Colors.grey[500], fontSize: 16),
            ),
          ],
        ),
      );
    }

    return ListView.separated(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      separatorBuilder: (_, __) => const SizedBox(height: 12),
      itemCount: items.length,
      itemBuilder: (context, index) {
        final item = items[index];
        final date = item['date'] != null
            ? DateFormat('dd MMM yyyy').format(DateTime.parse(item['date']))
            : 'N/A';
        final isIncome =
            item['payment_type']?.toString().toLowerCase() == 'income';

        return Card(
          elevation: 2,
          shadowColor: Colors.black.withOpacity(0.05),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
          ),
          child: Container(
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(16),
              color: Colors.white,
              border: Border.all(color: Colors.grey.shade100),
            ),
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        item['purpose'] ?? 'No Purpose',
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                          color: ColorUtils().textColor,
                        ),
                      ),
                      Text(
                        date,
                        style: TextStyle(color: Colors.grey[500], fontSize: 12),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            "₹${item['amount']}",
                            style: TextStyle(
                              fontSize: 20,
                              fontWeight: FontWeight.w800,
                              color: isIncome
                                  ? Colors.green[700]
                                  : Colors.red[700],
                            ),
                          ),
                          const SizedBox(height: 4),
                          Row(
                            children: [
                              Icon(Icons.event_note,
                                  size: 14, color: Colors.grey[400]),
                              const SizedBox(width: 4),
                              Text(
                                item['season']?['name'] ?? 'General',
                                style: TextStyle(
                                  fontSize: 13,
                                  color: Colors.grey[600],
                                  fontWeight: FontWeight.w500,
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 10, vertical: 6),
                        decoration: BoxDecoration(
                          color: item['status'] == 'active'
                              ? Colors.blue.withOpacity(0.1)
                              : Colors.grey.withOpacity(0.1),
                          borderRadius: BorderRadius.circular(20),
                        ),
                        child: Text(
                          item['status']?.toString().toUpperCase() ?? 'N/A',
                          style: TextStyle(
                            fontSize: 10,
                            fontWeight: FontWeight.bold,
                            color: item['status'] == 'active'
                                ? Colors.blue[800]
                                : Colors.grey[800],
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}
