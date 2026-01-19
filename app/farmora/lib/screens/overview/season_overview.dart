import 'package:farmora/utils/colors.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:farmora/providers/seasons/seasonsProvider.dart';
import 'package:intl/intl.dart';

class SeasonOverviewPage extends StatefulWidget {
  const SeasonOverviewPage({super.key});

  @override
  State<SeasonOverviewPage> createState() => _SeasonOverviewPageState();
}

class _SeasonOverviewPageState extends State<SeasonOverviewPage> {
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
        title: const Text('Season Overview'),
        backgroundColor: Colors.white,
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
                          padding: const EdgeInsets.all(16),
                          itemCount: seasons.length,
                          itemBuilder: (context, index) {
                            final season = seasons[index];
                            return Container(
                              margin: const EdgeInsets.only(bottom: 12),
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
                              child: ListTile(
                                contentPadding: const EdgeInsets.symmetric(
                                    horizontal: 16, vertical: 12),
                                leading: Container(
                                  padding: const EdgeInsets.all(10),
                                  decoration: BoxDecoration(
                                    color: ColorUtils()
                                        .primaryColor
                                        .withOpacity(0.1),
                                    shape: BoxShape.circle,
                                  ),
                                  child: Icon(
                                    Icons.calendar_today,
                                    color: ColorUtils().primaryColor,
                                    size: 24,
                                  ),
                                ),
                                title: Text(
                                  season["name"] as String,
                                  style: TextStyle(
                                    fontWeight: FontWeight.w600,
                                    fontSize: 16,
                                    color: ColorUtils().textColor,
                                  ),
                                ),
                                subtitle: Padding(
                                  padding: const EdgeInsets.only(top: 4),
                                  child: Text(
                                    "${DateFormat('dd MMM yyyy').format(DateTime.parse(season['from_date']))} - ${DateFormat('dd MMM yyyy').format(DateTime.parse(season['to_date']))}",
                                    style: TextStyle(
                                      color: Colors.grey[600],
                                      fontSize: 14,
                                    ),
                                  ),
                                ),
                              ),
                            );
                          },
                        ),
                ),
    );
  }
}
