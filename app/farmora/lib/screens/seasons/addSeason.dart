import 'package:farmora/utils/colors.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:farmora/providers/seasons/seasonsProvider.dart';
import 'package:farmora/utils/snackbar_utils.dart';
import 'package:intl/intl.dart';

class AddSeason extends StatefulWidget {
  final Map<String, dynamic>? season;

  const AddSeason({super.key, this.season});

  @override
  State<AddSeason> createState() => _AddSeasonState();
}

class _AddSeasonState extends State<AddSeason> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _startDateController = TextEditingController();
  final _endDateController = TextEditingController();

  @override
  void initState() {
    super.initState();
    if (widget.season != null) {
      _nameController.text = widget.season!["name"] as String;
      _startDateController.text = widget.season!["from_date"] != null
          ? DateFormat('yyyy-MM-dd')
              .format(DateTime.parse(widget.season!["from_date"]))
          : '';
      _endDateController.text = widget.season!["to_date"] != null
          ? DateFormat('yyyy-MM-dd')
              .format(DateTime.parse(widget.season!["to_date"]))
          : '';
    }
  }

  @override
  void dispose() {
    _nameController.dispose();
    _startDateController.dispose();
    _endDateController.dispose();
    super.dispose();
  }

  Future<void> _selectDate(
      BuildContext context, TextEditingController controller) async {
    final DateTime now = DateTime.now();
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: now,
      firstDate: now,
      lastDate: DateTime(2100),
    );
    if (picked != null) {
      setState(() {
        controller.text =
            "${picked.year.toString().padLeft(4, '0')}-${picked.month.toString().padLeft(2, '0')}-${picked.day.toString().padLeft(2, '0')}";
      });
    }
  }

  void _submitForm() async {
    if (_formKey.currentState!.validate()) {
      final seasonData = {
        "name": _nameController.text,
        "from_date": _startDateController.text,
        "to_date": _endDateController.text,
      };

      final provider = context.read<SeasonsProvider>();
      bool success;

      if (widget.season != null) {
        success = await provider.updateSeason(widget.season!["id"], seasonData);
      } else {
        success = await provider.addSeason(seasonData);
      }

      if (!mounted) return;

      if (success) {
        Navigator.pop(context, true);
        SnackbarUtils.showSuccess(
          widget.season != null
              ? 'Season updated successfully'
              : 'Season added successfully',
        );
      } else {
        SnackbarUtils.showError(provider.error ?? 'Failed to save season');
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.season != null ? 'Edit Season' : 'Add Season'),
        backgroundColor: Colors.white,
      ),
      body: Form(
        key: _formKey,
        child: ListView(
          padding: const EdgeInsets.all(16),
          children: [
            TextFormField(
              controller: _nameController,
              decoration: const InputDecoration(
                labelText: 'Season Name',
                hintText: 'Enter season name',
                border: OutlineInputBorder(),
              ),
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return 'Please enter season name';
                }
                return null;
              },
            ),
            const SizedBox(height: 16),
            TextFormField(
              controller: _startDateController,
              readOnly: true,
              decoration: const InputDecoration(
                labelText: 'Start Date',
                hintText: 'Select start date',
                border: OutlineInputBorder(),
              ),
              onTap: () => _selectDate(context, _startDateController),
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return 'Please select start date';
                }
                return null;
              },
            ),
            const SizedBox(height: 16),
            TextFormField(
              controller: _endDateController,
              readOnly: true,
              decoration: const InputDecoration(
                labelText: 'End Date',
                hintText: 'Select end date',
                border: OutlineInputBorder(),
              ),
              onTap: () => _selectDate(context, _endDateController),
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return 'Please select end date';
                }
                return null;
              },
            ),
            const SizedBox(height: 24),
            ElevatedButton(
              onPressed: _submitForm,
              style: ElevatedButton.styleFrom(
                padding: const EdgeInsets.symmetric(vertical: 16),
                backgroundColor: ColorUtils().primaryColor,
              ),
              child: Text(
                widget.season != null ? 'Update Season' : 'Add Season',
                style: const TextStyle(fontSize: 16),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
