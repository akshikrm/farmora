import 'package:farmora/utils/customUtils.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/vendors_provider.dart';

class AddVendorsPage extends StatefulWidget {
  final Map<String, dynamic>? vendorData;

  AddVendorsPage({this.vendorData});

  @override
  _AddVendorsPageState createState() => _AddVendorsPageState();
}

class _AddVendorsPageState extends State<AddVendorsPage> {
  final _formKey = GlobalKey<FormState>();
  late String _name;
  late String _address;
  late double _openingBalance;
  late String _vendorType;

  @override
  void initState() {
    super.initState();
    if (widget.vendorData != null) {
      _name = widget.vendorData!['name'];
      _address = widget.vendorData!['address'];
      _openingBalance = widget.vendorData!['opening_balance'].toString() != ''
          ? double.parse(widget.vendorData!['opening_balance'].toString())
          : 0.0;
      _vendorType = widget.vendorData!['vendor_type'];
    } else {
      _name = '';
      _address = '';
      _openingBalance = 0.0;
      _vendorType = 'buyer';
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.vendorData != null ? 'Edit Vendor' : 'Add Vendor'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              TextFormField(
                initialValue: _name,
                decoration: InputDecoration(labelText: 'Name'),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter a name';
                  }
                  return null;
                },
                onSaved: (value) {
                  _name = value!;
                },
              ),
              TextFormField(
                initialValue: _address,
                decoration: InputDecoration(labelText: 'Address'),
                maxLines: 3,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter an address';
                  }
                  return null;
                },
                onSaved: (value) {
                  _address = value!;
                },
              ),
              TextFormField(
                initialValue: _openingBalance.toString(),
                decoration: InputDecoration(labelText: 'Opening Balance'),
                keyboardType: TextInputType.number,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter an opening balance';
                  }
                  final parsedValue = double.tryParse(value);
                  if (parsedValue == null) {
                    return 'Please enter a valid number';
                  }
                  return null;
                },
                onSaved: (value) {
                  _openingBalance = double.parse(value!);
                },
              ),
              SizedBox(height: 16),
              Text('Vendor Type'),
              Row(
                children: [
                  Expanded(
                    child: RadioListTile(
                      title: Text('Buyer'),
                      value: 'buyer',
                      groupValue: _vendorType,
                      onChanged: (value) {
                        setState(() {
                          _vendorType = value!;
                        });
                      },
                    ),
                  ),
                  Expanded(
                    child: RadioListTile(
                      title: Text('Seller'),
                      value: 'seller',
                      groupValue: _vendorType,
                      onChanged: (value) {
                        setState(() {
                          _vendorType = value!;
                        });
                      },
                    ),
                  ),
                ],
              ),
              SizedBox(height: 16),
              Center(
                child: SizedBox(
                  width: getWidth(context) / 2,
                  child: ElevatedButton(
                    onPressed: () {
                      if (_formKey.currentState!.validate()) {
                        _formKey.currentState!.save();

                        final vendorData = {
                          'name': _name,
                          'address': _address,
                          'opening_balance': _openingBalance.toString(),
                          'vendor_type': _vendorType,
                        };

                        if (widget.vendorData != null) {
                          // Update existing vendor
                          Provider.of<VendorsProvider>(context, listen: false)
                              .updateVendor(
                                  widget.vendorData!['id'], vendorData);
                        } else {
                          // Add new vendor
                          Provider.of<VendorsProvider>(context, listen: false)
                              .addVendor(vendorData);
                        }

                        Navigator.pop(context);
                      }
                    },
                    child:
                        Text(widget.vendorData != null ? 'Update' : 'Submit'),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
