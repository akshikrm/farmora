import 'package:farmora/providers/batches/batchesProvider.dart';
import 'package:farmora/providers/sales/sales_provider.dart';
import 'package:farmora/providers/seasons/seasonsProvider.dart';
import 'package:farmora/providers/vendors_provider.dart';
import 'package:farmora/utils/colors.dart';
import 'package:farmora/utils/snackbar_utils.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';

class AddSalePage extends StatefulWidget {
  const AddSalePage({super.key});

  @override
  State<AddSalePage> createState() => _AddSalePageState();
}

class _AddSalePageState extends State<AddSalePage> {
  final _formKey = GlobalKey<FormState>();

  int? _selectedSeason;
  int? _selectedBatch;
  int? _selectedBuyer;
  DateTime? _saleDate;
  String? _paymentType;

  final TextEditingController _vehicleNumberController =
      TextEditingController();
  final TextEditingController _weightController = TextEditingController();
  final TextEditingController _birdsController = TextEditingController();
  final TextEditingController _priceController = TextEditingController();
  final TextEditingController _narrationController = TextEditingController();

  final TextEditingController _avgWeightController = TextEditingController();
  final TextEditingController _totalAmountController = TextEditingController();

  final List<String> _paymentTypes = ['Cash', 'Credit'];

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<SeasonsProvider>().loadSeasons();
      context.read<BatchesProvider>().loadBatches();
      context.read<VendorsProvider>().fetchVendorNames();
    });

    _weightController.addListener(_calculateFields);
    _birdsController.addListener(_calculateFields);
    _priceController.addListener(_calculateFields);
  }

  void _calculateFields() {
    final weight = double.tryParse(_weightController.text) ?? 0;
    final birds = double.tryParse(_birdsController.text) ?? 0;
    final price = double.tryParse(_priceController.text) ?? 0;

    if (birds > 0) {
      _avgWeightController.text = (weight / birds).toStringAsFixed(2);
    } else {
      _avgWeightController.text = '0.00';
    }

    _totalAmountController.text = (price * weight).toStringAsFixed(2);
  }

  @override
  void dispose() {
    _vehicleNumberController.dispose();
    _weightController.dispose();
    _birdsController.dispose();
    _priceController.dispose();
    _narrationController.dispose();
    _avgWeightController.dispose();
    _totalAmountController.dispose();
    super.dispose();
  }

  Future<void> _selectDate(BuildContext context) async {
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
        _saleDate = picked;
      });
    }
  }

  void _submitForm() async {
    if (_formKey.currentState!.validate()) {
      final success = await context.read<SalesProvider>().addSaleEntry({
        'season_id': _selectedSeason,
        'batch_id': _selectedBatch,
        'date': _saleDate?.toIso8601String(),
        'buyer_id': _selectedBuyer,
        'vehicle_no': _vehicleNumberController.text,
        'weight': double.tryParse(_weightController.text) ?? 0.0,
        'bird_no': _birdsController.text,
        'price': double.tryParse(_priceController.text) ?? 0.0,
        'payment_type': _paymentType?.toLowerCase(),
        'narration': _narrationController.text,
      });

      if (success) {
        SnackbarUtils.showSuccess("Sale entry added successfully");
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
          "Add New Sale",
          style: TextStyle(
              color: ColorUtils().textColor, fontWeight: FontWeight.bold),
        ),
        backgroundColor: Colors.white,
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
                Consumer<SeasonsProvider>(
                  builder: (context, seasonsProvider, child) {
                    return DropdownButtonFormField<int>(
                      value: _selectedSeason,
                      decoration: InputDecoration(
                        labelText: "Season",
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(8),
                        ),
                        contentPadding: const EdgeInsets.symmetric(
                            horizontal: 12, vertical: 0),
                      ),
                      items: seasonsProvider.seasons.map((e) {
                        return DropdownMenuItem<int>(
                          value: e['id'] as int?,
                          child: Text(e['name'].toString()),
                        );
                      }).toList(),
                      onChanged: (val) => setState(() => _selectedSeason = val),
                      validator: (val) => val == null ? 'Required' : null,
                    );
                  },
                ),
                const SizedBox(height: 16),
                Consumer<BatchesProvider>(
                  builder: (context, batchesProvider, child) {
                    return DropdownButtonFormField<int>(
                      value: _selectedBatch,
                      decoration: InputDecoration(
                        labelText: "Batch",
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(8),
                        ),
                        contentPadding: const EdgeInsets.symmetric(
                            horizontal: 12, vertical: 0),
                      ),
                      items: batchesProvider.batches.map((e) {
                        return DropdownMenuItem<int>(
                          value: e['id'] as int?,
                          child: Text(e['name'].toString()),
                        );
                      }).toList(),
                      onChanged: (val) => setState(() => _selectedBatch = val),
                      validator: (val) => val == null ? 'Required' : null,
                    );
                  },
                ),
                const SizedBox(height: 16),
                InkWell(
                  onTap: () => _selectDate(context),
                  child: InputDecorator(
                    decoration: InputDecoration(
                      labelText: "Sale Date",
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(8),
                      ),
                      suffixIcon: const Icon(Icons.calendar_today),
                      contentPadding: const EdgeInsets.symmetric(
                          horizontal: 12, vertical: 12),
                    ),
                    child: Text(
                      _saleDate != null
                          ? DateFormat('yyyy-MM-dd').format(_saleDate!)
                          : "Select Date",
                      style: TextStyle(
                        color: _saleDate != null ? Colors.black : Colors.grey,
                      ),
                    ),
                  ),
                ),
                const SizedBox(height: 16),
                Consumer<VendorsProvider>(
                  builder: (context, vendorsProvider, child) {
                    return DropdownButtonFormField<int>(
                      value: _selectedBuyer,
                      decoration: InputDecoration(
                        labelText: "Buyer",
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(8),
                        ),
                        contentPadding: const EdgeInsets.symmetric(
                            horizontal: 12, vertical: 0),
                      ),
                      items: vendorsProvider.vendorNames
                          .where((e) =>
                              e['vendor_type']?.toString().toLowerCase() ==
                              'buyer')
                          .map((e) {
                        return DropdownMenuItem<int>(
                          value: e['id'] as int?,
                          child: Text(e['name'].toString()),
                        );
                      }).toList(),
                      onChanged: (val) => setState(() => _selectedBuyer = val),
                      validator: (val) => val == null ? 'Required' : null,
                    );
                  },
                ),
                const SizedBox(height: 16),
                TextFormField(
                  controller: _vehicleNumberController,
                  decoration: InputDecoration(
                    labelText: "Vehicle Number",
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(8),
                    ),
                  ),
                  validator: (val) => val!.isEmpty ? 'Required' : null,
                ),
                const SizedBox(height: 16),
                TextFormField(
                  controller: _weightController,
                  keyboardType: TextInputType.number,
                  decoration: InputDecoration(
                    labelText: "Weight (kg)",
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(8),
                    ),
                  ),
                  validator: (val) => val!.isEmpty ? 'Required' : null,
                ),
                const SizedBox(height: 16),
                TextFormField(
                  controller: _birdsController,
                  keyboardType: TextInputType.number,
                  decoration: InputDecoration(
                    labelText: "Number of Birds",
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(8),
                    ),
                  ),
                  validator: (val) => val!.isEmpty ? 'Required' : null,
                ),
                const SizedBox(height: 16),
                TextFormField(
                  controller: _avgWeightController,
                  decoration: InputDecoration(
                    labelText: "AVG Weight",
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(8),
                    ),
                    filled: true,
                    fillColor: Colors.grey.shade100,
                  ),
                  readOnly: true,
                ),
                const SizedBox(height: 16),
                TextFormField(
                  controller: _priceController,
                  keyboardType: TextInputType.number,
                  decoration: InputDecoration(
                    labelText: "Price per Unit",
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(8),
                    ),
                  ),
                  validator: (val) => val!.isEmpty ? 'Required' : null,
                ),
                const SizedBox(height: 16),
                TextFormField(
                  controller: _totalAmountController,
                  decoration: InputDecoration(
                    labelText: "Net Amount",
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(8),
                    ),
                    filled: true,
                    fillColor: Colors.grey.shade100,
                  ),
                  readOnly: true,
                ),
                const SizedBox(height: 16),
                DropdownButtonFormField<String>(
                  value: _paymentType,
                  decoration: InputDecoration(
                    labelText: "Payment Type",
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(8),
                    ),
                  ),
                  items: _paymentTypes.map((e) {
                    return DropdownMenuItem<String>(
                      value: e,
                      child: Text(e),
                    );
                  }).toList(),
                  onChanged: (val) => setState(() => _paymentType = val),
                  validator: (val) => val == null ? 'Required' : null,
                ),
                const SizedBox(height: 16),
                TextFormField(
                  controller: _narrationController,
                  maxLines: 3,
                  decoration: InputDecoration(
                    labelText: "Narration",
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(8),
                    ),
                    alignLabelWithHint: true, // Key for multi-line labels
                  ),
                ),
                const SizedBox(height: 32),
                Consumer<SalesProvider>(
                  builder: (context, provider, child) {
                    return SizedBox(
                      width: double.infinity,
                      child: ElevatedButton(
                        onPressed: provider.isLoading ? null : _submitForm,
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.green, // Green submit button
                          foregroundColor: Colors.white,
                          padding: const EdgeInsets.symmetric(vertical: 16),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(8),
                          ),
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
                                "Submit",
                                style: TextStyle(
                                  fontSize: 16,
                                  fontWeight: FontWeight.bold,
                                ),
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
