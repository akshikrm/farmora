import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';
import '../providers/users_provider.dart';

class AddRolePage extends StatefulWidget {
  final Map<String, dynamic>? roleData;

  AddRolePage({this.roleData});

  @override
  _AddRolePageState createState() => _AddRolePageState();
}

class _AddRolePageState extends State<AddRolePage> {
  final TextEditingController _roleNameController = TextEditingController();
  final TextEditingController _descriptionController = TextEditingController();
  List<int> _selectedPermissionIds = [];
  bool _selectAll = false;

  @override
  void initState() {
    super.initState();
    if (widget.roleData != null) {
      _roleNameController.text = widget.roleData!['name'] ?? '';
      _descriptionController.text = widget.roleData!['description'] ?? '';
      _selectedPermissionIds = widget.roleData!['role_permissions']
              ?.map<int>((rp) => rp['permission_id'] as int)
              ?.toList() ??
          [];
    }
    WidgetsBinding.instance.addPostFrameCallback((_) {
      Provider.of<UsersProvider>(context, listen: false).loadPermissions();
    });
  }

  void _saveRole() {
    final roleName = _roleNameController.text;
    final description = _descriptionController.text;
    log("permissions: $_selectedPermissionIds");

    if (roleName.isEmpty || description.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Please fill in all fields')),
      );
      return;
    }

    if (_selectedPermissionIds.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Please select at least one permission')),
      );
      return;
    }

    // Save the role (e.g., send to backend or update state)
    print('Role Name: $roleName');
    print('Description: $description');
    print('Selected Permission IDs: $_selectedPermissionIds');
    var body = {
      "name": roleName,
      "description": description,
      "permission_ids": _selectedPermissionIds,
    };
    if (widget.roleData != null) {
      context
          .read<UsersProvider>()
          .updateRole(widget.roleData!["id"].toString(), body);
    } else {
      context.read<UsersProvider>().addRole(body);
    }

    Navigator.pop(context); // Navigate back after saving
  }

  @override
  Widget build(BuildContext context) {
    final permissions = Provider.of<UsersProvider>(context).permissions;
    return Scaffold(
      appBar: AppBar(
        title: Text('Add Role'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              TextField(
                controller: _roleNameController,
                decoration: InputDecoration(labelText: 'Role Name'),
              ),
              SizedBox(height: 16),
              TextField(
                controller: _descriptionController,
                decoration: InputDecoration(labelText: 'Description'),
                maxLines: 3,
              ),
              SizedBox(height: 16),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'Permissions',
                    style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                  ),
                  Checkbox(
                    value: _selectAll,
                    onChanged: (bool? value) {
                      setState(() {
                        _selectAll = value ?? false;
                        _selectedPermissionIds.clear();

                        if (_selectAll) {
                          permissions.entries.forEach((category) {
                            (category.value as Map<String, dynamic>)
                                .entries
                                .forEach((entry) {
                              _selectedPermissionIds
                                  .add(entry.value['id'] as int);
                            });
                          });
                        }
                      });
                    },
                  ),
                ],
              ),
              ...permissions.keys.map((category) {
                return Theme(
                  data: ThemeData().copyWith(dividerColor: Colors.transparent),
                  child: Container(
                    decoration: BoxDecoration(
                      border: Border.all(color: Colors.grey.shade100),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: ExpansionTile(
                      title: Text(toBeginningOfSentenceCase(category)),
                      children: (permissions[category] as Map<String, dynamic>)
                          .entries
                          .map((entry) {
                        final subGroup = entry.key;
                        final description = entry.value['description'];
                        final selected = entry.value['selected'];

                        return CheckboxListTile(
                          title: Text(toBeginningOfSentenceCase(
                              '$subGroup ($description)')),
                          value: _selectedPermissionIds
                              .contains(entry.value['id'] as int),
                          onChanged: (bool? value) {
                            setState(() {
                              if (value == true) {
                                _selectedPermissionIds
                                    .add(entry.value['id'] as int);
                              } else {
                                _selectedPermissionIds
                                    .remove(entry.value['id'] as int);
                                _selectAll =
                                    false; // Uncheck 'Select All' if any permission is deselected
                              }
                            });
                          },
                        );
                      }).toList(),
                    ),
                  ),
                );
              }).toList(),
              SizedBox(height: 16),
              Center(
                child: ElevatedButton(
                  onPressed: _saveRole,
                  child: Text('Save Role'),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
