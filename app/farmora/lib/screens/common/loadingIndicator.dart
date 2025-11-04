import 'dart:developer';

import 'package:farmora/providers/base/baseProvider.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class LoadingIndicator extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Consumer<BaseProvider>(
      builder: (context, baseProvider, child) {
        log("here");
        return baseProvider.isLoading
            ? Center(
                child: CircularProgressIndicator(),
              )
            : SizedBox.shrink(); // Return an empty box when not loading
      },
    );
  }
}
