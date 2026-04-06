import 'package:farmora/providers/items_provider.dart';
import 'package:farmora/providers/vendors_provider.dart';
import 'package:farmora/utils/colors.dart';
import 'package:farmora/utils/snackbar_utils.dart';
import 'package:farmora/widgets/server_error_text.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import 'package:provider/provider.dart';

class AddItem extends StatefulWidget {
  final Map<String, dynamic>? item;

  const AddItem({super.key, this.item});

  @override
  State<AddItem> createState() => _AddItemState();
}

class _AddItemState extends State<AddItem> {
  final _formKey = GlobalKey<FormState>();

  late TextEditingController _nameController;
  late TextEditingController _basePriceController;
  int? _selectedVendorId;
  String? _selectedType;

  final List<Map<String, String>> _itemTypes = [
    {'label': 'Regular', 'value': 'regular'},
    {'label': 'Working', 'value': 'working'},
    {'label': 'Integration', 'value': 'integration'},
  ];

  @override
  void initState() {
    super.initState();
    final item = widget.item;

    _nameController =
        TextEditingController(text: item?["name"] as String? ?? '');
    _basePriceController = TextEditingController(
        text: item?["base_price"]?.toString() as String? ?? '');

    if (item != null) {
      _selectedVendorId = item["vendor_id"] as int?;
      _selectedType = item["type"] as String?;
    }

    Future.delayed(Duration.zero, () {
      context.read<VendorsProvider>().fetchVendorNames();
      context.read<ItemsProvider>().clearErrors();
    });
  }

  @override
  void dispose() {
    _nameController.dispose();
    _basePriceController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final itemsProvider = context.watch<ItemsProvider>();
    final vendorsProvider = context.watch<VendorsProvider>();
    final vendors = vendorsProvider.vendorNames;

    return Scaffold(
      backgroundColor: ColorUtils().backgroundColor,
      appBar: AppBar(
        title: Text(
          widget.item == null ? 'Add Item' : 'Edit Item',
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
                labelText: 'Name',
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

            // Base Price Field
            TextFormField(
              controller: _basePriceController,
              decoration: InputDecoration(
                labelText: 'Base Price',
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
                  return 'Please enter base price';
                }
                if (double.tryParse(value) == null) {
                  return 'Please enter a valid number';
                }
                return null;
              },
            ),
            ServerErrorText(
              errors: itemsProvider.validationErrors,
              fieldName: "base_price",
            ),
            const SizedBox(height: 16),

            // Vendor Dropdown
            DropdownButtonFormField<int>(
              value: _selectedVendorId,
              items: vendors
                  .where((e) =>
                      e['vendor_type']?.toString().toLowerCase() == 'seller')
                  .map<DropdownMenuItem<int>>((vendor) {
                final id = vendor['id'] as int;
                final name = vendor['name'] ?? 'Vendor';
                return DropdownMenuItem(
                  value: id,
                  child: Text(name.toString()),
                );
              }).toList(),
              onChanged: (val) => setState(() => _selectedVendorId = val),
              decoration: InputDecoration(
                labelText: 'Choose Vendor',
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

            // Type Dropdown
            DropdownButtonFormField<String>(
              value: _selectedType,
              items: _itemTypes.map<DropdownMenuItem<String>>((type) {
                return DropdownMenuItem(
                  value: type['value'],
                  child: Text(type['label']!),
                );
              }).toList(),
              onChanged: (val) => setState(() => _selectedType = val),
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
              validator: (v) => v == null ? 'Please select a type' : null,
            ),
            ServerErrorText(
              errors: itemsProvider.validationErrors,
              fieldName: "type",
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
                      widget.item == null ? 'Submit' : 'Update',
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
      'base_price': _basePriceController.text,
      'vendor_id': _selectedVendorId,
      'type': _selectedType,
    };

    final provider = context.read<ItemsProvider>();
    bool success;

    if (widget.item != null && widget.item!['id'] != null) {
      success =
          await provider.updateCategory(widget.item!['id'] as int, itemData);
    } else {
      success = await provider.addCategory(itemData);
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
