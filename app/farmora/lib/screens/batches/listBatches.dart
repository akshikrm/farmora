import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:farmora/utils/colors.dart';
import 'package:farmora/utils/snackbar_utils.dart';
import 'package:farmora/providers/batches/batchesProvider.dart';
import 'package:farmora/providers/farms/farmsProvider.dart';
import 'package:farmora/providers/seasons/seasonsProvider.dart';
import 'addBatch.dart';

class ListBatches extends StatefulWidget {
  const ListBatches({super.key});

  @override
  State<ListBatches> createState() => _ListBatchesState();
}

class _ListBatchesState extends State<ListBatches> {
  bool _isLoading = true;
  String? _error;

  @override
  void initState() {
    super.initState();
    Future.delayed(Duration.zero, () {
      _fetchBatches();
      // also ensure farms and seasons loaded for convenience
      context.read<FarmsProvider>().loadFarms();
      context.read<SeasonsProvider>().loadSeasons();
    });
  }

  Future<void> _fetchBatches() async {
    try {
      setState(() {
        _isLoading = true;
        _error = null;
      });
      final provider = context.read<BatchesProvider>();
      await provider.loadBatches();
      if (!mounted) return;
      setState(() {
        _isLoading = false;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _isLoading = false;
        _error = 'Failed to load batches: ${e.toString()}';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final provider = context.watch<BatchesProvider>();
    final batches = provider.batches;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Batches'),
        backgroundColor: Colors.white,
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () async {
          final result = await Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => const AddBatch()),
          );
          if (result == true) {
            _fetchBatches();
          }
        },
        backgroundColor: ColorUtils().primaryColor,
        child: const Icon(Icons.add),
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : _error != null
              ? Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        _error!,
                        textAlign: TextAlign.center,
                        style: const TextStyle(color: Colors.red),
                      ),
                      const SizedBox(height: 16),
                      ElevatedButton(
                        onPressed: _fetchBatches,
                        child: const Text('Retry'),
                      ),
                    ],
                  ),
                )
              : RefreshIndicator(
                  onRefresh: _fetchBatches,
                  child: batches.isEmpty
                      ? ListView(
                          children: const [
                            SizedBox(height: 100),
                            Center(
                              child: Text(
                                'No batches found',
                                style: TextStyle(
                                  color: Colors.grey,
                                  fontSize: 16,
                                ),
                              ),
                            ),
                          ],
                        )
                      : ListView.builder(
                          itemCount: batches.length,
                          itemBuilder: (context, index) {
                            final batch = batches[index];
                            final farmName = (batch['farm'] != null && batch['farm']['name'] != null)
                                ? batch['farm']['name']
                                : batch['name'] ?? 'Batch';
                            final seasonName = (batch['season'] != null && batch['season']['name'] != null)
                                ? batch['season']['name']
                                : (batch['season_name'] ?? '');

                            return Card(
                              margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                              child: ListTile(
                                title: Text(
                                  farmName.toString(),
                                  style: const TextStyle(
                                    fontWeight: FontWeight.w600,
                                    fontSize: 16,
                                  ),
                                ),
                                subtitle: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    const SizedBox(height: 4),
                                    Text(
                                      'Season: ${seasonName.toString()}',
                                      style: TextStyle(
                                        color: Colors.grey.shade600,
                                      ),
                                    ),
                                    const SizedBox(height: 4),
                                    Text(
                                      'Name: ${batch['name'] ?? ''}',
                                      style: TextStyle(
                                        color: ColorUtils().primaryColor,
                                        fontSize: 13,
                                      ),
                                    ),
                                  ],
                                ),
                                trailing: Row(
                                  mainAxisSize: MainAxisSize.min,
                                  children: [
                                    IconButton(
                                      icon: const Icon(Icons.edit),
                                      onPressed: () async {
                                        final result = await Navigator.push(
                                          context,
                                          MaterialPageRoute(
                                            builder: (context) => AddBatch(batch: batch),
                                          ),
                                        );
                                        if (result == true) {
                                          _fetchBatches();
                                        }
                                      },
                                    ),
                                    IconButton(
                                      icon: const Icon(
                                        Icons.delete,
                                        color: Colors.red,
                                      ),
                                      onPressed: () {
                                        showDialog(
                                          context: context,
                                          builder: (context) => AlertDialog(
                                            title: const Text('Delete Batch'),
                                            content: const Text('Are you sure you want to delete this batch?'),
                                            actions: [
                                              TextButton(
                                                onPressed: () => Navigator.pop(context),
                                                child: const Text('Cancel'),
                                              ),
                                              TextButton(
                                                onPressed: () async {
                                                  Navigator.pop(context);
                                                  final provider = context.read<BatchesProvider>();
                                                  final success = await provider.deleteBatch(batch['id']);

                                                  if (!mounted) return;

                                                  if (success) {
                                                    _fetchBatches();
                                                    SnackbarUtils.showSuccess('Batch deleted successfully');
                                                  } else {
                                                    SnackbarUtils.showError(provider.error ?? 'Failed to delete batch');
                                                  }
                                                },
                                                child: Text(
                                                  'Delete',
                                                  style: TextStyle(color: Colors.red.shade300),
                                                ),
                                              ),
                                            ],
                                          ),
                                        );
                                      },
                                    ),
                                  ],
                                ),
                              ),
                            );
                          },
                        ),
                ),
    );
  }
}
