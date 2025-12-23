import 'package:farmora/providers/vendors_provider.dart';
import 'package:farmora/utils/colors.dart';
import 'package:farmora/widgets/server_error_text.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';

class AddReturns extends StatefulWidget {
  final Map<String, dynamic>? returnData;
  const AddReturns({super.key, this.returnData});

  @override
  State<AddReturns> createState() => _AddReturnsState();
}

class _AddReturnsState extends State<AddReturns> {
  final _formKey = GlobalKey<FormState>();

  // Fields
  String _returnType = 'Vendor';
  int? _selectedCategory;
  int? _selectedBatch; // From Batch
  int? _selectedVendor; // To Vendor
  DateTime _returnDate = DateTime.now();
  final TextEditingController _quantityController = TextEditingController();
  final TextEditingController _rateController = TextEditingController();
  final TextEditingController _totalAmountController = TextEditingController();
  String _status = 'Pending';
  bool _isEditMode = false;

  @override
  void initState() {
    super.initState();
    if (widget.returnData != null) {
      _isEditMode = true;
      final data = widget.returnData!;
      _returnType = data['return_type'] == 'vendor' ? 'Vendor' : 'Batch';
      _selectedCategory = data['category']?['id'];
      _selectedBatch = data['from_batch_data']?['id'];
      _selectedVendor = data['to_vendor_data']?['id'];

      // Handle Date
      if (data['date'] != null) {
        _returnDate = DateTime.parse(data['date']);
      }

      _quantityController.text = data['quantity']?.toString() ?? '';
      _rateController.text = data['rate_per_bag']?.toString() ?? '';
      _totalAmountController.text = data['total_amount']?.toString() ?? '';

      // Capitalize status for dropdown match: 'completed' -> 'Completed'
      if (data['status'] != null) {
        String s = data['status'].toString();
        _status = s[0].toUpperCase() + s.substring(1);
      }
    }

    WidgetsBinding.instance.addPostFrameCallback((_) {
      final vendorProvider =
          Provider.of<VendorsProvider>(context, listen: false);
      vendorProvider.fetchVendorNames();
      vendorProvider.fetchCategoriesNames();
      vendorProvider.fetchBatchesNames();
      vendorProvider.clearErrors();
    });
  }

  @override
  void dispose() {
    _quantityController.dispose();
    _rateController.dispose();
    _totalAmountController.dispose();
    super.dispose();
  }

