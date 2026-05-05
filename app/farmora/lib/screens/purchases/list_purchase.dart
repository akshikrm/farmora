import 'package:farmora/providers/items_provider.dart';
import 'package:farmora/providers/batches/batchesProvider.dart';
import 'package:farmora/providers/vendors_provider.dart';
import 'package:farmora/screens/purchases/add_purchase.dart';
import 'package:farmora/utils/colors.dart';
import 'package:farmora/utils/date_formatter.dart';
import 'package:farmora/widgets/confirmation_dialog.dart';
import 'package:farmora/utils/fab_utils.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:intl/intl.dart';

class ListPurchase extends StatefulWidget {
  const ListPurchase({super.key});

  @override
  State<ListPurchase> createState() => _ListPurchaseState();
}

class _ListPurchaseState extends State<ListPurchase> {
  int? _selectedVendorId;
  int? _selectedBatchId;
  int? _selectedCategoryId;
  DateTime? _startDate;
  DateTime? _endDate;

  @override
  void initState() {
    super.initState();
    Future.delayed(Duration(seconds: 0), () {
      context.read<ItemsProvider>().loadItems();
      context.read<VendorsProvider>().fetchVendorNames();
      context.read<ItemsProvider>().fetchCategoriesNames();
      context.read<BatchesProvider>().fetchBatchesNames();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: ColorUtils().backgroundColor,
      appBar: AppBar(
        title: Text("Purchases", style: TextStyle(fontWeight: FontWeight.w600)),
        centerTitle: true,
        backgroundColor: ColorUtils().backgroundColor,
        elevation: 0,
      ),
      body: Column(
        children: [
          _buildFilterSection(context),
          Expanded(
            child: context.watch<ItemsProvider>().isLoading
                ? Center(
                    child: CircularProgressIndicator(
                      color: ColorUtils().primaryColor,
                    ),
                  )
                : ListView.builder(
                    padding: EdgeInsets.symmetric(horizontal: 16),
                    itemCount: context.watch<ItemsProvider>().items.length,
                    itemBuilder: (context, index) {
                var item = context.watch<ItemsProvider>().items[index];
                return Container(
                  margin: EdgeInsets.only(bottom: 16),
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      colors: [
                        ColorUtils().cardColor,
                        ColorUtils().cardColor.withOpacity(0.95),
                      ],
                      begin: Alignment.topLeft,
                      end: Alignment.bottomRight,
                    ),
                    borderRadius: BorderRadius.circular(16),
                    boxShadow: [
                      BoxShadow(
                        color: ColorUtils().primaryColor.withOpacity(0.08),
                        blurRadius: 15,
                        offset: Offset(0, 5),
                        spreadRadius: 0,
                      ),
                    ],
                    border: Border.all(
                      color: ColorUtils().primaryColor.withOpacity(0.1),
                      width: 1,
                    ),
                  ),
                  child: Material(
                    color: Colors.transparent,
                    child: InkWell(
                      borderRadius: BorderRadius.circular(16),
                      child: Padding(
                        padding: EdgeInsets.all(16),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            // Header Row with Invoice Number and Amount
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                // Invoice Number with Icon
                                Expanded(
                                  child: Row(
                                    children: [
                                      Container(
                                        padding: EdgeInsets.all(8),
                                        decoration: BoxDecoration(
                                          gradient: LinearGradient(
                                            colors: [
                                              ColorUtils().primaryColor,
                                              ColorUtils()
                                                  .primaryColor
                                                  .withOpacity(0.8),
                                            ],
                                          ),
                                          borderRadius:
                                              BorderRadius.circular(10),
                                          boxShadow: [
                                            BoxShadow(
                                              color: ColorUtils()
                                                  .primaryColor
                                                  .withOpacity(0.3),
                                              blurRadius: 8,
                                              offset: Offset(0, 3),
                                            ),
                                          ],
                                        ),
                                        child: Icon(
                                          Icons.receipt_long,
                                          color: Colors.white,
                                          size: 20,
                                        ),
                                      ),
                                      SizedBox(width: 12),
                                      Expanded(
                                        child: Column(
                                          crossAxisAlignment:
                                              CrossAxisAlignment.start,
                                          children: [
                                            Text(
                                              "Invoice",
                                              style: TextStyle(
                                                fontSize: 11,
                                                color: Colors.grey[600],
                                                fontWeight: FontWeight.w500,
                                              ),
                                            ),
                                            SizedBox(height: 2),
                                            Text(
                                              "${item["invoice_number"]}",
                                              style: TextStyle(
                                                fontWeight: FontWeight.w700,
                                                fontSize: 16,
                                                color: ColorUtils().textColor,
                                              ),
                                              overflow: TextOverflow.ellipsis,
                                            ),
                                          ],
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                                // Total Amount Badge
                                Container(
                                  padding: EdgeInsets.symmetric(
                                    horizontal: 12,
                                    vertical: 8,
                                  ),
                                  decoration: BoxDecoration(
                                    gradient: LinearGradient(
                                      colors: [
                                        ColorUtils()
                                            .primaryColor
                                            .withOpacity(0.15),
                                        ColorUtils()
                                            .primaryColor
                                            .withOpacity(0.08),
                                      ],
                                    ),
                                    borderRadius: BorderRadius.circular(12),
                                    border: Border.all(
                                      color: ColorUtils()
                                          .primaryColor
                                          .withOpacity(0.3),
                                      width: 1.5,
                                    ),
                                  ),
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.end,
                                    children: [
                                      Text(
                                        "Total",
                                        style: TextStyle(
                                          fontSize: 10,
                                          color: ColorUtils()
                                              .primaryColor
                                              .withOpacity(0.8),
                                          fontWeight: FontWeight.w600,
                                        ),
                                      ),
                                      SizedBox(height: 2),
                                      Text(
                                        "₹${item["total_price"]}",
                                        style: TextStyle(
                                          fontWeight: FontWeight.w800,
                                          fontSize: 16,
                                          color: ColorUtils().primaryColor,
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              ],
                            ),
                            SizedBox(height: 16),
                            // Divider
                            Container(
                              height: 1,
                              decoration: BoxDecoration(
                                gradient: LinearGradient(
                                  colors: [
                                    Colors.transparent,
                                    Colors.grey.withOpacity(0.2),
                                    Colors.transparent,
                                  ],
                                ),
                              ),
                            ),
                            SizedBox(height: 16),
                            // Details Section
                            Row(
                              children: [
                                // Supplier Info
                                Expanded(
                                  child: _buildInfoChip(
                                    icon: Icons.store_outlined,
                                    label: "Supplier",
                                    value: item["vendor"]["name"].toString(),
                                  ),
                                ),
                                SizedBox(width: 8),
                                // Category Info
                                Expanded(
                                  child: _buildInfoChip(
                                    icon: Icons.category_outlined,
                                    label: "Category",
                                    value: item["category"]["name"].toString(),
                                  ),
                                ),
                              ],
                            ),
                            SizedBox(height: 12),
                            // Date Row
                            Container(
                              padding: EdgeInsets.symmetric(
                                horizontal: 12,
                                vertical: 8,
                              ),
                              decoration: BoxDecoration(
                                color:
                                    ColorUtils().primaryColor.withOpacity(0.05),
                                borderRadius: BorderRadius.circular(8),
                              ),
                              child: Row(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  Icon(
                                    Icons.calendar_today_outlined,
                                    size: 14,
                                    color: ColorUtils().primaryColor,
                                  ),
                                  SizedBox(width: 6),
                                  Text(
                                    DateFormatter.formatDate(
                                        item["invoice_date"].toString()),
                                    style: TextStyle(
                                      fontSize: 13,
                                      color: ColorUtils().primaryColor,
                                      fontWeight: FontWeight.w600,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            SizedBox(height: 16),
                            // Action Buttons Row
                            Row(
                              children: [
                                // Edit Button
                                Expanded(
                                  child: OutlinedButton.icon(
                                    onPressed: () async {
                                      final result = await Navigator.push(
                                        context,
                                        MaterialPageRoute(
                                          builder: (context) =>
                                              AddPurchases(item: item),
                                        ),
                                      );
                                      if (result == true && mounted) {
                                        context
                                            .read<ItemsProvider>()
                                            .loadItems();
                                      }
                                    },
                                    icon: Icon(
                                      Icons.edit_outlined,
                                      size: 18,
                                      color: ColorUtils().primaryColor,
                                    ),
                                    label: Text(
                                      'Edit',
                                      style: TextStyle(
                                        color: ColorUtils().primaryColor,
                                        fontWeight: FontWeight.w600,
                                      ),
                                    ),
                                    style: OutlinedButton.styleFrom(
                                      side: BorderSide(
                                        color: ColorUtils().primaryColor,
                                        width: 1.5,
                                      ),
                                      shape: RoundedRectangleBorder(
                                        borderRadius: BorderRadius.circular(8),
                                      ),
                                      padding:
                                          EdgeInsets.symmetric(vertical: 10),
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                );
              },
            ),
          ),
        ],
      ),
      floatingActionButtonLocation: FabLocations.end,
      floatingActionButton: FloatingActionButton(
        onPressed: () async {
          final result = await Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => const AddPurchases(),
            ),
          );
          // Reload items if add was successful
          if (result == true && mounted) {
            context.read<ItemsProvider>().loadItems();
          }
        },
        backgroundColor: ColorUtils().primaryColor,
        child: Icon(Icons.add, color: Colors.white),
      ),
    );
  }

  InputDecoration _filterDecoration(String label) {
    return InputDecoration(
      labelText: label,
      labelStyle: TextStyle(fontSize: 12, color: Colors.grey[600]),
      isDense: true,
      contentPadding: EdgeInsets.symmetric(horizontal: 12, vertical: 12),
      filled: true,
      fillColor: Colors.grey.shade50,
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(8),
        borderSide: BorderSide(color: Colors.grey.shade200),
      ),
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(8),
        borderSide: BorderSide(color: Colors.grey.shade200),
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(8),
        borderSide: BorderSide(color: ColorUtils().primaryColor.withOpacity(0.5)),
      ),
    );
  }

  Widget _buildFilterSection(BuildContext context) {
    final vendorsProvider = context.watch<VendorsProvider>();
    final batchesProvider = context.watch<BatchesProvider>();
    final itemsProvider = context.watch<ItemsProvider>();

    return Container(
      margin: EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.grey.withOpacity(0.2)),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.05),
            blurRadius: 10,
            offset: Offset(0, 5),
          ),
        ],
      ),
      child: Theme(
        data: Theme.of(context).copyWith(dividerColor: Colors.transparent),
        child: ExpansionTile(
          initiallyExpanded: false,
          tilePadding: EdgeInsets.symmetric(horizontal: 16, vertical: 0),
          title: Row(
            children: [
              Icon(Icons.filter_list_rounded, color: ColorUtils().primaryColor, size: 20),
              SizedBox(width: 8),
              Text(
                "Filter Purchases",
                style: TextStyle(
                  fontWeight: FontWeight.w600,
                  fontSize: 14,
                  color: ColorUtils().textColor,
                ),
              ),
            ],
          ),
          children: [
            Padding(
              padding: const EdgeInsets.only(left: 16, right: 16, bottom: 16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  Row(
                    children: [
                      Expanded(
                        child: DropdownButtonFormField<int>(
                          isExpanded: true,
                          value: _selectedVendorId,
                          decoration: _filterDecoration('Vendor'),
                          items: vendorsProvider.vendorNames.map((v) => DropdownMenuItem<int>(
                            value: v['id'] as int,
                            child: Text(v['name']?.toString() ?? 'Vendor', style: TextStyle(fontSize: 13), overflow: TextOverflow.ellipsis),
                          )).toList(),
                          onChanged: (val) => setState(() => _selectedVendorId = val),
                        ),
                      ),
                      SizedBox(width: 8),
                      Expanded(
                        child: DropdownButtonFormField<int>(
                          isExpanded: true,
                          value: _selectedBatchId,
                          decoration: _filterDecoration('Batch'),
                          items: batchesProvider.batchesNames.map((b) => DropdownMenuItem<int>(
                            value: b['id'] as int,
                            child: Text(b['name']?.toString() ?? 'Batch', style: TextStyle(fontSize: 13), overflow: TextOverflow.ellipsis),
                          )).toList(),
                          onChanged: (val) => setState(() => _selectedBatchId = val),
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: 12),
                  Row(
                    children: [
                      Expanded(
                        child: DropdownButtonFormField<int>(
                          isExpanded: true,
                          value: _selectedCategoryId,
                          decoration: _filterDecoration('Item'),
                          items: itemsProvider.categoriesNames.map((c) => DropdownMenuItem<int>(
                            value: c['id'] as int,
                            child: Text(c['name']?.toString() ?? 'Item', style: TextStyle(fontSize: 13), overflow: TextOverflow.ellipsis),
                          )).toList(),
                          onChanged: (val) => setState(() => _selectedCategoryId = val),
                        ),
                      ),
                      SizedBox(width: 8),
                      Expanded(child: SizedBox()),
                    ],
                  ),
                  SizedBox(height: 12),
                  Row(
                    children: [
                      Expanded(
                        child: TextFormField(
                          readOnly: true,
                          onTap: () async {
                            final picked = await showDatePicker(
                              context: context,
                              initialDate: _startDate ?? DateTime.now(),
                              firstDate: DateTime(2000),
                              lastDate: DateTime(2100),
                            );
                            if (picked != null) setState(() => _startDate = picked);
                          },
                          controller: TextEditingController(
                            text: _startDate != null ? DateFormat('yyyy-MM-dd').format(_startDate!) : '',
                          ),
                          style: TextStyle(fontSize: 13),
                          decoration: _filterDecoration('Start Date').copyWith(
                            hintText: 'Select',
                            suffixIcon: Icon(Icons.calendar_today, size: 16, color: Colors.grey[600]),
                          ),
                        ),
                      ),
                      SizedBox(width: 8),
                      Expanded(
                        child: TextFormField(
                          readOnly: true,
                          onTap: () async {
                            final picked = await showDatePicker(
                              context: context,
                              initialDate: _endDate ?? DateTime.now(),
                              firstDate: DateTime(2000),
                              lastDate: DateTime(2100),
                            );
                            if (picked != null) setState(() => _endDate = picked);
                          },
                          controller: TextEditingController(
                            text: _endDate != null ? DateFormat('yyyy-MM-dd').format(_endDate!) : '',
                          ),
                          style: TextStyle(fontSize: 13),
                          decoration: _filterDecoration('End Date').copyWith(
                            hintText: 'Select',
                            suffixIcon: Icon(Icons.calendar_today, size: 16, color: Colors.grey[600]),
                          ),
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: 12),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: [
                      TextButton(
                        style: TextButton.styleFrom(
                          padding: EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                        ),
                        onPressed: () {
                          setState(() {
                            _selectedVendorId = null;
                            _selectedBatchId = null;
                            _selectedCategoryId = null;
                            _startDate = null;
                            _endDate = null;
                          });
                          context.read<ItemsProvider>().loadItems();
                        },
                        child: Text('Clear', style: TextStyle(color: Colors.grey[700], fontWeight: FontWeight.w600, fontSize: 13)),
                      ),
                      SizedBox(width: 8),
                      ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          backgroundColor: ColorUtils().primaryColor,
                          elevation: 0,
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                          padding: EdgeInsets.symmetric(horizontal: 20, vertical: 12),
                        ),
                        onPressed: () {
                          final filters = <String, dynamic>{};
                          if (_selectedVendorId != null) filters['vendor_id'] = _selectedVendorId;
                          if (_selectedBatchId != null) filters['batch_id'] = _selectedBatchId;
                          if (_selectedCategoryId != null) filters['category_id'] = _selectedCategoryId;
                          if (_startDate != null) filters['start_date'] = _startDate!.toIso8601String();
                          if (_endDate != null) filters['end_date'] = _endDate!.toIso8601String();
                          
                          context.read<ItemsProvider>().loadItems(filters: filters);
                        },
                        child: Text('Apply Filters', style: TextStyle(color: Colors.white, fontWeight: FontWeight.w600, fontSize: 13)),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildInfoChip({
    required IconData icon,
    required String label,
    required String value,
  }) {
    return Container(
      padding: EdgeInsets.all(10),
      decoration: BoxDecoration(
        color: ColorUtils().backgroundColor,
        borderRadius: BorderRadius.circular(10),
        border: Border.all(
          color: Colors.grey.withOpacity(0.2),
          width: 1,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(
                icon,
                size: 14,
                color: ColorUtils().primaryColor.withOpacity(0.7),
              ),
              SizedBox(width: 4),
              Text(
                label,
                style: TextStyle(
                  fontSize: 10,
                  color: Colors.grey[600],
                  fontWeight: FontWeight.w500,
                ),
              ),
            ],
          ),
          SizedBox(height: 4),
          Text(
            value,
            style: TextStyle(
              fontSize: 13,
              color: ColorUtils().textColor,
              fontWeight: FontWeight.w600,
            ),
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
          ),
        ],
      ),
    );
  }

  void _showDeleteConfirmation(
      BuildContext context, int itemId, String invoiceNumber) {
    ConfirmationDialog.showDeleteConfirmation(
      context: context,
      title: 'Delete Purchase',
      itemName: 'Invoice: $invoiceNumber',
      itemIcon: Icons.receipt_long,
      customMessage: 'Are you sure you want to delete this purchase?',
      onConfirm: () => _deleteItem(itemId),
    );
  }

  Future<void> _deleteItem(int itemId) async {
    final provider = context.read<ItemsProvider>();
    final success = await provider.deleteItem(itemId);

    if (!mounted) return;

    if (success) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Purchase deleted successfully'),
          backgroundColor: Colors.green,
          behavior: SnackBarBehavior.floating,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(8),
          ),
        ),
      );
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(provider.error ?? 'Failed to delete purchase'),
          backgroundColor: Colors.red,
          behavior: SnackBarBehavior.floating,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(8),
          ),
        ),
      );
    }
  }
}
