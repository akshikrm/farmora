import 'package:farmora/utils/colors.dart';
import 'package:flutter/material.dart';

class ListVendors extends StatelessWidget {
  const ListVendors({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: ColorUtils().backgroundColor,
      appBar: AppBar(
        title: Text("Vendors", style: TextStyle(fontWeight: FontWeight.w600)),
        centerTitle: true,
        backgroundColor: ColorUtils().backgroundColor,
        elevation: 0,
      ),
      body: GridView.builder(
        padding: EdgeInsets.all(16),
        gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2,
          crossAxisSpacing: 16,
          mainAxisSpacing: 16,
          childAspectRatio: 0.8,
        ),
        itemCount: 8,
        itemBuilder: (context, index) {
          return Container(
            decoration: BoxDecoration(
              color: ColorUtils().cardColor,
              borderRadius: BorderRadius.circular(16),
              boxShadow: [
                BoxShadow(
                  color: Colors.grey.withOpacity(0.05),
                  blurRadius: 10,
                  offset: Offset(0, 4),
                ),
              ],
            ),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                CircleAvatar(
                  radius: 30,
                  backgroundColor: ColorUtils().primaryColor.withOpacity(0.1),
                  child: Icon(Icons.store,
                      size: 30, color: ColorUtils().primaryColor),
                ),
                SizedBox(height: 12),
                Text(
                  "Vendor ${index + 1}",
                  style: TextStyle(fontWeight: FontWeight.w600, fontSize: 16),
                ),
                SizedBox(height: 4),
                Text(
                  "Supplier",
                  style: TextStyle(color: Colors.grey, fontSize: 12),
                ),
                SizedBox(height: 12),
                OutlinedButton(
                  onPressed: () {},
                  style: OutlinedButton.styleFrom(
                    side: BorderSide(color: ColorUtils().primaryColor),
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(20)),
                  ),
                  child: Text("View Profile", style: TextStyle(fontSize: 12)),
                ),
              ],
            ),
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {},
        backgroundColor: ColorUtils().primaryColor,
        child: Icon(Icons.add, color: Colors.white),
      ),
    );
  }
}
