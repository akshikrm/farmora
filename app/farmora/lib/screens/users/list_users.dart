import 'package:farmora/providers/users_provider.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:intl/intl.dart';
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
      body: Consumer<UsersProvider>(builder: (context, usersProvider, child) {
        return usersProvider.users.isNotEmpty
            ? usersProvider.users["data"]["data"].length > 0
                ? ListView.builder(
                    padding: const EdgeInsets.all(16),
                    itemCount: usersProvider.users["data"]["data"].length,
                    itemBuilder: (context, index) {
                      var user = usersProvider.users["data"]["data"][index];
                      String? userType = user["user_type"]?.toString();
                      final createdAtRaw = user["createdAt"];
                      String formattedDate = '';
                      if (createdAtRaw != null) {
                        try {
                          DateTime date =
                              DateTime.parse(createdAtRaw.toString());
                          formattedDate =
                              DateFormat('MMM d, yyyy').format(date);
                        } catch (e) {
                          formattedDate = createdAtRaw.toString();
                        }
                      }
                      return Card(
                        elevation: 1,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(8),
                        ),
                        margin: const EdgeInsets.only(bottom: 12),
                        child: Padding(
                          padding: const EdgeInsets.symmetric(
                              horizontal: 14, vertical: 12),
                          child: Row(
                            crossAxisAlignment: CrossAxisAlignment.center,
                            children: [
                              CircleAvatar(
                                radius: 22,
                                backgroundColor: Colors.blue.shade50,
                                child: Text(
                                  user["name"] != null &&
                                          user["name"].isNotEmpty
                                      ? user["name"][0].toUpperCase()
                                      : '?',
                                  style: GoogleFonts.poppins(
                                    fontSize: 20,
                                    color: Colors.blue.shade700,
                                    fontWeight: FontWeight.w600,
                                  ),
                                ),
                              ),
                              const SizedBox(width: 12),
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  mainAxisSize: MainAxisSize.min,
                                  children: [
                                    Text(
                                      user["name"] ?? '',
                                      style: GoogleFonts.poppins(
                                        fontSize: 16,
                                        fontWeight: FontWeight.w600,
                                        color: Colors.black87,
                                      ),
                                    ),
                                    const SizedBox(height: 6),
                                    Row(
                                      children: [
                                        Icon(Icons.person_outline,
                                            size: 16,
                                            color: Colors.blue.shade400),
                                        const SizedBox(width: 6),
                                        Text(
                                          userType ?? '-',
                                          style: GoogleFonts.poppins(
                                            fontSize: 13,
                                            color: Colors.blueGrey.shade700,
                                          ),
                                        ),
                                      ],
                                    ),
                                    if (formattedDate.isNotEmpty) ...[
                                      const SizedBox(height: 6),
                                      Row(
                                        children: [
                                          Icon(Icons.calendar_today,
                                              size: 14,
                                              color: Colors.grey.shade500),
                                          const SizedBox(width: 6),
                                          Expanded(
                                            child: Text(
                                              'Added on $formattedDate',
                                              style: GoogleFonts.poppins(
                                                fontSize: 12,
                                                color: Colors.grey.shade700,
                                              ),
                                            ),
                                          ),
                                        ],
                                      ),
                                    ],
                                  ],
                                ),
                              ),
                              PopupMenuButton<String>(
                                onSelected: (value) async {
                                  if (value == 'edit') {
                                    Navigator.push(
                                      context,
                                      MaterialPageRoute(
                                          builder: (context) => UserForm(
                                                user: user,
                                              )),
                                    );
                                  } else if (value == 'delete') {
                                    final confirm = await showDialog<bool>(
                                      context: context,
                                      builder: (context) => AlertDialog(
                                        title: const Text('Delete User'),
                                        content: const Text(
                                            'Are you sure you want to delete this user?'),
                                        actions: [
                                          TextButton(
                                            onPressed: () =>
                                                Navigator.pop(context, false),
                                            child: const Text('Cancel'),
                                          ),
                                          TextButton(
                                            onPressed: () =>
                                                Navigator.pop(context, true),
                                            child: const Text('Delete',
                                                style: TextStyle(
                                                    color: Colors.red)),
                                          ),
                                        ],
                                      ),
                                    );
                                    if (confirm == true) {
                                      await context
                                          .read<UsersProvider>()
                                          .deleteUser(user["id"].toString());
                                      ScaffoldMessenger.of(context)
                                          .showSnackBar(const SnackBar(
                                              content: Text(
                                                  'User deleted successfully')));
                                    }
                                  }
                                },
                                itemBuilder: (BuildContext context) => [
                                  PopupMenuItem<String>(
                                    value: 'edit',
                                    child: Row(
                                      children: const [
                                        Icon(Icons.edit,
                                            size: 18, color: Colors.blue),
                                        SizedBox(width: 8),
                                        Text('Edit'),
                                      ],
                                    ),
                                  ),
                                  PopupMenuItem<String>(
                                    value: 'delete',
                                    child: Row(
                                      children: const [
                                        Icon(Icons.delete_outline,
                                            size: 18, color: Colors.red),
                                        SizedBox(width: 8),
                                        Text('Delete'),
                                      ],
                                    ),
                                  ),
                                ],
                              ),
                            ],
                          ),
                        ),
                      );
                    },
                  )
                : SizedBox(
                    height: MediaQuery.of(context).size.height,
                    child: const Center(
                      child: Text('No users found.'),
                    ),
                  )
            : SizedBox(
                height: MediaQuery.of(context).size.height,
                child: const Center(
                  child: CircularProgressIndicator(),
                ),
              );
      }),
    );
  }
}
