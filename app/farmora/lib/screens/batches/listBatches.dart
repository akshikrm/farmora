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
                      : ListView.separated(
                          padding: const EdgeInsets.all(16),
                          separatorBuilder: (_, __) =>
                              const SizedBox(height: 12),
                          itemCount: batches.length,
                          itemBuilder: (context, index) {
                            final batch = batches[index];
                            final farmName = batch["farm"]["name"] ?? 'N/A';
                            final seasonName = batch["season"]["name"] ?? 'N/A';
                            final batchName = batch["name"] ?? 'Batch';

                            return Container(
                              decoration: BoxDecoration(
                                color: Colors.white,
                                borderRadius: BorderRadius.circular(16),
                                boxShadow: [
                                  BoxShadow(
                                    color: Colors.grey.withOpacity(0.1),
                                    blurRadius: 10,
                                    offset: const Offset(0, 4),
                                  ),
                                ],
                              ),
                              child: Column(
                                children: [
                                  Padding(
                                    padding: const EdgeInsets.all(16.0),
                                    child: Row(
                                      children: [
                                        Container(
                                          padding: const EdgeInsets.all(10),
                                          decoration: BoxDecoration(
                                            color: ColorUtils()
                                                .primaryColor
                                                .withOpacity(0.1),
                                            shape: BoxShape.circle,
                                          ),
                                          child: Icon(
                                            Icons.layers,
                                            color: ColorUtils().primaryColor,
                                            size: 24,
                                          ),
                                        ),
                                        const SizedBox(width: 12),
                                        Expanded(
                                          child: Text(
                                            batchName.toString(),
                                            style: TextStyle(
                                              fontSize: 18,
                                              fontWeight: FontWeight.bold,
                                              color: ColorUtils().textColor,
                                            ),
                                          ),
                                        ),
                                        Row(
                                          children: [
                                            InkWell(
                                              borderRadius:
                                                  BorderRadius.circular(20),
                                              onTap: () async {
                                                final result =
                                                    await Navigator.push(
                                                  context,
                                                  MaterialPageRoute(
                                                    builder: (context) =>
                                                        AddBatch(batch: batch),
                                                  ),
                                                );
                                                if (result == true) {
                                                  _fetchBatches();
                                                }
                                              },
                                              child: Padding(
                                                padding:
                                                    const EdgeInsets.all(8.0),
                                                child: Icon(
                                                  Icons.edit_outlined,
                                                  color: Colors.grey[600],
                                                  size: 20,
                                                ),
                                              ),
                                            ),
                                            InkWell(
                                              borderRadius:
                                                  BorderRadius.circular(20),
                                              onTap: () {
                                                showDialog(
                                                  context: context,
                                                  builder: (context) =>
                                                      AlertDialog(
                                                    title: const Text(
                                                        'Delete Batch'),
                                                    content: const Text(
                                                        'Are you sure you want to delete this batch?'),
                                                    actions: [
                                                      TextButton(
                                                        onPressed: () =>
                                                            Navigator.pop(
                                                                context),
                                                        child: const Text(
                                                            'Cancel'),
                                                      ),
                                                      TextButton(
                                                        onPressed: () async {
                                                          Navigator.pop(
                                                              context);
                                                          final provider =
                                                              context.read<
                                                                  BatchesProvider>();
                                                          final success =
                                                              await provider
                                                                  .deleteBatch(
                                                                      batch[
                                                                          'id']);

                                                          if (!mounted) return;

                                                          if (success) {
                                                            _fetchBatches();
                                                            SnackbarUtils
                                                                .showSuccess(
                                                                    'Batch deleted successfully');
                                                          } else {
                                                            SnackbarUtils
                                                                .showError(provider
                                                                        .error ??
                                                                    'Failed to delete batch');
                                                          }
                                                        },
                                                        child: Text(
                                                          'Delete',
                                                          style: TextStyle(
                                                              color: Colors.red
                                                                  .shade300),
                                                        ),
                                                      ),
                                                    ],
                                                  ),
                                                );
                                              },
                                              child: Padding(
                                                padding:
                                                    const EdgeInsets.all(8.0),
                                                child: Icon(
                                                  Icons.delete_outline,
                                                  color: Colors.red[300],
                                                  size: 20,
                                                ),
                                              ),
                                            ),
                                          ],
                                        )
                                      ],
                                    ),
                                  ),
                                  Divider(
                                      height: 1, color: Colors.grey.shade200),
                                  Padding(
                                    padding: const EdgeInsets.all(16.0),
                                    child: Row(
                                      children: [
                                        Expanded(
                                          child: Row(
                                            children: [
                                              Icon(Icons.agriculture_outlined,
                                                  size: 16,
                                                  color: Colors.grey[500]),
                                              const SizedBox(width: 6),
                                              Expanded(
                                                child: Column(
                                                  crossAxisAlignment:
                                                      CrossAxisAlignment.start,
                                                  children: [
                                                    Text(
                                                      "Farm",
                                                      style: TextStyle(
                                                        fontSize: 10,
                                                        color: Colors.grey[500],
                                                        fontWeight:
                                                            FontWeight.w500,
                                                      ),
                                                    ),
                                                    Text(
                                                      farmName.toString(),
                                                      style: TextStyle(
                                                        fontSize: 14,
                                                        fontWeight:
                                                            FontWeight.w600,
                                                        color: ColorUtils()
                                                            .primaryColor,
                                                      ),
                                                      maxLines: 1,
                                                      overflow:
                                                          TextOverflow.ellipsis,
                                                    ),
                                                  ],
                                                ),
                                              ),
                                            ],
                                          ),
                                        ),
                                        Container(
                                          width: 1,
                                          height: 30,
                                          color: Colors.grey.shade200,
                                          margin: const EdgeInsets.symmetric(
                                              horizontal: 8),
                                        ),
                                        Expanded(
                                          child: Row(
                                            children: [
                                              Icon(
                                                  Icons.calendar_today_outlined,
                                                  size: 16,
                                                  color: Colors.grey[500]),
                                              const SizedBox(width: 6),
                                              Expanded(
                                                child: Column(
                                                  crossAxisAlignment:
                                                      CrossAxisAlignment.start,
                                                  children: [
                                                    Text(
                                                      "Season",
                                                      style: TextStyle(
                                                        fontSize: 10,
                                                        color: Colors.grey[500],
                                                        fontWeight:
                                                            FontWeight.w500,
                                                      ),
                                                    ),
                                                    Text(
                                                      seasonName.toString(),
                                                      style: TextStyle(
                                                        fontSize: 14,
                                                        fontWeight:
                                                            FontWeight.w600,
                                                        color: ColorUtils()
                                                            .textColor,
                                                      ),
                                                      maxLines: 1,
                                                      overflow:
                                                          TextOverflow.ellipsis,
                                                    ),
                                                  ],
                                                ),
                                              ),
                                            ],
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ],
                              ),
                            );
                          },
                        ),
                ),
    );
  }
}
