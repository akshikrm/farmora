import 'dart:developer';

import 'package:farmora/providers/batches/batchesProvider.dart';
import 'package:farmora/providers/items_provider.dart';
import 'package:farmora/providers/vendors_provider.dart';
import 'package:farmora/utils/colors.dart';
import 'package:farmora/utils/snackbar_utils.dart';
import 'package:farmora/widgets/server_error_text.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';

class AddPurchases extends StatefulWidget {
  final Map<String, dynamic>? item;

  const AddPurchases({super.key, this.item});

  @override
  State<AddPurchases> createState() => _AddPurchasesState();
}

class _AddPurchasesState extends State<AddPurchases> {
  final _formKey = GlobalKey<FormState>();

  // Text controllers
  late TextEditingController _nameController;
  late TextEditingController _totalPriceController;
  late TextEditingController _netAmountController;
  late TextEditingController _invoiceNumberController;
  late TextEditingController _quantityController;
  late TextEditingController _discountPriceController;
  late TextEditingController _pricePerUnitController;
  late TextEditingController _assignQuantityController;
  late TextEditingController _invoiceDateController;

  // Dropdown values
  int? _selectedVendorId;
  int? _selectedBatchId;
  int? _selectedCategoryId;
  DateTime? _selectedInvoiceDate;

  @override
  void initState() {
    super.initState();
    final item = widget.item;

    _nameController =
        TextEditingController(text: item?["name"] as String? ?? '');
    _totalPriceController =
        TextEditingController(text: item?["total_price"] as String? ?? '');
    _netAmountController =
        TextEditingController(text: item?["net_amount"] as String? ?? '');
    _invoiceNumberController =
        TextEditingController(text: item?["invoice_number"] as String? ?? '');
    _quantityController = TextEditingController(
        text: item?["quantity"].toString() as String? ?? '');
    _discountPriceController =
        TextEditingController(text: item?["discount_price"] as String? ?? '');
    _pricePerUnitController =
        TextEditingController(text: item?["price_per_unit"] as String? ?? '');
    _assignQuantityController =
        TextEditingController(text: item?["assign_quantity"] as String? ?? '');
    _invoiceDateController = TextEditingController(
        text: item?["invoice_date"] != null
            ? DateFormat('dd/MM/yyyy')
                .format(DateTime.parse(item!["invoice_date"]))
            : '');

    if (item != null) {
      _selectedVendorId = item["vendor"]["id"] as int?;
      _selectedBatchId = item["batch_id"] as int?;
      log("selected batch id is $_selectedBatchId");
      _selectedCategoryId = item["category"]["id"] as int?;
      if (item["invoice_date"] != null) {
        _selectedInvoiceDate = DateTime.parse(item["invoice_date"]);
      }
    }

    // Load data for dropdowns
    Future.delayed(Duration.zero, () {
      context.read<VendorsProvider>().fetchVendorNames();
      context.read<VendorsProvider>().fetchCategoriesNames();
      context.read<VendorsProvider>().fetchBatchesNames();
      context.read<ItemsProvider>().clearErrors();
    });
  }

  @override
  void dispose() {
    _nameController.dispose();
    _totalPriceController.dispose();
    _netAmountController.dispose();
    _invoiceNumberController.dispose();
    _quantityController.dispose();
    _discountPriceController.dispose();
    _pricePerUnitController.dispose();
    _assignQuantityController.dispose();
    _invoiceDateController.dispose();
    super.dispose();
  }

  Future<void> _selectInvoiceDate() async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: _selectedInvoiceDate ?? DateTime.now(),
      firstDate: DateTime(2000),
      lastDate: DateTime(2100),
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

