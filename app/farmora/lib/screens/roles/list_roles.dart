import 'package:flutter/material.dart';

class ListRoles extends StatefulWidget {
  const ListRoles({Key? key}) : super(key: key);

  @override
  State<ListRoles> createState() => _ListRolesState();
}

class _ListRolesState extends State<ListRoles> {
  final List<Map<String, dynamic>> roles = [];

  void _showAddRoleDialog() {
    final _roleController = TextEditingController();
    final _permissionsController = TextEditingController();
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Add Role & Permissions'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              controller: _roleController,
              decoration: const InputDecoration(labelText: 'Role Name'),
            ),
            TextField(
              controller: _permissionsController,
              decoration: const InputDecoration(
                labelText: 'Permissions (comma separated)',
              ),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () {
              if (_roleController.text.trim().isNotEmpty) {
                setState(() {
                  roles.add({
                    'role': _roleController.text.trim(),
                    'permissions': _permissionsController.text
                        .split(',')
                        .map((e) => e.trim())
                        .where((e) => e.isNotEmpty)
                        .toList(),
                  });
                });
                Navigator.pop(context);
              }
            },
            child: const Text('Add'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Roles & Permissions'),
        actions: [
          IconButton(
            icon: const Icon(Icons.add),
            onPressed: _showAddRoleDialog,
            tooltip: 'Add Role',
          ),
        ],
      ),
      body: roles.isEmpty
          ? const Center(child: Text('No roles added yet.'))
          : ListView.builder(
              itemCount: roles.length,
              itemBuilder: (context, index) {
                final role = roles[index];
                return Card(
                  margin:
                      const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  child: ListTile(
                    title: Text(role['role']),
                    subtitle: Text(
                      'Permissions: ' +
                          (role['permissions'] as List<String>).join(', '),
                    ),
                  ),
                );
              },
            ),
    );
  }
}
