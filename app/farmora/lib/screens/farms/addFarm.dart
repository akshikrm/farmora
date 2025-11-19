import 'package:farmora/providers/farms/farmsProvider.dart';
import 'package:farmora/utils/colors.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';

class AddFarm extends StatefulWidget {
  final Map<String, dynamic>? farm;

  const AddFarm({super.key, this.farm});

  @override
  State<AddFarm> createState() => _AddFarmState();
}

class _AddFarmState extends State<AddFarm> {
  final _formKey = GlobalKey<FormState>();

  late TextEditingController _nameController;
  late TextEditingController _placeController;
  late TextEditingController _capacityController;
  bool _isOwned = false;

  @override
  void initState() {
    super.initState();
    // Initialize controllers with existing data if editing
    final farm = widget.farm;
    _nameController =
        TextEditingController(text: farm?["name"] as String? ?? '');
    _placeController =
        TextEditingController(text: farm?["place"] as String? ?? '');
    _capacityController =
        TextEditingController(text: farm?["capacity"] as String? ?? '');
    _isOwned = farm?["own"] as bool? ?? false;
  }

  @override
  void dispose() {
    _nameController.dispose();
    _placeController.dispose();
    _capacityController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.farm == null ? 'Add Farm' : 'Edit Farm'),
        backgroundColor: Colors.white,
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
                labelText: 'Farm Name',
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(8),
                ),
                prefixIcon: const Icon(Icons.agriculture),
              ),
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return 'Please enter farm name';
                }
                return null;
              },
            ),
            const SizedBox(height: 16),

            // Place Field
            TextFormField(
              controller: _placeController,
              decoration: InputDecoration(
                labelText: 'Place',
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(8),
                ),
                prefixIcon: const Icon(Icons.place),
              ),
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return 'Please enter place';
                }
                return null;
              },
            ),
            const SizedBox(height: 16),

            // Capacity Field
            TextFormField(
              controller: _capacityController,
              decoration: InputDecoration(
                labelText: 'Capacity',
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(8),
                ),
                prefixIcon: const Icon(Icons.area_chart),
              ),
              keyboardType: TextInputType.number,
              inputFormatters: [
                FilteringTextInputFormatter.digitsOnly,
              ],
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return 'Please enter capacity';
                }
                if (int.tryParse(value) == null) {
                  return 'Please enter a valid number';
                }
                return null;
              },
            ),
            const SizedBox(height: 16),

            // Ownership Checkbox

            // Submit Button
            ElevatedButton(
              onPressed: _submitForm,
              style: ElevatedButton.styleFrom(
                backgroundColor: ColorUtils().primaryColor,
                padding: const EdgeInsets.symmetric(vertical: 16),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(8),
                ),
              ),
              child: Text(
                widget.farm == null ? 'Add Farm' : 'Update Farm',
                style: const TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  void _submitForm() async {
    if (_formKey.currentState!.validate()) {
      final farmData = {
        "name": _nameController.text,
        "place": _placeController.text,
        "capacity": _capacityController.text,
      };

      final provider = context.read<FarmsProvider>();
      bool success;

      if (widget.farm != null) {
        // Update existing farm
        success = await provider.updateFarm(widget.farm!["id"], farmData);
      } else {
        // Create new farm
        success = await provider.addFarm(farmData);
      }

      if (!mounted) return;

      if (success) {
        Navigator.pop(context);
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(widget.farm != null
                ? 'Farm updated successfully'
                : 'Farm added successfully'),
            backgroundColor: Colors.green,
          ),
        );
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(provider.error ?? 'Failed to save farm'),
            backgroundColor: Colors.red,
          ),
        );
      }
    }
  }
}
