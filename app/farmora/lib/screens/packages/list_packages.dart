import 'package:farmora/utils/customUtils.dart';
import 'package:flutter/material.dart';
import 'package:farmora/screens/packages/package_form.dart';
import 'package:farmora/providers/packages_provider.dart';
import 'package:provider/provider.dart';

class ListPackages extends StatefulWidget {
  const ListPackages({Key? key}) : super(key: key);

  @override
  State<ListPackages> createState() => _ListPackagesState();
}

class _ListPackagesState extends State<ListPackages> {
  @override
  void initState() {
    super.initState();
    // Fetch packages when the screen is initialized
    WidgetsBinding.instance.addPostFrameCallback((_) {
      Provider.of<PackagesProvider>(context, listen: false).loadPackages();
    });
  }

  @override
  Widget build(BuildContext context) {
    final packagesProvider = Provider.of<PackagesProvider>(context);
    final packages = packagesProvider.packages;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Packages'),
        actions: [
          IconButton(
            icon: const Icon(Icons.add),
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => const PackageForm(),
                ),
              );
            },
          ),
        ],
      ),
      body: packages.isEmpty
          ? const Center(child: CircularProgressIndicator())
          : ListView.builder(
              itemCount: packages.length,
              itemBuilder: (context, index) {
                final package = packages[index];
                return ListTile(
                  title: Text(package['name']),
                  subtitle: Text(
                      'Price: \$${package['price']} | Duration: ${package['duration']} months'),
                  trailing: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      IconButton(
                        icon: const Icon(Icons.edit),
                        onPressed: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) =>
                                  PackageForm(package: package),
                            ),
                          );
                        },
                      ),
                      IconButton(
                        icon: const Icon(
                          Icons.delete,
                          color: Colors.red,
                        ),
                        onPressed: () async {
                          final result = await showConfirmationDialog(
                            context: context,
                            title: 'Confirm Delete',
                            description:
                                'Are you sure you want to delete this package?',
                            yesButtonText: 'Yes',
                            noButtonText: 'No',
                          );
                          if (result == true) {
                            // Proceed with deletion
                            context
                                .read<PackagesProvider>()
                                .deletePackage(package['id'].toString());
                          }
                        },
                      ),
                    ],
                  ),
                );
              },
            ),
    );
  }
}
