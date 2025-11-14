import 'package:farmora/providers/users_provider.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'user_form.dart';

class ListUsers extends StatefulWidget {
  const ListUsers({Key? key}) : super(key: key);

  @override
  State<ListUsers> createState() => _ListUsersState();
}

class _ListUsersState extends State<ListUsers> {
  @override
  void initState() {
    super.initState();
    Future.delayed(Duration(seconds: 0), () {
      context.read<UsersProvider>().loadUsers();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Users'),
        actions: [
          IconButton(
            icon: const Icon(Icons.add),
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => const UserForm()),
              );
            },
          ),
        ],
      ),
      body: ListView.builder(
        itemCount: 10, // Replace with actual user count
        itemBuilder: (context, index) {
          return ListTile(
            title: Text('User $index'),
            subtitle: Text('user$index@example.com'),
            trailing: IconButton(
              icon: const Icon(Icons.edit),
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const UserForm()),
                );
              },
            ),
          );
        },
      ),
    );
  }
}
