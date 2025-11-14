import 'package:farmora/utils/colors.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:farmora/providers/seasons/seasonsProvider.dart';
import 'package:farmora/utils/snackbar_utils.dart';

class AddSeason extends StatefulWidget {
  final Map<String, dynamic>? season;

  const AddSeason({super.key, this.season});

  @override
  State<AddSeason> createState() => _AddSeasonState();
}

class _AddSeasonState extends State<AddSeason> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();

  @override
  void initState() {
    super.initState();
    if (widget.season != null) {
      _nameController.text = widget.season!["name"] as String;
    }
  }

  @override
  void dispose() {
    _nameController.dispose();
    super.dispose();
  }

  void _submitForm() async {
    if (_formKey.currentState!.validate()) {
      final seasonData = {
        "master_id": 1,
        "name": _nameController.text,
      };

      final provider = context.read<SeasonsProvider>();
      bool success;
      
      if (widget.season != null) {
        success = await provider.updateSeason(widget.season!['id'], seasonData);
      } else {
        success = await provider.addSeason(seasonData);
      }

      if (!mounted) return;

      if (success) {
        Navigator.pop(context, true);
        SnackbarUtils.showSuccess(
          widget.season != null 
              ? 'Season updated successfully' 
              : 'Season added successfully'
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