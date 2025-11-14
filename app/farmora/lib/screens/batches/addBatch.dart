
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:farmora/utils/colors.dart';
import 'package:farmora/utils/snackbar_utils.dart';
import 'package:farmora/providers/farms/farmsProvider.dart';
import 'package:farmora/providers/seasons/seasonsProvider.dart';
import 'package:farmora/providers/batches/batchesProvider.dart';

class AddBatch extends StatefulWidget {
  final Map<String, dynamic>? batch;

  const AddBatch({super.key, this.batch});

  @override
  State<AddBatch> createState() => _AddBatchState();
}

class _AddBatchState extends State<AddBatch> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();

  int? _selectedFarmId;
  int? _selectedSeasonId;

  @override
  void initState() {
    super.initState();
    if (widget.batch != null) {
      _nameController.text = widget.batch!["name"] as String? ?? '';
      // If editing, accept either nested objects or plain ids
      if (widget.batch!["farm"] is Map<String, dynamic>) {
        final f = widget.batch!["farm"] as Map<String, dynamic>;
        _selectedFarmId = (f['id'] ?? f['master_id']) as int?;
      } else if (widget.batch!['farm_id'] != null) {
        _selectedFarmId = widget.batch!['farm_id'] as int?;
      }

      if (widget.batch!["season"] is Map<String, dynamic>) {
        final s = widget.batch!["season"] as Map<String, dynamic>;
        _selectedSeasonId = (s['id'] ?? s['season_id']) as int?;
      } else if (widget.batch!['season_id'] != null) {
        _selectedSeasonId = widget.batch!['season_id'] as int?;
      }
    }

    // Ensure farms and seasons are loaded for dropdowns
    Future.delayed(Duration.zero, () {
      context.read<FarmsProvider>().loadFarms();
      context.read<SeasonsProvider>().loadSeasons();
    });
  }

  @override
  void dispose() {
    _nameController.dispose();
    super.dispose();
  }

  Future<void> _submitForm() async {
    if (!_formKey.currentState!.validate()) return;
    if (_selectedFarmId == null) {
      SnackbarUtils.showError('Please select a farm');
      return;
    }
    if (_selectedSeasonId == null) {
      SnackbarUtils.showError('Please select a season');
      return;
    }

    // Resolve selected farm and season from providers to read other fields like master_id
  final farms = context.read<FarmsProvider>().farms as List? ?? [];

    Map<String, dynamic>? selectedFarm;
    final farmMatches = farms.where((f) {
      final id = f['id'] ?? f['master_id'];
      return id == _selectedFarmId;
    }).toList();
    if (farmMatches.isNotEmpty) {
      selectedFarm = Map<String, dynamic>.from(farmMatches.first as Map);
    }

    // We don't need the season map beyond its id for payload; ignore mapping here

    final farmId = _selectedFarmId;
    final seasonId = _selectedSeasonId;
    final masterId = selectedFarm != null ? (selectedFarm['master_id'] ?? selectedFarm['id']) : 0;

    final batchData = {
      'master_id': masterId,
      'farm_id': farmId,
      'season_id': seasonId,
      'name': _nameController.text,
    };

    final provider = context.read<BatchesProvider>();
    bool success;
    if (widget.batch != null && widget.batch!['id'] != null) {
      success = await provider.updateBatch(widget.batch!['id'] as int, batchData);
    } else {
      success = await provider.addBatch(batchData);
    }

    if (!mounted) return;

    if (success) {
      Navigator.pop(context, true);
      SnackbarUtils.showSuccess(widget.batch != null ? 'Batch updated' : 'Batch added');
    } else {
      SnackbarUtils.showError(provider.error ?? 'Failed to save batch');
    }
  }

  @override
  Widget build(BuildContext context) {
    final farmsProvider = context.watch<FarmsProvider>();
    final seasonsProvider = context.watch<SeasonsProvider>();

  final farms = farmsProvider.farms;
  final seasons = seasonsProvider.seasons;

    return Scaffold(
      appBar: AppBar(
        title: Text(widget.batch != null ? 'Edit Batch' : 'Add Batch'),
        backgroundColor: Colors.white,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Form(
          key: _formKey,
          child: ListView(
            children: [
              DropdownButtonFormField<int>(
                value: _selectedFarmId,
                items: farms
                    .where((f) => (f['id'] ?? f['master_id']) != null)
                    .map<DropdownMenuItem<int>>((f) {
                  final id = (f['id'] ?? f['master_id']) as int;
                  final display = (f['name'] ?? f['farm_name'] ?? f['place'] ?? 'Farm').toString();
                  return DropdownMenuItem(
                    value: id,
                    child: Text(display),
                  );
                }).toList(),
                onChanged: (val) => setState(() => _selectedFarmId = val),
                decoration: const InputDecoration(
                  labelText: 'Select Farm',
                  border: OutlineInputBorder(),
                ),
                validator: (v) => v == null ? 'Please select a farm' : null,
              ),
              const SizedBox(height: 16),
              DropdownButtonFormField<int>(
                value: _selectedSeasonId,
                items: seasons
                    .where((s) => (s['id'] ?? s['season_id']) != null)
                    .map<DropdownMenuItem<int>>((s) {
                  final id = (s['id'] ?? s['season_id']) as int;
                  final display = (s['name'] ?? s['season_name'] ?? 'Season').toString();
                  return DropdownMenuItem(
                    value: id,
                    child: Text(display),
                  );
                }).toList(),
                onChanged: (val) => setState(() => _selectedSeasonId = val),
                decoration: const InputDecoration(
                  labelText: 'Select Season',
                  border: OutlineInputBorder(),
                ),
                validator: (v) => v == null ? 'Please select a season' : null,
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _nameController,
                decoration: const InputDecoration(
                  labelText: 'Batch Name',
                  border: OutlineInputBorder(),
                ),
                validator: (v) => v == null || v.isEmpty ? 'Please enter batch name' : null,
              ),
              const SizedBox(height: 24),
              ElevatedButton(
                onPressed: _submitForm,
                style: ElevatedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  backgroundColor: ColorUtils().primaryColor,
                ),
                child: Text(widget.batch != null ? 'Update Batch' : 'Create Batch'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
