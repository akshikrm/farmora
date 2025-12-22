import 'package:farmora/providers/items_provider.dart';
import 'package:farmora/utils/colors.dart';
import 'package:farmora/utils/snackbar_utils.dart';
import 'package:farmora/widgets/server_error_text.dart';
import 'package:flutter/material.dart';

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

  @override
  void initState() {
    super.initState();
    final item = widget.item;

    _nameController =
        TextEditingController(text: item?["name"] as String? ?? '');

    Future.delayed(Duration.zero, () {
      context.read<ItemsProvider>().clearErrors();
    });
  }

  @override
  void dispose() {
    _nameController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final itemsProvider = context.watch<ItemsProvider>();

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
                      widget.item == null ? 'Add Item' : 'Update Item',
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
