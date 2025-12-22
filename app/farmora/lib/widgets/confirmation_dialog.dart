import 'package:farmora/utils/colors.dart';
import 'package:flutter/material.dart';

class ConfirmationDialog {
  /// Shows a confirmation dialog with customizable content and actions
  ///
  /// [context] - BuildContext for showing the dialog
  /// [title] - Title of the dialog
  /// [message] - Main message/question to display
  /// [confirmText] - Text for the confirm button (default: "Confirm")
  /// [cancelText] - Text for the cancel button (default: "Cancel")
  /// [onConfirm] - Callback function when user confirms
  /// [onCancel] - Optional callback function when user cancels
  /// [isDangerous] - If true, uses red color scheme for dangerous actions (default: false)
  /// [itemLabel] - Optional label to highlight (e.g., "Invoice: INV-001")
  /// [itemIcon] - Optional icon to show with the item label
  /// [warningText] - Optional warning text to display (e.g., "This action cannot be undone")
  static Future<void> show({
    required BuildContext context,
    required String title,
    required String message,
    String confirmText = 'Confirm',
    String cancelText = 'Cancel',
    required VoidCallback onConfirm,
    VoidCallback? onCancel,
    bool isDangerous = false,
    String? itemLabel,
    IconData? itemIcon,
    String? warningText,
  }) async {
    return showDialog(
      context: context,
      barrierDismissible: false,
      builder: (BuildContext dialogContext) {
        final Color accentColor =
            isDangerous ? Colors.red : ColorUtils().primaryColor;
        final Color warningColor =
            isDangerous ? Colors.orange : ColorUtils().primaryColor;

        return AlertDialog(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
          ),
          title: Row(
            children: [
              Icon(
                isDangerous ? Icons.warning_amber_rounded : Icons.info_outline,
                color: warningColor,
                size: 28,
              ),
              SizedBox(width: 12),
              Expanded(
                child: Text(
                  title,
                  style: TextStyle(
                    fontWeight: FontWeight.w700,
                    fontSize: 18,
                  ),
                ),
              ),
            ],
          ),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                message,
                style: TextStyle(
                  fontSize: 15,
                  color: Colors.grey[800],
                ),
              ),
              if (itemLabel != null) ...[
                SizedBox(height: 12),
                Container(
                  padding: EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: accentColor.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(8),
                    border: Border.all(
                      color: accentColor.withOpacity(0.3),
                      width: 1,
                    ),
                  ),
                  child: Row(
                    children: [
                      if (itemIcon != null) ...[
                        Icon(
                          itemIcon,
                          color: accentColor,
                          size: 20,
                        ),
                        SizedBox(width: 8),
                      ],
                      Expanded(
                        child: Text(
                          itemLabel,
                          style: TextStyle(
                            fontWeight: FontWeight.w600,
                            color: isDangerous
                                ? Colors.red[700]
                                : ColorUtils().primaryColor,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
              if (warningText != null) ...[
                SizedBox(height: 12),
                Text(
                  warningText,
                  style: TextStyle(
                    fontSize: 13,
                    color: isDangerous
                        ? Colors.red[600]
                        : ColorUtils().primaryColor,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ],
            ],
          ),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(dialogContext).pop();
                if (onCancel != null) {
                  onCancel();
                }
              },
              child: Text(
                cancelText,
                style: TextStyle(
                  color: Colors.grey[600],
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
            ElevatedButton(
              onPressed: () {
                Navigator.of(dialogContext).pop();
                onConfirm();
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: accentColor,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(8),
                ),
                padding: EdgeInsets.symmetric(horizontal: 20, vertical: 12),
              ),
              child: Text(
                confirmText,
                style: TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.w700,
                ),
              ),
            ),
          ],
        );
      },
    );
  }

  /// Convenience method for showing a delete confirmation dialog
  static Future<void> showDeleteConfirmation({
    required BuildContext context,
    required String itemName,
    required VoidCallback onConfirm,
    VoidCallback? onCancel,
    String title = 'Delete Item',
    String? customMessage,
    IconData? itemIcon,
  }) async {
    return show(
      context: context,
      title: title,
      message: customMessage ?? 'Are you sure you want to delete this item?',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      onConfirm: onConfirm,
      onCancel: onCancel,
      isDangerous: true,
      itemLabel: itemName,
      itemIcon: itemIcon ?? Icons.delete_outline,
      warningText: 'This action cannot be undone.',
    );
  }

  /// Convenience method for showing a save confirmation dialog
  static Future<void> showSaveConfirmation({
    required BuildContext context,
    required String message,
    required VoidCallback onConfirm,
    VoidCallback? onCancel,
    String title = 'Save Changes',
    String confirmText = 'Save',
  }) async {
    return show(
      context: context,
      title: title,
      message: message,
      confirmText: confirmText,
      cancelText: 'Cancel',
      onConfirm: onConfirm,
      onCancel: onCancel,
      isDangerous: false,
    );
  }

  /// Convenience method for showing a discard changes confirmation dialog
  static Future<void> showDiscardConfirmation({
    required BuildContext context,
    required VoidCallback onConfirm,
    VoidCallback? onCancel,
  }) async {
    return show(
      context: context,
      title: 'Discard Changes',
      message:
          'You have unsaved changes. Are you sure you want to discard them?',
      confirmText: 'Discard',
      cancelText: 'Keep Editing',
      onConfirm: onConfirm,
      onCancel: onCancel,
      isDangerous: true,
      warningText: 'All unsaved changes will be lost.',
    );
  }
}
