import 'package:farmora/providers/vendors_provider.dart';
import 'package:farmora/utils/colors.dart';
import 'package:farmora/utils/customUtils.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';
import '../add_vendors.dart';

class ListVendors extends StatefulWidget {
  const ListVendors({super.key});

  @override
  State<ListVendors> createState() => _ListVendorsState();
}

class _ListVendorsState extends State<ListVendors> {
  @override
  void initState() {
    super.initState();
    Future.delayed(Duration(seconds: 0), () {
      context.read<VendorsProvider>().fetchVendors();
    });
  }

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
      body:
          Consumer<VendorsProvider>(builder: (context, vendorsProvider, child) {
        return vendorsProvider.vendors.isNotEmpty
            ? GridView.builder(
                padding: EdgeInsets.all(16),
                gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2,
                  crossAxisSpacing: 16,
                  mainAxisSpacing: 16,
                  childAspectRatio: 0.8,
                ),
                itemCount: vendorsProvider.vendors.length,
                itemBuilder: (context, index) {
                  var vendorData = vendorsProvider.vendors[index];
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
                        Align(
                          alignment: Alignment.topRight,
                          child: PopupMenuButton<String>(
                            onSelected: (value) async {
                              if (value == 'edit') {
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                    builder: (context) =>
                                        AddVendorsPage(vendorData: vendorData),
                                  ),
                                );
                              } else if (value == 'delete') {
                                final confirm = await showDialog<bool>(
                                  context: context,
                                  builder: (context) => AlertDialog(
                                    title: Text('Delete Vendor'),
                                    content: Text(
                                        'Are you sure you want to delete this vendor?'),
                                    actions: [
                                      TextButton(
                                        onPressed: () =>
                                            Navigator.pop(context, false),
                                        child: Text('Cancel'),
                                      ),
                                      TextButton(
                                        onPressed: () =>
                                            Navigator.pop(context, true),
                                        child: Text('Delete'),
                                      ),
                                    ],
                                  ),
                                );
                                if (confirm == true) {
                                  await Provider.of<VendorsProvider>(context,
                                          listen: false)
                                      .deleteVendor(vendorData['id']);
                                }
                              }
                            },
                            itemBuilder: (context) => [
                              PopupMenuItem(
                                value: 'edit',
                                child: Text('Edit'),
                              ),
                              PopupMenuItem(
                                value: 'delete',
                                child: Text('Delete'),
                              ),
                            ],
                          ),
                        ),
                        CircleAvatar(
                          radius: 30,
                          backgroundColor:
                              ColorUtils().primaryColor.withOpacity(0.1),
                          child: Icon(Icons.store,
                              size: 30, color: ColorUtils().primaryColor),
                        ),
                        SizedBox(height: 12),
                        Text(
                          vendorData["name"] ?? "",
                          style: TextStyle(
                              fontWeight: FontWeight.w600, fontSize: 16),
                        ),
                        SizedBox(height: 4),
                        Text(
                          toBeginningOfSentenceCase(
                              vendorData["vendor_type"] ?? ""),
                          style: TextStyle(color: Colors.grey, fontSize: 12),
                        ),
                        SizedBox(height: 4),
                        Text(
                          "Opening Balance : " +
                                  vendorData["opening_balance"] ??
                              "",
                          style: TextStyle(color: Colors.grey, fontSize: 12),
                        ),
                        SizedBox(height: 12),
                      ],
                    ),
                  );
                },
              )
            : NoDataFound();
      }),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => AddVendorsPage()),
          );
        },
        backgroundColor: ColorUtils().primaryColor,
        child: Icon(Icons.add, color: Colors.white),
      ),
    );
  }
}