  Future<void> _selectDate(BuildContext context) async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: _returnDate,
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
    if (picked != null && picked != _returnDate) {
      setState(() {
        _returnDate = picked;
      });
    }
  }

  Future<void> _handleSubmit(VendorsProvider provider) async {
    final payload = {
      "return_type": _returnType.toLowerCase(),
      "item_category_id": _selectedCategory,
      "date": _returnDate.toIso8601String(),
      "from_batch": _selectedBatch,
      "to_batch": null,
      "to_vendor": _returnType == 'Vendor' ? _selectedVendor : null,
      "quantity": _quantityController.text,
      "rate_per_bag": _rateController.text,
      "total_amount": _totalAmountController.text,
      "status": _status.toLowerCase(),
    };

    bool success;
    if (_isEditMode && widget.returnData != null) {
      final id = widget.returnData!['id'];
      success = await provider.updateReturn(id, payload);
    } else {
      success = await provider.createReturn(payload);
    }

    if (success && mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
            content: Text(_isEditMode
                ? "Return Updated Successfully"
                : "Return Added Successfully")),
      );
      Navigator.pop(context);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: ColorUtils().backgroundColor,
      appBar: AppBar(
        title: Text(
          _isEditMode ? "Edit Return" : "Add Return",
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
      body: Consumer<VendorsProvider>(
        builder: (context, vendorProvider, child) {
          return SingleChildScrollView(
            padding: const EdgeInsets.all(16.0),
            child: Form(
              key: _formKey,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _buildLabel("Return Type"),
                  _buildDropdown(
                    value: _returnType,
                    items: ['Vendor', 'Batch']
                        .map((e) => DropdownMenuItem(value: e, child: Text(e)))
                        .toList(),
                    onChanged: (val) =>
                        setState(() => _returnType = val as String),
                  ),
                  ServerErrorText(
                    errors: vendorProvider.validationErrors,
                    fieldName: "return_type",
                  ),
                  const SizedBox(height: 16),
                  _buildLabel("Category"),
                  _buildDropdown<int>(
                    value: _selectedCategory,
                    hint: "Select Category",
                    items: vendorProvider.categoriesNames.map((e) {
                      return DropdownMenuItem<int>(
                        value: e['id'] as int?,
                        child: Text(e['name'].toString()),
                      );
                    }).toList(),
                    onChanged: (val) => setState(() => _selectedCategory = val),
                  ),
                  ServerErrorText(
                    errors: vendorProvider.validationErrors,
                    fieldName: "item_category_id",
                  ),
                  const SizedBox(height: 16),
                  _buildLabel("From Batch"),
                  _buildDropdown<int>(
                    value: _selectedBatch,
                    hint: "Select Batch",
                    items: vendorProvider.batchesNames.map((e) {
                      return DropdownMenuItem<int>(
                        value: e['id'] as int?,
                        child: Text(e['name'].toString()),
                      );
                    }).toList(),
                    onChanged: (val) => setState(() => _selectedBatch = val),
                  ),
                  ServerErrorText(
                    errors: vendorProvider.validationErrors,
                    fieldName: "from_batch",
                  ),
                  const SizedBox(height: 16),
                  _buildLabel("Return Date"),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      InkWell(
                        onTap: () => _selectDate(context),
                        child: Container(
                          padding: const EdgeInsets.symmetric(
                              horizontal: 12, vertical: 16),
                          decoration: BoxDecoration(
                            border: Border.all(color: Colors.grey.shade400),
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text(
                                DateFormat('yyyy-MM-dd').format(_returnDate),
                                style: TextStyle(color: ColorUtils().textColor),
                              ),
                              Icon(Icons.calendar_today,
                                  color: ColorUtils().primaryColor),
                            ],
                          ),
                        ),
                      ),
                      ServerErrorText(
                        errors: vendorProvider.validationErrors,
                        fieldName: "date",
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),
                  _buildLabel("To Vendor"),
                  _buildDropdown<int>(
                    value: _selectedVendor,
                    hint: "Select Vendor",
                    items: vendorProvider.vendorNames.map((e) {
                      return DropdownMenuItem<int>(
                        value: e['id'] as int?,
                        child: Text(e['name'].toString()),
                      );
                    }).toList(),
                    onChanged: (val) => setState(() => _selectedVendor = val),
                  ),
                  ServerErrorText(
                    errors: vendorProvider.validationErrors,
                    fieldName: "to_vendor",
                  ),
                  const SizedBox(height: 16),
                  _buildLabel("Quantity"),
                  _buildTextField(
                    controller: _quantityController,
                    hint: "Enter Quantity",
                    keyboardType: TextInputType.number,
                  ),
                  ServerErrorText(
                    errors: vendorProvider.validationErrors,
                    fieldName: "quantity",
                  ),
                  const SizedBox(height: 16),
                  _buildLabel("Rate Per Bag"),
                  _buildTextField(
                    controller: _rateController,
                    hint: "Enter Rate",
                    keyboardType:
                        TextInputType.numberWithOptions(decimal: true),
                  ),
                  ServerErrorText(
                    errors: vendorProvider.validationErrors,
                    fieldName: "rate_per_bag",
                  ),
                  const SizedBox(height: 16),
                  _buildLabel("Total Amount"),
                  _buildTextField(
                    controller: _totalAmountController,
                    hint: "Enter Total Amount",
                    keyboardType:
                        TextInputType.numberWithOptions(decimal: true),
                  ),
                  ServerErrorText(
                    errors: vendorProvider.validationErrors,
                    fieldName: "total_amount",
                  ),
                  const SizedBox(height: 16),
                  _buildLabel("Status"),
                  _buildDropdown(
                    value: _status,
                    items: ['Completed', 'Cancelled', 'Pending']
                        .map((e) => DropdownMenuItem(value: e, child: Text(e)))
                        .toList(),
                    onChanged: (val) => setState(() => _status = val as String),
                  ),
                  ServerErrorText(
                    errors: vendorProvider.validationErrors,
                    fieldName: "status",
                  ),
                  const SizedBox(height: 32),
                  if (vendorProvider.error != null)
                    Padding(
                      padding: const EdgeInsets.only(bottom: 16.0),
                      child: Text(vendorProvider.error!,
                          style: const TextStyle(color: Colors.red)),
                    ),
                  SizedBox(
                    width: double.infinity,
                    height: 50,
                    child: ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: ColorUtils().primaryColor,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(8),
                        ),
                      ),
                      onPressed: vendorProvider.isLoading
                          ? null
                          : () => _handleSubmit(vendorProvider),
                      child: vendorProvider.isLoading
                          ? const CircularProgressIndicator(color: Colors.white)
                          : Text(_isEditMode ? "Update Return" : "Save Return",
                              style: const TextStyle(
                                  fontSize: 16, color: Colors.white)),
                    ),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }

  Widget _buildLabel(String text) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8.0),
      child: Text(
        text,
        style: TextStyle(
          fontWeight: FontWeight.w600,
          color: ColorUtils().textColor,
          fontSize: 14,
        ),
      ),
    );
  }

  Widget _buildTextField({
    required TextEditingController controller,
    required String hint,
    TextInputType keyboardType = TextInputType.text,
  }) {
    return TextFormField(
      controller: controller,
      keyboardType: keyboardType,
      decoration: InputDecoration(
        hintText: hint,
        contentPadding:
            const EdgeInsets.symmetric(horizontal: 12, vertical: 16),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(8),
          borderSide: BorderSide(color: Colors.grey.shade400),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(8),
          borderSide: BorderSide(color: Colors.grey.shade400),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(8),
          borderSide: BorderSide(color: ColorUtils().primaryColor),
        ),
      ),
    );
  }

  Widget _buildDropdown<T>({
    required T? value,
    required List<DropdownMenuItem<T>> items,
    required ValueChanged<T?> onChanged,
    String? hint,
  }) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12),
      decoration: BoxDecoration(
        border: Border.all(color: Colors.grey.shade400),
        borderRadius: BorderRadius.circular(8),
      ),
      child: DropdownButtonHideUnderline(
        child: DropdownButton<T>(
          value: value,
          hint: hint != null ? Text(hint) : null,
          isExpanded: true,
          items: items,
          onChanged: onChanged,
          dropdownColor: ColorUtils().whiteColor,
        ),
      ),
    );
  }
}
