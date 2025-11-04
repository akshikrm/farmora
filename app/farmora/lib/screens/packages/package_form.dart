import 'package:farmora/providers/packages_provider.dart';
import 'package:farmora/repositories/packages_repository.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart' show FilteringTextInputFormatter;
import 'package:provider/provider.dart';

class PackageForm extends StatefulWidget {
  final Map<String, dynamic>? package; // Optional package data for editing

  const PackageForm({Key? key, this.package}) : super(key: key);

  @override
  State<PackageForm> createState() => _PackageFormState();
}

class _PackageFormState extends State<PackageForm> {
  final _formKey = GlobalKey<FormState>();
  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _priceController = TextEditingController();
  final TextEditingController _durationController = TextEditingController();
  bool _status = true;

  @override
  void initState() {
    super.initState();
    // Pre-fill the fields if editing an existing package
    if (widget.package != null) {
      _nameController.text = widget.package!['name'];
      _priceController.text = widget.package!['price'].toString();
      _durationController.text = widget.package!['duration'].toString();
      _status = widget.package!['status'];
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.package == null ? 'Add Package' : 'Edit Package'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            children: [
              TextFormField(
                controller: _nameController,
                decoration: const InputDecoration(labelText: 'Package Name'),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter the package name';
                  }
                  return null;
                },
              ),
              TextFormField(
                controller: _priceController,
                decoration: const InputDecoration(labelText: 'Price'),
                keyboardType: TextInputType.number,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter the price';
                  }
                  return null;
                },
              ),
              TextFormField(
                controller: _durationController,
                decoration:
                    const InputDecoration(labelText: 'Duration (months)'),
                keyboardType: TextInputType.number,
                inputFormatters: [FilteringTextInputFormatter.digitsOnly],
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter the duration';
                  }
                  return null;
                },
              ),
              SwitchListTile(
                title: const Text('Status'),
                value: _status,
                onChanged: (value) {
                  setState(() {
                    _status = value;
                  });
                },
              ),
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: () async {
                  if (_formKey.currentState!.validate()) {
                    // Save package logic here
                    final packageData = {
                      "name": _nameController.text,
                      "price": double.parse(_priceController.text),
                      "duration": int.parse(_durationController.text),
                      "status": _status,
                    };
                    if (widget.package != null) {
                      context.read<PackagesProvider>().updatePackage(
                          widget.package!["id"].toString(), packageData);
                    } else {
                      // final response =
                      //     await PackagesRepository().addPackage(packageData);
                      context.read<PackagesProvider>().addPackage(packageData);
                    }
                    // Call the provider or repository to save the data
                    Navigator.pop(context, packageData);
                  }
                },
                child: Text(widget.package == null ? 'Add' : 'Update'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
