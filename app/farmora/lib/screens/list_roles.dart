import 'package:farmora/providers/users_provider.dart';
import 'package:farmora/utils/colors.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'add_role.dart';

class ListRolesPage extends StatefulWidget {
  @override
  _ListRolesPageState createState() => _ListRolesPageState();
}

class _ListRolesPageState extends State<ListRolesPage> {
  final List<Map<String, String>> roles = [];

  void _addRole() {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => AddRolePage()),
    );
  }

  void _editRole(Map<String, dynamic> role) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => AddRolePage(
          roleData: role,
        ),
      ),
    );
  }

  void _deleteRole(String roleId) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Confirm Deletion'),
          content: Text('Are you sure you want to delete this role?'),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).pop(); // Close the dialog
              },
              child: Text('Cancel'),
            ),
            TextButton(
              onPressed: () {
                Navigator.of(context).pop(); // Close the dialog
                context.read<UsersProvider>().deleteRole(roleId);
              },
              child: Text('Delete', style: TextStyle(color: Colors.red)),
            ),
          ],
        );
      },
    );
  }

  @override
  void initState() {
    super.initState();
    Future.delayed(Duration.zero, () {
      context.read<UsersProvider>().loadRoles();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Roles and Permissions'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Consumer<UsersProvider>(builder: (context, provider, _) {
          return provider.roles.isNotEmpty
              ? ListView.builder(
                  itemCount: provider.roles["data"]["data"]["data"].length,
                  shrinkWrap: true,
                  itemBuilder: (context, index) {
                    var role = provider.roles["data"]["data"]["data"][index];
                    return Card(
                      margin: EdgeInsets.all(8.0),
                      child: ListTile(
                        title: Text(
                          role['name']!,
                          style: TextStyle(fontWeight: FontWeight.bold),
                        ),
                        subtitle: Text('Description: ${role['description']}'),
                        trailing: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            IconButton(
                              icon: Icon(Icons.edit, color: Colors.blue),
                              onPressed: () => _editRole(role),
                            ),
                            IconButton(
                              icon: Icon(Icons.delete, color: Colors.red),
                              onPressed: () =>
                                  _deleteRole(role['id'].toString()),
                            ),
                          ],
                        ),
                      ),
                    );
                  },
                )
              : Center(child: CircularProgressIndicator());
        }),
      ),
      floatingActionButton: FloatingActionButton(
        backgroundColor: ColorUtils().primaryColor,
        onPressed: _addRole,
        child: Icon(
          Icons.add,
          color: Colors.white,
        ),
      ),
    );
  }
}
