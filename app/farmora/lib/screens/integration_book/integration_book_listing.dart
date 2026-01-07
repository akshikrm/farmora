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

            // List
            const SizedBox(height: 20),
            Consumer<IntegrationBookProvider>(
              builder: (context, provider, child) {
                if (provider.isLoading) {
                  return const Center(child: CircularProgressIndicator());
                }

                if (provider.integrationBookList.isEmpty) {
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
                  itemCount: provider.integrationBookList.length,
                  itemBuilder: (context, index) {
                    final item = provider.integrationBookList[index];
                    // Customize display based on actual API response structure
                    return Card(
                      child: ListTile(
                        title: Text("Amount: ${item['amount'] ?? 'N/A'}"),
                        subtitle: Text(
                            "Type: ${item['payment_type'] ?? 'N/A'}\nFarm: ${item['farm']?['name'] ?? 'N/A'}"),
                        // Add more details as needed
                      ),
                    );
                  },
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}
