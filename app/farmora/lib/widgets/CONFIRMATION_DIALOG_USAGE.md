# Reusable Confirmation Dialog - Usage Guide

## Overview
The `ConfirmationDialog` is a reusable utility class that provides beautiful, customizable confirmation dialogs throughout the application. It supports callbacks and can be easily styled for different use cases.

## Location
`lib/widgets/confirmation_dialog.dart`

## Features
- ✅ Fully customizable title, message, and button text
- ✅ Support for dangerous actions (red color scheme)
- ✅ Optional item highlighting with icon
- ✅ Optional warning text
- ✅ Callback support for confirm and cancel actions
- ✅ Convenience methods for common scenarios

## Basic Usage

### 1. Generic Confirmation Dialog

```dart
import 'package:farmora/widgets/confirmation_dialog.dart';

ConfirmationDialog.show(
  context: context,
  title: 'Confirm Action',
  message: 'Are you sure you want to proceed?',
  confirmText: 'Yes',
  cancelText: 'No',
  onConfirm: () {
    // Your action here
    print('User confirmed');
  },
  onCancel: () {
    // Optional cancel callback
    print('User cancelled');
  },
);
```

### 2. Delete Confirmation (Convenience Method)

```dart
ConfirmationDialog.showDeleteConfirmation(
  context: context,
  title: 'Delete Purchase',
  itemName: 'Invoice: $invoiceNumber',
  itemIcon: Icons.receipt_long,
  customMessage: 'Are you sure you want to delete this purchase?',
  onConfirm: () => _deleteItem(itemId),
);
```

### 3. Save Confirmation (Convenience Method)

```dart
ConfirmationDialog.showSaveConfirmation(
  context: context,
  message: 'Do you want to save your changes?',
  confirmText: 'Save',
  onConfirm: () async {
    await _saveChanges();
  },
);
```

### 4. Discard Changes Confirmation (Convenience Method)

```dart
ConfirmationDialog.showDiscardConfirmation(
  context: context,
  onConfirm: () {
    Navigator.pop(context);
  },
);
```

## Advanced Usage

### Custom Dangerous Action

```dart
ConfirmationDialog.show(
  context: context,
  title: 'Reset Data',
  message: 'This will reset all your data to default values.',
  confirmText: 'Reset',
  cancelText: 'Cancel',
  isDangerous: true,
  itemLabel: 'All user data will be lost',
  itemIcon: Icons.warning,
  warningText: 'This action cannot be undone.',
  onConfirm: () {
    _resetAllData();
  },
);
```

### Non-Dangerous Confirmation with Item Highlight

```dart
ConfirmationDialog.show(
  context: context,
  title: 'Approve Request',
  message: 'Do you want to approve this request?',
  confirmText: 'Approve',
  cancelText: 'Reject',
  isDangerous: false,
  itemLabel: 'Request #12345',
  itemIcon: Icons.check_circle_outline,
  onConfirm: () {
    _approveRequest();
  },
  onCancel: () {
    _rejectRequest();
  },
);
```

## Parameters

### Main `show()` Method

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `context` | BuildContext | ✅ | - | Context for showing dialog |
| `title` | String | ✅ | - | Dialog title |
| `message` | String | ✅ | - | Main message/question |
| `confirmText` | String | ❌ | 'Confirm' | Text for confirm button |
| `cancelText` | String | ❌ | 'Cancel' | Text for cancel button |
| `onConfirm` | VoidCallback | ✅ | - | Callback when confirmed |
| `onCancel` | VoidCallback | ❌ | null | Callback when cancelled |
| `isDangerous` | bool | ❌ | false | Use red color scheme |
| `itemLabel` | String | ❌ | null | Label to highlight |
| `itemIcon` | IconData | ❌ | null | Icon for item label |
| `warningText` | String | ❌ | null | Warning text to display |

## Convenience Methods

### `showDeleteConfirmation()`
Pre-configured for delete operations with red color scheme and warning text.

### `showSaveConfirmation()`
Pre-configured for save operations with primary color scheme.

### `showDiscardConfirmation()`
Pre-configured for discarding changes with appropriate warning.

## Real-World Examples

### Example 1: Delete Farm
```dart
ConfirmationDialog.showDeleteConfirmation(
  context: context,
  title: 'Delete Farm',
  itemName: 'Farm: ${farm.name}',
  itemIcon: Icons.agriculture,
  onConfirm: () async {
    final success = await context.read<FarmsProvider>().deleteFarm(farm.id);
    if (success) {
      SnackbarUtils.showSuccess('Farm deleted successfully');
    }
  },
);
```

### Example 2: Logout Confirmation
```dart
ConfirmationDialog.show(
  context: context,
  title: 'Logout',
  message: 'Are you sure you want to logout?',
  confirmText: 'Logout',
  cancelText: 'Stay',
  isDangerous: true,
  itemIcon: Icons.logout,
  onConfirm: () {
    context.read<AuthProvider>().logout();
    Navigator.pushReplacementNamed(context, '/login');
  },
);
```

### Example 3: Submit Form
```dart
ConfirmationDialog.show(
  context: context,
  title: 'Submit Form',
  message: 'Please review your information before submitting.',
  confirmText: 'Submit',
  cancelText: 'Review',
  itemLabel: 'Form will be submitted for approval',
  itemIcon: Icons.send,
  onConfirm: () async {
    await _submitForm();
  },
);
```

## Styling

The dialog automatically adapts to:
- **Dangerous actions**: Red color scheme with warning icon
- **Normal actions**: Primary color scheme with info icon
- **Theme**: Uses `ColorUtils()` for consistent theming

## Best Practices

1. **Use convenience methods** when possible for consistency
2. **Provide clear messages** that explain the action
3. **Use `isDangerous: true`** for destructive actions
4. **Include item labels** to show what will be affected
5. **Add warning text** for irreversible actions
6. **Handle callbacks properly** with async/await when needed

## Migration Guide

### Before (Custom Dialog)
```dart
showDialog(
  context: context,
  builder: (context) => AlertDialog(
    title: Text('Delete Item'),
    content: Text('Are you sure?'),
    actions: [
      TextButton(
        onPressed: () => Navigator.pop(context),
        child: Text('Cancel'),
      ),
      ElevatedButton(
        onPressed: () {
          Navigator.pop(context);
          _deleteItem();
        },
        child: Text('Delete'),
      ),
    ],
  ),
);
```

### After (Reusable Dialog)
```dart
ConfirmationDialog.showDeleteConfirmation(
  context: context,
  itemName: 'Item: $itemName',
  onConfirm: () => _deleteItem(),
);
```

## Benefits

✅ **Consistency**: Same look and feel across the app
✅ **Less Code**: Reduce boilerplate by 80%
✅ **Maintainability**: Update styling in one place
✅ **Flexibility**: Highly customizable for different use cases
✅ **Type Safety**: Proper callback typing
✅ **Accessibility**: Built-in best practices
