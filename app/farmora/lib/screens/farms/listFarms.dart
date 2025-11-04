import 'package:farmora/utils/colors.dart';
import 'package:farmora/providers/farms/farmsProvider.dart';
import 'package:farmora/utils/snackbar_utils.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'addFarm.dart';

class ListFarms extends StatefulWidget {
  const ListFarms({super.key});

  @override
  State<ListFarms> createState() => _ListFarmsState();
}

class _ListFarmsState extends State<ListFarms> {
  bool _isLoading = true;
  String? _error;

  @override
  void initState() {
    super.initState();
    Future.delayed(Duration(seconds: 0),(){
      _fetchFarms();
    });
    
  }

  Future<void> _fetchFarms() async {
    try {
      setState(() {
        _isLoading = true;
        _error = null;
      });
      
      final provider = context.read<FarmsProvider>();
      await provider.loadFarms();
      
      if (!mounted) return;
      setState(() {
        _isLoading = false;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _isLoading = false;
        _error = 'Failed to load farms: ${e.toString()}';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final provider = context.watch<FarmsProvider>();
    final farms = provider.farms;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Farms'),
        backgroundColor: Colors.white,
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () async {
          final result = await Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => const AddFarm()),
          );
          if (result == true) {
            _fetchFarms();
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
                        onPressed: _fetchFarms,
                        child: const Text('Retry'),
                      ),
                    ],
                  ),
                )
              : RefreshIndicator(
                  onRefresh: _fetchFarms,
                  child: farms.isEmpty
                      ? const Center(
                          child: Text('No farms found'),
                        )
                      : ListView.builder(
                          itemCount: farms.length,
                          itemBuilder: (context, index) {
                            final farm = farms[index];
          return Card(
            margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            child: ListTile(
              title: Text(
                farm["name"] as String,
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
                    farm["place"] as String,
                    style: TextStyle(
                      color: Colors.grey.shade600,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Row(
                    children: [
                      Icon(
                        Icons.agriculture,
                        size: 16,
                        color: ColorUtils().primaryColor,
                      ),
                      const SizedBox(width: 4),
                      Text(
                        'Capacity: ${farm["capacity"]}',
                        style: TextStyle(
                          color: ColorUtils().primaryColor,
                          fontSize: 13,
                        ),
                      ),
                      const SizedBox(width: 12),
                      Icon(
                        Icons.home,
                        size: 16,
                        color: farm["own"] as bool
                            ? ColorUtils().primaryColor
                            : Colors.grey,
                      ),
                      const SizedBox(width: 4),
                      Text(
                        farm["own"] as bool ? 'Owned' : 'Leased',
                        style: TextStyle(
                          color: farm["own"] as bool
                              ? ColorUtils().primaryColor
                              : Colors.grey,
                          fontSize: 13,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
              trailing: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  IconButton(
                    icon: const Icon(Icons.edit),
                    onPressed: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => AddFarm(farm: farm),
                        ),
                      );
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
                          title: const Text('Delete Farm'),
                          content: const Text('Are you sure you want to delete this farm?'),
                          actions: [
                            TextButton(
                              onPressed: () => Navigator.pop(context),
                              child: const Text('Cancel'),
                            ),
                            TextButton(
                              onPressed: () async {
                                Navigator.pop(context);
                                final provider = context.read<FarmsProvider>();
                                final success = await provider.deleteFarm(farm['id']);
                                
                                if (!mounted) return;
                                
                                if (success) {
                                  _fetchFarms();
                                  SnackbarUtils.showSuccess('Farm deleted successfully');
                                } else {
                                  ScaffoldMessenger.of(context).showSnackBar(
                                    SnackBar(
                                      content: Text(provider.error ?? 'Failed to delete farm'),
                                      backgroundColor: Colors.red,
                                    ),
                                  );
                                }
                              },
                              child:  Text(
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
    ));
  }
}