    if (picked != null && picked != _selectedInvoiceDate) {
      setState(() {
        _selectedInvoiceDate = picked;
        _invoiceDateController.text = DateFormat('dd/MM/yyyy').format(picked);
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final vendorsProvider = context.watch<VendorsProvider>();
    final batchesProvider = context.watch<BatchesProvider>();
    final itemsProvider = context.watch<ItemsProvider>();

    final vendors = vendorsProvider.vendorNames;
    log("vendor data is $vendors");
    final batches = vendorsProvider.batchesNames;
    final categories = vendorsProvider.categoriesNames;

    return Scaffold(
      backgroundColor: ColorUtils().backgroundColor,
      appBar: AppBar(
        title: Text(
          widget.item == null ? 'Add Purchase' : 'Edit Purchase',
          style: TextStyle(fontWeight: FontWeight.w600),
        ),
        centerTitle: true,
        backgroundColor: ColorUtils().backgroundColor,
        elevation: 0,
      ),
      body: Form(
        key: _formKey,
        child: ListView(
          padding: const EdgeInsets.all(16),
          children: [
            // Name Field
            TextFormField(
              controller: _nameController,
              decoration: InputDecoration(
                labelText: 'Item Name',
                prefixIcon:
                    Icon(Icons.inventory_2, color: ColorUtils().primaryColor),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
                filled: true,
                fillColor: ColorUtils().cardColor,
              ),
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return 'Please enter item name';
                }
                return null;
              },
            ),
            ServerErrorText(
              errors: itemsProvider.validationErrors,
              fieldName: "name",
            ),
            const SizedBox(height: 16),

            // Vendor Dropdown
            DropdownButtonFormField<int>(
              value: _selectedVendorId,
              items: vendors.map<DropdownMenuItem<int>>((vendor) {
                final id = vendor['id'] as int;
                final name = vendor['name'] ?? 'Vendor';
                return DropdownMenuItem(
                  value: id,
                  child: Text(name.toString()),
                );
              }).toList(),
              onChanged: (val) => setState(() => _selectedVendorId = val),
              decoration: InputDecoration(
                labelText: 'Vendor',
                prefixIcon: Icon(Icons.store, color: ColorUtils().primaryColor),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
                filled: true,
                fillColor: ColorUtils().cardColor,
              ),
              validator: (v) => v == null ? 'Please select a vendor' : null,
            ),
            ServerErrorText(
              errors: itemsProvider.validationErrors,
              fieldName: "vendor_id",
            ),
            const SizedBox(height: 16),

            // Batch Dropdown
            DropdownButtonFormField<int>(
              value: _selectedBatchId,
              items: batches.map<DropdownMenuItem<int>>((batch) {
                final id = (batch['id'] ?? batch['batch_id']) as int;
                final name = batch['name'] ?? 'Batch';
                return DropdownMenuItem(
                  value: id,
                  child: Text(name.toString()),
                );
              }).toList(),
              onChanged: (val) => setState(() => _selectedBatchId = val),
              decoration: InputDecoration(
                labelText: 'Batch',
                prefixIcon:
                    Icon(Icons.layers, color: ColorUtils().primaryColor),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
                filled: true,
                fillColor: ColorUtils().cardColor,
              ),
              validator: (v) => v == null ? 'Please select a batch' : null,
            ),
            ServerErrorText(
              errors: itemsProvider.validationErrors,
              fieldName: "batch_id",
            ),
            const SizedBox(height: 16),

            // Category Dropdown
            DropdownButtonFormField<int>(
              value: _selectedCategoryId,
              items: categories.map<DropdownMenuItem<int>>((category) {
                final id = category['id'] as int;
                final name = category['name'] ?? 'Category';
                return DropdownMenuItem(
                  value: id,
                  child: Text(name.toString()),
                );
              }).toList(),
              onChanged: (val) => setState(() => _selectedCategoryId = val),
              decoration: InputDecoration(
                labelText: 'Category',
                prefixIcon:
                    Icon(Icons.category, color: ColorUtils().primaryColor),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
                filled: true,
                fillColor: ColorUtils().cardColor,
              ),
              validator: (v) => v == null ? 'Please select a category' : null,
            ),
            ServerErrorText(
              errors: itemsProvider.validationErrors,
              fieldName: "category_id",
            ),
            const SizedBox(height: 16),

            // Invoice Date
            TextFormField(
              controller: _invoiceDateController,
              readOnly: true,
              onTap: _selectInvoiceDate,
              decoration: InputDecoration(
                labelText: 'Invoice Date',
                prefixIcon: Icon(Icons.calendar_today,
                    color: ColorUtils().primaryColor),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
                filled: true,
                fillColor: ColorUtils().cardColor,
              ),
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return 'Please select invoice date';
                }
                return null;
              },
            ),
            ServerErrorText(
              errors: itemsProvider.validationErrors,
              fieldName: "invoice_date",
            ),
            const SizedBox(height: 16),

            // Total Price
            TextFormField(
              controller: _totalPriceController,
              decoration: InputDecoration(
                labelText: 'Total Price',
                prefixIcon:
                    Icon(Icons.attach_money, color: ColorUtils().primaryColor),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
                filled: true,
                fillColor: ColorUtils().cardColor,
              ),
              keyboardType: TextInputType.numberWithOptions(decimal: true),
              inputFormatters: [
                FilteringTextInputFormatter.allow(RegExp(r'^\d+\.?\d{0,2}')),
              ],
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return 'Please enter total price';
                }
                if (double.tryParse(value) == null) {
                  return 'Please enter a valid number';
                }
                return null;
              },
            ),
            ServerErrorText(
              errors: itemsProvider.validationErrors,
              fieldName: "total_price",
            ),
            const SizedBox(height: 16),

            // Net Amount
            TextFormField(
              controller: _netAmountController,
              decoration: InputDecoration(
                labelText: 'Net Amount',
                prefixIcon: Icon(Icons.money, color: ColorUtils().primaryColor),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
                filled: true,
                fillColor: ColorUtils().cardColor,
              ),
              keyboardType: TextInputType.numberWithOptions(decimal: true),
              inputFormatters: [
                FilteringTextInputFormatter.allow(RegExp(r'^\d+\.?\d{0,2}')),
              ],
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return 'Please enter net amount';
                }
                if (double.tryParse(value) == null) {
                  return 'Please enter a valid number';
                }
                return null;
              },
            ),
            ServerErrorText(
              errors: itemsProvider.validationErrors,
              fieldName: "net_amount",
            ),
            const SizedBox(height: 16),

            // Invoice Number
            TextFormField(
              controller: _invoiceNumberController,
              decoration: InputDecoration(
                labelText: 'Invoice Number',
                prefixIcon:
                    Icon(Icons.receipt, color: ColorUtils().primaryColor),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
                filled: true,
                fillColor: ColorUtils().cardColor,
              ),
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return 'Please enter invoice number';
                }
                return null;
              },
            ),
            ServerErrorText(
              errors: itemsProvider.validationErrors,
              fieldName: "invoice_number",
            ),
            const SizedBox(height: 16),

            // Quantity
            TextFormField(
              controller: _quantityController,
              decoration: InputDecoration(
                labelText: 'Quantity',
                prefixIcon: Icon(Icons.production_quantity_limits,
                    color: ColorUtils().primaryColor),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
                filled: true,
                fillColor: ColorUtils().cardColor,
              ),
              keyboardType: TextInputType.number,
              inputFormatters: [
                FilteringTextInputFormatter.digitsOnly,
              ],
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return 'Please enter quantity';
                }
                if (int.tryParse(value) == null) {
                  return 'Please enter a valid number';
                }
                return null;
              },
            ),
            ServerErrorText(
              errors: itemsProvider.validationErrors,
              fieldName: "quantity",
            ),
            const SizedBox(height: 16),

            // Discount Price
            TextFormField(
              controller: _discountPriceController,
              decoration: InputDecoration(
                labelText: 'Discount Price',
                prefixIcon:
                    Icon(Icons.discount, color: ColorUtils().primaryColor),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
                filled: true,
                fillColor: ColorUtils().cardColor,
              ),
              keyboardType: TextInputType.numberWithOptions(decimal: true),
              inputFormatters: [
                FilteringTextInputFormatter.allow(RegExp(r'^\d+\.?\d{0,2}')),
              ],
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return 'Please enter discount price';
                }
                if (double.tryParse(value) == null) {
                  return 'Please enter a valid number';
                }
                return null;
              },
            ),
            ServerErrorText(
              errors: itemsProvider.validationErrors,
              fieldName: "discount_price",
            ),
            const SizedBox(height: 16),

            // Price Per Unit
            TextFormField(
              controller: _pricePerUnitController,
              decoration: InputDecoration(
                labelText: 'Price Per Unit',
                prefixIcon:
                    Icon(Icons.price_change, color: ColorUtils().primaryColor),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
                filled: true,
                fillColor: ColorUtils().cardColor,
              ),
              keyboardType: TextInputType.numberWithOptions(decimal: true),
              inputFormatters: [
                FilteringTextInputFormatter.allow(RegExp(r'^\d+\.?\d{0,2}')),
              ],
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return 'Please enter price per unit';
                }
                if (double.tryParse(value) == null) {
                  return 'Please enter a valid number';
                }
                return null;
              },
            ),
            ServerErrorText(
              errors: itemsProvider.validationErrors,
              fieldName: "price_per_unit",
            ),
            const SizedBox(height: 16),

            // Assign Quantity
            TextFormField(
              controller: _assignQuantityController,
              decoration: InputDecoration(
                labelText: 'Assign Quantity',
                prefixIcon:
                    Icon(Icons.assignment, color: ColorUtils().primaryColor),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
                filled: true,
                fillColor: ColorUtils().cardColor,
              ),
              keyboardType: TextInputType.number,
              inputFormatters: [
                FilteringTextInputFormatter.digitsOnly,
              ],
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return 'Please enter assign quantity';
                }
                if (int.tryParse(value) == null) {
                  return 'Please enter a valid number';
                }
                return null;
              },
            ),
            ServerErrorText(
              errors: itemsProvider.validationErrors,
              fieldName: "assign_quantity",
            ),
            const SizedBox(height: 24),

            // Submit Button
            ElevatedButton(
              onPressed: itemsProvider.isLoading ? null : _submitForm,
              style: ElevatedButton.styleFrom(
                backgroundColor: ColorUtils().primaryColor,
                padding: const EdgeInsets.symmetric(vertical: 16),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
                elevation: 2,
              ),
              child: itemsProvider.isLoading
                  ? SizedBox(
                      height: 20,
                      width: 20,
                      child: CircularProgressIndicator(
                        strokeWidth: 2,
                        valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
                      ),
                    )
                  : Text(
                      widget.item == null ? 'Add Purchase' : 'Update Purchase',
                      style: const TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.w600,
                        color: Colors.white,
                      ),
                    ),
            ),
          ],
        ),
      ),
    );
  }

  Future<void> _submitForm() async {
    if (!_formKey.currentState!.validate()) return;

    final itemData = {
      'name': _nameController.text,
      'vendor_id': _selectedVendorId,
      'batch_id': _selectedBatchId,
      'category_id': _selectedCategoryId,
      'invoice_date': _selectedInvoiceDate?.toIso8601String(),
      'total_price': _totalPriceController.text,
      'net_amount': _netAmountController.text,
      'invoice_number': _invoiceNumberController.text,
      'quantity': _quantityController.text,
      'discount_price': _discountPriceController.text,
      'price_per_unit': _pricePerUnitController.text,
      'assign_quantity': _assignQuantityController.text,
    };

    final provider = context.read<ItemsProvider>();
    bool success;

    if (widget.item != null && widget.item!['id'] != null) {
      success = await provider.updateItem(widget.item!['id'] as int, itemData);
    } else {
      success = await provider.addItem(itemData);
    }

    if (!mounted) return;

    if (success) {
      Navigator.pop(context, true);
      SnackbarUtils.showSuccess(
        widget.item != null
            ? 'Item updated successfully'
            : 'Item added successfully',
      );
    } else {
      SnackbarUtils.showError(provider.error ?? 'Failed to save item');
    }
  }
}
