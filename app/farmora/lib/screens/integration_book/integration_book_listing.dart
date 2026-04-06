import 'package:farmora/providers/farms/farmsProvider.dart';
import 'package:farmora/providers/integration_book/integration_book_provider.dart';
import 'package:farmora/screens/integration_book/add_integration_book_entry.dart';
import 'package:farmora/utils/colors.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';

class IntegrationBookListingPage extends StatefulWidget {
  const IntegrationBookListingPage({super.key});

  @override
  State<IntegrationBookListingPage> createState() =>
      _IntegrationBookListingPageState();
}

class _IntegrationBookListingPageState
    extends State<IntegrationBookListingPage> {
  int? _selectedFarm;
  DateTime? _startDate;
  DateTime? _endDate;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<FarmsProvider>().loadFarms();
      context.read<IntegrationBookProvider>().clearIntegrationBookList();
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
          "Integration Book",
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
              builder: (context) => const AddIntegrationBookEntryPage(),
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
                  // Farm Dropdown
                  Consumer<FarmsProvider>(
                    builder: (context, farmsProvider, child) {
                      return DropdownButtonFormField<int>(
                        value: _selectedFarm,
                        decoration: InputDecoration(
                          labelText: "Filter by Farm",
                          contentPadding: const EdgeInsets.symmetric(
                              horizontal: 12, vertical: 0),
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(8),
                          ),
                        ),
                        items: farmsProvider.farms.map((e) {
                          return DropdownMenuItem<int>(
                            value: e['id'] as int?,
                            child: Text(e['name'].toString()),
                          );
                        }).toList(),
                        onChanged: (val) {
                          setState(() {
                            _selectedFarm = val;
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
                            .read<IntegrationBookProvider>()
                            .fetchIntegrationBookEntries(
                              farmId: _selectedFarm,
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
                        _selectedFarm = null;
                        _startDate = null;
                        _endDate = null;
                      });
                      context
                          .read<IntegrationBookProvider>()
                          .clearIntegrationBookList();
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
              child: Consumer<IntegrationBookProvider>(
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
                                  Icon(Icons.credit_card_outlined, size: 16),
                                  SizedBox(width: 8),
                                  Text("Credit"),
                                ],
                              ),
                            ),
                            Tab(
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  Icon(Icons.payments_outlined, size: 16),
                                  SizedBox(width: 8),
                                  Text("Paid"),
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
                                context, provider, provider.creditItems),
                            _buildCategorizedList(
                                context, provider, provider.paidItems),
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
      BuildContext context, IntegrationBookProvider provider, List items) {
    if (provider.isLoading) {
      return const Center(child: CircularProgressIndicator());
    }

    if (items.isEmpty) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.inventory_2_outlined, size: 48, color: Colors.grey[300]),
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
        final isCredit =
            item['payment_type']?.toString().toLowerCase() == 'credit';

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
                      Container(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 8, vertical: 4),
                        decoration: BoxDecoration(
                          color: isCredit
                              ? Colors.orange.withOpacity(0.1)
                              : Colors.green.withOpacity(0.1),
                          borderRadius: BorderRadius.circular(6),
                        ),
                        child: Text(
                          item['payment_type']?.toString().toUpperCase() ??
                              'N/A',
                          style: TextStyle(
                            fontSize: 10,
                            fontWeight: FontWeight.bold,
                            color: isCredit
                                ? Colors.orange[800]
                                : Colors.green[800],
                          ),
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
                              color: ColorUtils().textColor,
                            ),
                          ),
                          const SizedBox(height: 4),
                          Row(
                            children: [
                              Icon(Icons.foundation,
                                  size: 14, color: Colors.grey[400]),
                              const SizedBox(width: 4),
                              Text(
                                item['farm']?['name'] ?? 'General',
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
