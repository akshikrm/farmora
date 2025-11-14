import 'package:farmora/utils/colors.dart';
import 'package:farmora/utils/snackbar_utils.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'addSeason.dart';
import 'package:farmora/providers/seasons/seasonsProvider.dart';

class ListSeasons extends StatefulWidget {
  const ListSeasons({super.key});

  @override
  State<ListSeasons> createState() => _ListSeasonsState();
}

class _ListSeasonsState extends State<ListSeasons> {
  bool _isLoading = true;
  String? _error;

  @override
  void initState() {
    super.initState();
    Future.delayed(Duration(seconds: 0), () {
      _fetchSeasons();
    });
  }

  Future<void> _fetchSeasons() async {
    try {
      setState(() {
        _isLoading = true;
        _error = null;
      });
      
      final provider = context.read<SeasonsProvider>();
      await provider.loadSeasons();
      
      if (!mounted) return;
      setState(() {
        _isLoading = false;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _isLoading = false;
        _error = 'Failed to load seasons: ${e.toString()}';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final provider = context.watch<SeasonsProvider>();
    final seasons = provider.seasons;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Seasons'),
        backgroundColor: Colors.white,
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () async {
          final result = await Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => const AddSeason()),
          );
          if (result == true) {
            _fetchSeasons();
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
                        onPressed: _fetchSeasons,
                        child: const Text('Retry'),
                      ),
                    ],
                  ),
                )
              : RefreshIndicator(
                  onRefresh: _fetchSeasons,
                  child: seasons.isEmpty
                      ? ListView(
                          children: const [
                            SizedBox(height: 100),
                            Center(
                              child: Text(
                                'No seasons found',
                                style: TextStyle(
                                  color: Colors.grey,
                                  fontSize: 16,
                                ),
                              ),
                            ),
                          ],
                        )
                      : ListView.builder(
                          itemCount: seasons.length,
                          itemBuilder: (context, index) {
                            final season = seasons[index];
                            return Card(
                              margin: const EdgeInsets.symmetric(
                                horizontal: 16,
                                vertical: 8,
                              ),
                              child: ListTile(
                                title: Text(
                                  season["name"] as String,
                                  style: const TextStyle(
                                    fontWeight: FontWeight.w600,
                                    fontSize: 16,
                                  ),
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
                                            builder: (context) =>
                                                AddSeason(season: season),
                                          ),
                                        );
                                        if (result == true) {
                                          _fetchSeasons();
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
                                            title: const Text('Delete Season'),
                                            content: const Text(
                                                'Are you sure you want to delete this season?'),
                                            actions: [
                                              TextButton(
                                                onPressed: () =>
                                                    Navigator.pop(context),
                                                child: const Text('Cancel'),
                                              ),
                                              TextButton(
                                                onPressed: () async {
                                                  Navigator.pop(context);
                                                  final provider = context
                                                      .read<SeasonsProvider>();
                                                  final success =
                                                      await provider.deleteSeason(
                                                          season['id']);

                                                  if (!mounted) return;

                                                  if (success) {
                                                    _fetchSeasons();
                                                    SnackbarUtils.showSuccess(
                                                        'Season deleted successfully');
                                                  } else {
                                                    SnackbarUtils.showError(
                                                        provider.error ??
                                                            'Failed to delete season');
                                                  }
                                                },
                                                child: Text(
                                                  'Delete',
                                                  style: TextStyle(
                                                      color: Colors.red.shade300),
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