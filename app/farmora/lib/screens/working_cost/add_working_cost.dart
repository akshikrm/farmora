import 'package:farmora/providers/seasons/seasonsProvider.dart';
import 'package:farmora/providers/working_cost/working_cost_provider.dart';
import 'package:farmora/utils/colors.dart';
import 'package:farmora/utils/snackbar_utils.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class AddWorkingCostPage extends StatefulWidget {
  const AddWorkingCostPage({super.key});

  @override
  State<AddWorkingCostPage> createState() => _AddWorkingCostPageState();
}

class _AddWorkingCostPageState extends State<AddWorkingCostPage> {
  final _formKey = GlobalKey<FormState>();
  int? _selectedSeason;
  final TextEditingController _purposeController = TextEditingController();
  final TextEditingController _amountController = TextEditingController();
  String? _paymentType;

  final List<String> _paymentTypes = ['Expense', 'Income'];

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<SeasonsProvider>().loadSeasons();
    });
  }

  @override
  void dispose() {
    _purposeController.dispose();
    _amountController.dispose();
    super.dispose();
  }

  void _submitForm() async {
    if (_formKey.currentState!.validate()) {
      final success =
          await context.read<WorkingCostProvider>().addWorkingCostEntry({
        'season_id': _selectedSeason,
        'purpose': _purposeController.text,
        'amount': _amountController.text,
        'payment_type': _paymentType?.toLowerCase(),
      });

      if (success) {
        SnackbarUtils.showSuccess("Entry added successfully");
        if (mounted) Navigator.pop(context);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: ColorUtils().backgroundColor,
      appBar: AppBar(
        title: Text(
          "Add Working Cost",
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
        padding: const EdgeInsets.all(16),
        child: Container(
          padding: const EdgeInsets.all(20),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(16),
            boxShadow: [
              BoxShadow(
                color: Colors.grey.withOpacity(0.05),
                blurRadius: 10,
                offset: const Offset(0, 4),
              ),
            ],
          ),
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                // Season Dropdown
                Consumer<SeasonsProvider>(
                  builder: (context, seasonsProvider, child) {
                    return DropdownButtonFormField<int>(
                      value: _selectedSeason,
                      decoration: InputDecoration(
                        labelText: "Select Season",
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(8),
                        ),
                        filled: true,
                        fillColor: Colors.grey.shade50,
                      ),
                      items: seasonsProvider.seasons.map((e) {
                        return DropdownMenuItem<int>(
                          value: e['id'] as int?,
                          child: Text(e['name'].toString()),
                        );
                      }).toList(),
                      validator: (value) =>
                          value == null ? "Please select a season" : null,
                      onChanged: (val) {
                        setState(() {
                          _selectedSeason = val;
                        });
                      },
                    );
                  },
                ),
                const SizedBox(height: 16),

                // Purpose TextField
                TextFormField(
                  controller: _purposeController,
                  decoration: InputDecoration(
                    labelText: "Purpose",
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(8),
                    ),
                    filled: true,
                    fillColor: Colors.grey.shade50,
                  ),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return "Please enter purpose";
                    }
                    return null;
                  },
                ),
                const SizedBox(height: 16),

                // Amount TextField
                TextFormField(
                  controller: _amountController,
                  keyboardType: TextInputType.number,
                  decoration: InputDecoration(
                    labelText: "Amount",
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(8),
                    ),
                    filled: true,
                    fillColor: Colors.grey.shade50,
                    prefixIcon: const Icon(Icons.currency_rupee),
                  ),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return "Please enter an amount";
                    }
                    if (double.tryParse(value) == null) {
                      return "Please enter a valid number";
                    }
                    return null;
                  },
                ),
                const SizedBox(height: 16),

                // Payment Type Dropdown
                DropdownButtonFormField<String>(
                  value: _paymentType,
                  decoration: InputDecoration(
                    labelText: "Payment Type",
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(8),
                    ),
                    filled: true,
                    fillColor: Colors.grey.shade50,
                  ),
                  items: _paymentTypes.map((e) {
                    return DropdownMenuItem<String>(
                      value: e,
                      child: Text(e),
                    );
                  }).toList(),
                  validator: (value) =>
                      value == null ? "Please select payment type" : null,
                  onChanged: (val) {
                    setState(() {
                      _paymentType = val;
                    });
                  },
                ),
                const SizedBox(height: 32),

                // Submit Button
                Consumer<WorkingCostProvider>(
                  builder: (context, provider, child) {
                    return ElevatedButton(
                      onPressed: provider.isLoading ? null : _submitForm,
                      style: ElevatedButton.styleFrom(
                        backgroundColor: ColorUtils().primaryColor,
                        padding: const EdgeInsets.symmetric(vertical: 16),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(8),
                        ),
                        elevation: 2,
                      ),
                      child: provider.isLoading
                          ? const SizedBox(
                              height: 20,
                              width: 20,
                              child: CircularProgressIndicator(
                                color: Colors.white,
                                strokeWidth: 2,
                              ),
                            )
                          : const Text(
                              "Save Entry",
                              style: TextStyle(
                                fontSize: 16,
                                fontWeight: FontWeight.bold,
                                color: Colors.white,
                              ),
                            ),
                    );
                  },
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
