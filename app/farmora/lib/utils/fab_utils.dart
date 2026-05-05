import 'package:flutter/material.dart';

class CustomFabLocation extends FloatingActionButtonLocation {
  final FloatingActionButtonLocation base;
  final double offsetX;
  final double offsetY;

  const CustomFabLocation({
    this.base = FloatingActionButtonLocation.endFloat,
    this.offsetX = 0,
    this.offsetY = -20, // Lift by 20 pixels by default
  });

  @override
  Offset getOffset(ScaffoldPrelayoutGeometry scaffoldGeometry) {
    Offset offset = base.getOffset(scaffoldGeometry);
    return Offset(offset.dx + offsetX, offset.dy + offsetY);
  }

  @override
  String toString() => 'CustomFabLocation';
}

class FabLocations {
  static const start = CustomFabLocation(base: FloatingActionButtonLocation.startFloat);
  static const center = CustomFabLocation(base: FloatingActionButtonLocation.centerFloat);
  static const end = CustomFabLocation(base: FloatingActionButtonLocation.endFloat);
}
