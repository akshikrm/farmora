import 'dart:developer';
import 'dart:ui';

import 'package:farmora/utils/colors.dart';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:internet_connection_listener/internet_connection_listener.dart';

class CustomButton extends StatelessWidget {
  final String text;
  final VoidCallback onPressed;
  final Color color;

  const CustomButton({
    Key? key,
    required this.text,
    required this.onPressed,
    required this.color,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return TextButton(
      onPressed: onPressed,
      style: TextButton.styleFrom(
        foregroundColor: Colors.white, // Text color
        backgroundColor: color, // Dynamic button color
        padding: EdgeInsets.symmetric(horizontal: 20, vertical: 12),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(15), // Rounded corners
        ),
      ),
      child: Text(
        text,
        style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
      ),
    );
  }
}

double getHeight(context) => MediaQuery.of(context).size.height;
double getWidth(context) => MediaQuery.of(context).size.width;

class NoEmojiInputFormatter extends TextInputFormatter {
  static final RegExp _emojiRegex = RegExp(
    r'[\u{1F600}-\u{1F64F}' // Emoticons
    r'\u{1F300}-\u{1F5FF}' // Symbols & Pictographs
    r'\u{1F680}-\u{1F6FF}' // Transport & Map
    r'\u{1F700}-\u{1F77F}' // Alchemical Symbols
    r'\u{1F780}-\u{1F7FF}' // Geometric Shapes Extended
    r'\u{1F800}-\u{1F8FF}' // Supplemental Arrows-C
    r'\u{1F900}-\u{1F9FF}' // Supplemental Symbols & Pictographs
    r'\u{1FA00}-\u{1FA6F}' // Chess Symbols
    r'\u{1FA70}-\u{1FAFF}' // Symbols and Pictographs Extended-A
    r'\u{2600}-\u{26FF}' // Miscellaneous Symbols
    r'\u{2700}-\u{27BF}]', // Dingbats
    unicode: true,
  );

  @override
  TextEditingValue formatEditUpdate(
      TextEditingValue oldValue, TextEditingValue newValue) {
    if (_emojiRegex.hasMatch(newValue.text)) {
      return oldValue; // Prevent emoji input
    }
    return newValue;
  }
}

showLoading() {
  showDialog(
    context: NavigatorService.navigatorKey.currentContext!,
    barrierDismissible: false,
    builder: (BuildContext context) {
      return WillPopScope(
        onWillPop: () async => true,
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 0, sigmaY: 0),
          child: Container(
            color: Colors.white.withOpacity(0.1),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                SizedBox(
                  child: Stack(
                    children: [
                      SizedBox(
                        width: 60,
                        height: 60,
                        child: CircularProgressIndicator(
                          color: ColorUtils().primaryColor,
                          strokeWidth: 4,
                          backgroundColor: Colors.white,
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(
                  height: 15,
                ),
              ],
            ),
          ),
        ),
      );
    },
  );
}

hideLoading() {
  Navigator.pop(NavigatorService.navigatorKey.currentContext!);
}

class StatusRadioButton extends StatefulWidget {
  final bool initialValue;
  final ValueChanged<bool> onChanged;

  const StatusRadioButton({
    super.key,
    required this.initialValue,
    required this.onChanged,
  });

  @override
  State<StatusRadioButton> createState() => _StatusRadioButtonState();
}

class _StatusRadioButtonState extends State<StatusRadioButton> {
  late bool selectedValue;

  @override
  void initState() {
    super.initState();
    selectedValue = widget.initialValue;
    setState(() {});
    log("initial value si $selectedValue");
  }

  void _onChanged(bool? value) {
    if (value != null) {
      setState(() {
        selectedValue = value;
      });
      widget.onChanged(value);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.start,
      children: [
        Radio<bool>(
          materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
          value: true,
          groupValue: selectedValue,
          onChanged: _onChanged,
        ),
        const Text("Active"),
        Radio<bool>(
          value: false,
          materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
          groupValue: selectedValue,
          onChanged: _onChanged,
        ),
        const Text("Inactive"),
      ],
    );
  }
}

Future<bool?> showConfirmationDialog({
  required BuildContext context,
  required String title,
  required String description,
  required String yesButtonText,
  required String noButtonText,
}) async {
  return showDialog<bool>(
    context: context,
    barrierDismissible:
        false, // Prevent dismissing the dialog by tapping outside
    builder: (BuildContext context) {
      return AlertDialog(
        title: Text(
          title,
          style: const TextStyle(fontWeight: FontWeight.bold),
        ),
        content: Text(description),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.of(context).pop(false); // Return false for "No"
            },
            child: Text(
              noButtonText,
              style: const TextStyle(color: Colors.red),
            ),
          ),
          TextButton(
            onPressed: () {
              Navigator.of(context).pop(true); // Return true for "Yes"
            },
            child: Text(
              yesButtonText,
              style: const TextStyle(color: Colors.green),
            ),
          ),
        ],
      );
    },
  );
}
