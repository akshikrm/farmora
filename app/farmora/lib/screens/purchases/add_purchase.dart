import 'dart:developer';

import 'package:farmora/providers/batches/batchesProvider.dart';
import 'package:farmora/providers/items_provider.dart';
import 'package:farmora/providers/seasons/seasonsProvider.dart';
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
  int? _selectedSeasonId;
  String? _selectedPaymentType;
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
            ? DateFormat('dd-MM-yyyy')
                .format(DateTime.parse(item!["invoice_date"]))
            : DateFormat('dd-MM-yyyy').format(DateTime.now()));

    if (item != null) {
      _selectedVendorId = item["vendor"]["id"] as int?;
      _selectedBatchId = item["batch_id"] as int?;
      _selectedCategoryId = item["category"]["id"] as int?;
      _selectedSeasonId = item["season_id"] as int?;
      _selectedPaymentType = item["payment_type"]?.toString().toLowerCase();
      if (item["invoice_date"] != null) {
        _selectedInvoiceDate = DateTime.parse(item["invoice_date"]);
      }
    } else {
      _selectedInvoiceDate = DateTime.now();
      _selectedPaymentType = 'credit';
    }

    // Load data for dropdowns
    Future.delayed(Duration.zero, () {
      context.read<VendorsProvider>().fetchVendorNames();
      context.read<SeasonsProvider>().loadSeasons();
      context.read<ItemsProvider>().clearErrors();

      if (widget.item == null) {
        context.read<ItemsProvider>().fetchInvoiceNumber();
      }
    });

    _quantityController.addListener(_calculateTotals);
    _pricePerUnitController.addListener(_calculateTotals);
    _discountPriceController.addListener(_calculateTotals);
    _totalPriceController.addListener(_calculateFromTotal);
  }

  void _calculateTotals() {
    if (_isCalculating) return;
    _isCalculating = true;

    final qty = double.tryParse(_quantityController.text) ?? 0;
    final pricePerUnit = double.tryParse(_pricePerUnitController.text) ?? 0;
    final discount = double.tryParse(_discountPriceController.text) ?? 0;

    final total = qty * pricePerUnit;
    final net = total + discount;

    if (_totalPriceController.text != total.toStringAsFixed(0)) {
      _totalPriceController.text = total.toStringAsFixed(0);
    }
    if (_netAmountController.text != net.toStringAsFixed(0)) {
      _netAmountController.text = net.toStringAsFixed(0);
    }

    _isCalculating = false;
  }

  void _calculateFromTotal() {
    if (_isCalculating) return;
    _isCalculating = true;

    final total = double.tryParse(_totalPriceController.text) ?? 0;
    final qty = double.tryParse(_quantityController.text) ?? 1;
    final discount = double.tryParse(_discountPriceController.text) ?? 0;

    final pricePerUnit = total / (qty > 0 ? qty : 1);
    final net = total + discount;

    if (_pricePerUnitController.text != pricePerUnit.toStringAsFixed(2)) {
      _pricePerUnitController.text = pricePerUnit.toStringAsFixed(2);
    }
    if (_netAmountController.text != net.toStringAsFixed(0)) {
      _netAmountController.text = net.toStringAsFixed(0);
    }

    _isCalculating = false;
  }

  bool _isCalculating = false;

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
        _invoiceDateController.text = DateFormat('dd-MM-yyyy').format(picked);
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final vendorsProvider = context.watch<VendorsProvider>();
    final itemsProvider = context.watch<ItemsProvider>();
    final seasonsProvider = context.watch<SeasonsProvider>();
    final batchesProvider = context.watch<BatchesProvider>();

    final vendors = vendorsProvider.vendorNames;
    final seasons = seasonsProvider.seasons;
    final items = itemsProvider.itemsByVendor;
    final batches = batchesProvider.batchesBySeason;

    if (widget.item == null &&
        itemsProvider.invoiceNumber != null &&
        _invoiceNumberController.text.isEmpty) {
      _invoiceNumberController.text = itemsProvider.invoiceNumber!;
    }

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
            // Season Dropdown
            DropdownButtonFormField<int>(
              value: _selectedSeasonId,
              items: seasons.map<DropdownMenuItem<int>>((season) {
                final id = season['id'] as int;
                final name = season['name'] ?? 'Season';
                return DropdownMenuItem(
                  value: id,
                  child: Text(name.toString()),
                );
              }).toList(),
              onChanged: (val) {
                setState(() {
                  _selectedSeasonId = val;
                  _selectedBatchId = null; // Clear batch
                });
                if (val != null) {
                  context.read<BatchesProvider>().fetchBatchesBySeason(val);
                } else {
                  context.read<BatchesProvider>().clearBatchesBySeason();
                }
              },
              decoration: InputDecoration(
                labelText: 'Season',
                prefixIcon:
                    Icon(Icons.wb_sunny, color: ColorUtils().primaryColor),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
                filled: true,
                fillColor: ColorUtils().cardColor,
              ),
              validator: (v) => v == null ? 'Please select a season' : null,
            ),
            ServerErrorText(
              errors: itemsProvider.validationErrors,
              fieldName: "season_id",
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

            // Vendor Dropdown
            DropdownButtonFormField<int>(
              value: _selectedVendorId,
              items: vendors
                  .where((e) =>
                      e['vendor_type']?.toString().toLowerCase() == 'supplier')
                  .map<DropdownMenuItem<int>>((vendor) {
                final id = vendor['id'] as int;
                final name = vendor['name'] ?? 'Vendor';
                return DropdownMenuItem(
                  value: id,
                  child: Text(name.toString()),
                );
              }).toList(),
              onChanged: (val) {
                setState(() {
                  _selectedVendorId = val;
                  _selectedCategoryId = null; // Clear category
                });
                if (val != null) {
                  context.read<ItemsProvider>().fetchItemsByVendor(val);
                  if (_selectedSeasonId != null) {
                    context
                        .read<BatchesProvider>()
                        .fetchBatchesBySeason(_selectedSeasonId!);
                  }
                } else {
                  context.read<ItemsProvider>().clearItemsByVendor();
                }
              },
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

            // Type Dropdown (Category)
            DropdownButtonFormField<int>(
              value: _selectedCategoryId,
              items: items.map<DropdownMenuItem<int>>((item) {
                final id = item['id'] as int;
                String type = (item['type'] ?? 'Item').toString();
                if (type.isNotEmpty) {
                  type = type[0].toUpperCase() + type.substring(1);
                }
                return DropdownMenuItem(
                  value: id,
                  child: Text(type),
                );
              }).toList(),
              onChanged: (val) {
                setState(() {
                  _selectedCategoryId = val;
                });
                if (val != null) {
                  final selectedItem = items.firstWhere((i) => i['id'] == val);
                  final basePrice = selectedItem['base_price'];
                  final type = selectedItem['type'];

                  if (basePrice != null) {
                    _pricePerUnitController.text = basePrice.toString();
                  }

                  if (type == 'working' || type == 'integration') {
                    _quantityController.text = "1";
                    setState(() {
                      _selectedPaymentType =
                          type == 'working' ? 'paid' : 'credit';
                    });
                  }
                }
              },
              decoration: InputDecoration(
                labelText: 'Type',
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

            // Batch Dropdown
            DropdownButtonFormField<int>(
              value: _selectedBatchId,
              items: batches.map<DropdownMenuItem<int>>((batch) {
                final id = batch['id'] as int;
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
              readOnly: _selectedCategoryId != null &&
                  (() {
                    final selectedItem = items.firstWhere(
                        (i) => i['id'] == _selectedCategoryId,
                        orElse: () => {});
                    return selectedItem['type'] == 'working' ||
                        selectedItem['type'] == 'integration';
                  }()),
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

            // Rate/Number (Price Per Unit)
            TextFormField(
              controller: _pricePerUnitController,
              decoration: InputDecoration(
                labelText: 'Rate/Number',
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

            // Total Amount (Total Price)
            TextFormField(
              controller: _totalPriceController,
              decoration: InputDecoration(
                labelText: 'Total Amount',
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

            // Discount/Round Off (Discount Price)
            TextFormField(
              controller: _discountPriceController,
              decoration: InputDecoration(
                labelText: 'Discount/Round Off',
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
            const SizedBox(height: 16),

            // Payment Type Dropdown
            DropdownButtonFormField<String>(
              value: _selectedPaymentType,
              items: ['Credit', 'Paid'].map<DropdownMenuItem<String>>((type) {
                return DropdownMenuItem(
                  value: type.toLowerCase(),
                  child: Text(type),
                );
              }).toList(),
              onChanged: (_selectedCategoryId != null &&
                      (() {
                        final selectedItem = items.firstWhere(
                            (i) => i['id'] == _selectedCategoryId,
                            orElse: () => {});
                        return selectedItem['type'] == 'working' ||
                            selectedItem['type'] == 'integration';
                      }()))
                  ? null
                  : (val) => setState(() => _selectedPaymentType = val),
              decoration: InputDecoration(
                labelText: 'Payment Type',
                prefixIcon:
                    Icon(Icons.payment, color: ColorUtils().primaryColor),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
                filled: true,
                fillColor: ColorUtils().cardColor,
              ),
              validator: (v) =>
                  v == null ? 'Please select a payment type' : null,
            ),
            ServerErrorText(
              errors: itemsProvider.validationErrors,
              fieldName: "payment_type",
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
      // 'name': _nameController.text,
      'vendor_id': _selectedVendorId,
      'batch_id': _selectedBatchId,
      'category_id': _selectedCategoryId,
      'season_id': _selectedSeasonId,
      'payment_type': _selectedPaymentType?.toLowerCase().toString(),
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
