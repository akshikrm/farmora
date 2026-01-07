import 'package:farmora/providers/farms/farmsProvider.dart';
import 'package:farmora/providers/integration_book/integration_book_provider.dart';
import 'package:farmora/utils/colors.dart';
import 'package:farmora/utils/snackbar_utils.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class AddIntegrationBookEntryPage extends StatefulWidget {
  const AddIntegrationBookEntryPage({super.key});

  @override
  State<AddIntegrationBookEntryPage> createState() =>
      _AddIntegrationBookEntryPageState();
}

class _AddIntegrationBookEntryPageState
    extends State<AddIntegrationBookEntryPage> {
  final _formKey = GlobalKey<FormState>();
  int? _selectedFarm;
  final TextEditingController _amountController = TextEditingController();
  String? _paymentType;

  final List<String> _paymentTypes = ['Credit', 'Paid'];

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<FarmsProvider>().loadFarms();
    });
  }

  @override
  void dispose() {
    _amountController.dispose();
    super.dispose();
  }

  void _submitForm() async {
    if (_formKey.currentState!.validate()) {
      final success = await context
          .read<IntegrationBookProvider>()
          .addIntegrationBookEntry({
        'farm_id': _selectedFarm,
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
          "Add Entry",
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
                // Farm Dropdown
                Consumer<FarmsProvider>(
                  builder: (context, farmsProvider, child) {
                    return DropdownButtonFormField<int>(
                      value: _selectedFarm,
                      decoration: InputDecoration(
                        labelText: "Select Farm",
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(8),
                        ),
                        filled: true,
                        fillColor: Colors.grey.shade50,
                      ),
                      items: farmsProvider.farms.map((e) {
                        return DropdownMenuItem<int>(
                          value: e['id'] as int?,
                          child: Text(e['name'].toString()),
                        );
                      }).toList(),
                      validator: (value) =>
                          value == null ? "Please select a farm" : null,
                      onChanged: (val) {
                        setState(() {
                          _selectedFarm = val;
                        });
                      },
                    );
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
                Consumer<IntegrationBookProvider>(
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
