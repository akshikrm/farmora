import 'package:farmora/utils/form_error_utils.dart';
import 'package:flutter/material.dart';

class ServerErrorText extends StatelessWidget {
  final Map<String, dynamic> errors;
  final String fieldName;

  const ServerErrorText({
    super.key,
    required this.errors,
    required this.fieldName,
  });

  @override
  Widget build(BuildContext context) {
    final errorMessage = FormErrorUtils.getErrorMessage(errors, fieldName);

    if (errorMessage == null || errorMessage.isEmpty) {
      return const SizedBox.shrink();
    }

    return Padding(
      padding: const EdgeInsets.only(top: 6.0, left: 12.0),
      child: Text(
        errorMessage,
        style: const TextStyle(
          color: Color(0xFFB00020), // Standard material error red
          fontSize: 12,
        ),
      ),
    );
  }
}
