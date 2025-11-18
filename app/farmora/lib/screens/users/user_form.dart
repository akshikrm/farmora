import 'package:farmora/providers/users_provider.dart';
import 'package:farmora/utils/customUtils.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class UserForm extends StatefulWidget {
  final Map<String, dynamic>? user;
  const UserForm({Key? key, this.user}) : super(key: key);

  @override
  State<UserForm> createState() => _UserFormState();
}

class _UserFormState extends State<UserForm> {
  final _formKey = GlobalKey<FormState>();
  late TextEditingController nameController;
  late TextEditingController usernameController;
  late TextEditingController passwordController;
  bool isEdit = false;
  int? selectedRoleId;

  @override
  void initState() {
    super.initState();
    isEdit = widget.user != null;
    nameController = TextEditingController(text: widget.user?['name'] ?? '');
    usernameController =
        TextEditingController(text: widget.user?['username'] ?? '');
    passwordController = TextEditingController();
    context.read<UsersProvider>().loadRoles();
    setState(() {});
  }

  @override
  void dispose() {
    nameController.dispose();
    usernameController.dispose();
    passwordController.dispose();
    super.dispose();
  }

  Future<void> _save() async {
    if (!_formKey.currentState!.validate()) return;
    final provider = context.read<UsersProvider>();
    if (isEdit) {
      await provider.updateUser(
        widget.user!["id"].toString(),
        {
          "name": nameController.text.trim(),
          // "username": usernameController.text.trim(),
          if (passwordController.text.isNotEmpty)
            "password": passwordController.text,
          if (selectedRoleId != null)
            "role_id": selectedRoleId,
          "status": 1,
        },
      );
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('User updated successfully')),
      );
    } else {
      await provider.addUser({
        "name": nameController.text.trim(),
        "username": usernameController.text.trim(),
        "password": passwordController.text,
        if (selectedRoleId != null)
          "role_id": selectedRoleId,
        "status": 1,
      });
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('User added successfully')),
      );
    }
    Navigator.pop(context);
  }

  Future<void> _delete() async {
    final provider = context.read<UsersProvider>();
    final confirm = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Delete User'),
        content: const Text('Are you sure you want to delete this user?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context, false),
            child: const Text('Cancel'),
          ),
          TextButton(
            onPressed: () => Navigator.pop(context, true),
            child: const Text('Delete', style: TextStyle(color: Colors.red)),
          ),
        ],
      ),
    );
    if (confirm == true) {
      await provider.deleteUser(widget.user!["id"].toString());
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('User deleted successfully')),
      );
      Navigator.pop(context);
    }
  }

  Widget _buildTextFormField({
    required TextEditingController controller,
    required String label,
    bool obscureText = false,
    String? Function(String?)? validator,
    TextInputType keyboardType = TextInputType.text,
    bool enabled = true,
  }) {
    return TextFormField(
      controller: controller,
      keyboardType: keyboardType,
      obscureText: obscureText,
      enabled: enabled,
      decoration: InputDecoration(
        labelText: label,
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(8.0),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(8.0),
          borderSide: BorderSide(
            color: Colors.grey.shade300,
            width: 1.0,
          ),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(8.0),
          borderSide: BorderSide(
            color: Theme.of(context).primaryColor,
            width: 2.0,
          ),
        ),
        contentPadding: const EdgeInsets.symmetric(
          horizontal: 16.0,
          vertical: 16.0,
        ),
        labelStyle: TextStyle(
          color: Colors.grey.shade600,
        ),
      ),
      autovalidateMode: AutovalidateMode.onUserInteraction,
      validator: validator,
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(isEdit ? 'Edit User' : 'Add User'),
        elevation: 2,
        actions: isEdit
            ? [
                IconButton(
                  icon: const Icon(Icons.delete_outline, color: Colors.red),
                  onPressed: _delete,
                  tooltip: 'Delete User',
                ),
              ]
            : null,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Container(
                padding: const EdgeInsets.all(12.0),
                decoration: BoxDecoration(
                  color: Colors.blue.shade50,
                  borderRadius: BorderRadius.circular(8.0),
                  border: Border.all(
                    color: Colors.blue.shade200,
                    width: 1.0,
                  ),
                ),
                child: Row(
                  children: [
                    Icon(
                      Icons.info_outline,
                      color: Colors.blue.shade700,
                      size: 20,
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Text(
                        isEdit
                            ? 'Update user information and assign a role'
                            : 'Create a new user by filling in all required fields and selecting a role',
                        style: TextStyle(
                          color: Colors.blue.shade700,
                          fontSize: 13,
                          height: 1.4,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 20),
              Card(
                elevation: 1,
                shadowColor: Colors.black.withOpacity(0.1),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12.0),
                  side: BorderSide(
                    color: Colors.grey.shade100,
                    width: 1.0,
                  ),
                ),
                child: Padding(
                  padding: const EdgeInsets.all(20.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      Row(
                        children: [
                          Icon(
                            Icons.person,
                            color: Colors.grey.shade600,
                            size: 20,
                          ),
                          const SizedBox(width: 8),
                          Text(
                            'Basic Details',
                            style: Theme.of(context).textTheme.labelLarge?.copyWith(
                              fontWeight: FontWeight.w700,
                              color: Colors.grey.shade800,
                              fontSize: 14,
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 16),
                      _buildTextFormField(
                        controller: nameController,
                        label: 'Full Name',
                        validator: (value) {
                          if (value == null || value.trim().isEmpty) {
                            return 'Please enter a name';
                          }
                          return null;
                        },
                      ),
                      const SizedBox(height: 16),
                      _buildTextFormField(
                        controller: usernameController,
                        label: 'Username',
                        enabled: !isEdit,
                        validator: (value) {
                          if (value == null || value.trim().isEmpty) {
                            return 'Please enter a username';
                          }
                          if (value.trim().length < 3) {
                            return 'Username must be at least 3 characters';
                          }
                          return null;
                        },
                      ),
                      const SizedBox(height: 16),
                      _buildTextFormField(
                        controller: passwordController,
                        label: isEdit ? 'New Password (optional)' : 'Password',
                        obscureText: true,
                        validator: (value) {
                          if (!isEdit && (value == null || value.isEmpty)) {
                            return 'Please enter a password';
                          }
                          if (value != null && value.isNotEmpty && value.length < 6) {
                            return 'Password must be at least 6 characters';
                          }
                          return null;
                        },
                      ),
                      const SizedBox(height: 20),
                      Consumer<UsersProvider>(
                        builder: (context, usersProvider, _) {
                          final rolesData = usersProvider.roles;
                          List<Map<String, dynamic>> rolesList = [];
                          
                          if (rolesData['success'] == true && rolesData['data'] != null) {
                            final data = rolesData['data']['data']['data'];
                            if (data is List) {
                              rolesList = List<Map<String, dynamic>>.from(data);
                            }
                          }
                          
                          return Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Row(
                                children: [
                                  Icon(
                                    Icons.security,
                                    color: Colors.grey.shade600,
                                    size: 20,
                                  ),
                                  const SizedBox(width: 8),
                                  Text(
                                    'Select Role',
                                    style: Theme.of(context).textTheme.labelLarge?.copyWith(
                                      fontWeight: FontWeight.w700,
                                      color: Colors.grey.shade800,
                                      fontSize: 14,
                                    ),
                                  ),
                                ],
                              ),
                              const SizedBox(height: 12),
                              if (rolesList.isEmpty)
                                Padding(
                                  padding: const EdgeInsets.symmetric(vertical: 8.0),
                                  child: Text(
                                    'No roles available',
                                    style: TextStyle(
                                      color: Colors.grey.shade500,
                                      fontSize: 14,
                                    ),
                                  ),
                                )
                              else
                                Container(
                                  decoration: BoxDecoration(
                                    border: Border.all(
                                      color: Colors.grey.shade200,
                                    ),
                                    borderRadius: BorderRadius.circular(8.0),
                                    color: Colors.grey.shade50,
                                  ),
                                  child: Column(
                                    children: rolesList.asMap().entries.map((entry) {
                                      final index = entry.key;
                                      final role = entry.value;
                                      final roleId = role['id'] as int;
                                      final roleName = role['name'] ?? 'Unknown Role';
                                      final roleDescription = role['description'] ?? '';
                                      final isSelected = selectedRoleId == roleId;
                                      final isLast = index == rolesList.length - 1;
                                      
                                      return Column(
                                        children: [
                                          CheckboxListTile(
                                            contentPadding: const EdgeInsets.symmetric(
                                              horizontal: 12.0,
                                              vertical: 4.0,
                                            ),
                                            value: isSelected,
                                            onChanged: (value) {
                                              setState(() {
                                                selectedRoleId = value == true ? roleId : null;
                                              });
                                            },
                                            title: Text(
                                              roleName,
                                              style: TextStyle(
                                                fontWeight: isSelected ? FontWeight.w600 : FontWeight.w500,
                                              ),
                                            ),
                                            subtitle: roleDescription.isNotEmpty
                                                ? Text(
                                                    roleDescription,
                                                    style: TextStyle(
                                                      fontSize: 12,
                                                      color: Colors.grey.shade600,
                                                    ),
                                                  )
                                                : null,
                                          ),
                                          if (!isLast)
                                            Divider(
                                              height: 1,
                                              color: Colors.grey.shade200,
                                            ),
                                        ],
                                      );
                                    }).toList(),
                                  ),
                                ),
                            ],
                          );
                        },
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 24),
              Center(
                child: SizedBox(
                  width: 200,
                  child: ElevatedButton(
                    onPressed: _save,
                   
                    child: Text(
                      isEdit ? 'Update User' : 'Add User',
                      style: const TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    style: ElevatedButton.styleFrom(
                      padding: const EdgeInsets.symmetric(vertical: 12.0),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(8.0),
                      ),
                      elevation: 2,
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 16),
            ],
          ),
        ),
      ),
    );
  }
}
