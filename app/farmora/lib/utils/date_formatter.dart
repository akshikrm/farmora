import 'package:intl/intl.dart';

class DateFormatter {
  /// Formats a date string from ISO 8601 format (2025-12-22T00:00:00.000Z)
  /// to a readable format like "Mon 24 Jan 2025"
  static String formatDate(String? dateString) {
    if (dateString == null || dateString.isEmpty) {
      return '';
    }

    try {
      final DateTime date = DateTime.parse(dateString);
      final DateFormat formatter = DateFormat('EEE dd MMM yyyy');
      return formatter.format(date);
    } catch (e) {
      return dateString; // Return original string if parsing fails
    }
  }

  /// Formats a DateTime object to "Mon 24 Jan 2025"
  static String formatDateTime(DateTime date) {
    final DateFormat formatter = DateFormat('EEE dd MMM yyyy');
    return formatter.format(date);
  }

  /// Formats a date string to "24 Jan 2025" (without day name)
  static String formatDateShort(String? dateString) {
    if (dateString == null || dateString.isEmpty) {
      return '';
    }

    try {
      final DateTime date = DateTime.parse(dateString);
      final DateFormat formatter = DateFormat('dd MMM yyyy');
      return formatter.format(date);
    } catch (e) {
      return dateString;
    }
  }

  /// Formats a date string to "24/01/2025"
  static String formatDateNumeric(String? dateString) {
    if (dateString == null || dateString.isEmpty) {
      return '';
    }

    try {
      final DateTime date = DateTime.parse(dateString);
      final DateFormat formatter = DateFormat('dd/MM/yyyy');
      return formatter.format(date);
    } catch (e) {
      return dateString;
    }
  }

  /// Formats a date string to "Jan 24, 2025"
  static String formatDateUS(String? dateString) {
    if (dateString == null || dateString.isEmpty) {
      return '';
    }

    try {
      final DateTime date = DateTime.parse(dateString);
      final DateFormat formatter = DateFormat('MMM dd, yyyy');
      return formatter.format(date);
    } catch (e) {
      return dateString;
    }
  }
}
