import 'package:farmora/providers/auth/authProvider.dart';
import 'package:farmora/providers/items_provider.dart';
import 'package:farmora/providers/batches/batchesProvider.dart';
import 'package:farmora/providers/vendors_provider.dart';
import 'package:farmora/screens/returns/add_returns.dart';
import 'package:farmora/utils/colors.dart';
import 'package:farmora/utils/navigationUtils.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';

class ListReturns extends StatefulWidget {
  const ListReturns({super.key});

  @override
  State<ListReturns> createState() => _ListReturnsState();
}

class _ListReturnsState extends State<ListReturns> {
  String? _returnType;
  int? _categoryId;
  int? _fromBatchId;
  int? _toBatchId;
  int? _toVendorId;
  String? _status;
  DateTime? _startDate;
  DateTime? _endDate;

  @override
  void initState() {
    super.initState();
    Future.delayed(Duration.zero, () {
      context.read<VendorsProvider>().fetchReturns();
      context.read<ItemsProvider>().fetchCategoriesNames();
      context.read<BatchesProvider>().fetchBatchesNames();
      context.read<VendorsProvider>().fetchSupplierNames();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: ColorUtils().backgroundColor,
      appBar: AppBar(
        title: Text(
          "Returns",
          style: TextStyle(
              color: ColorUtils().textColor, fontWeight: FontWeight.bold),
        ),
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          icon: Icon(Icons.arrow_back, color: ColorUtils().textColor),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      floatingActionButton: FloatingActionButton(
        backgroundColor: ColorUtils().primaryColor,
        child: Icon(Icons.add, color: Colors.white),
        onPressed: () {
          NavigationUtils.navigateTo(context, const AddReturns());
        },
      ),
      body: Column(
        children: [
          _buildFilterSection(context),
          Expanded(
            child: Consumer<VendorsProvider>(builder: (context, provider, child) {
              return provider.returns.isEmpty
                  ? Center(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Icon(Icons.assignment_return_outlined,
                              size: 64, color: Colors.grey),
                          SizedBox(height: 16),
                          Text("No returns found",
                              style: TextStyle(color: ColorUtils().textColor)),
                        ],
                      ),
                    )
            : ListView.separated(
                padding: const EdgeInsets.all(16),
                separatorBuilder: (context, index) =>
                    const SizedBox(height: 16),
                itemCount: provider.returns.length,
                itemBuilder: (context, index) {
                  final item = provider.returns[index];
                  final isVendor = item['return_type'] == 'vendor';
                  final targetName = isVendor
                      ? (item['to_vendor_data'] != null
                          ? item['to_vendor_data']['name']
                          : 'N/A')
                      : (item['to_batch_data'] != null
                          ? item['to_batch_data']['name']
                          : 'N/A');
                  final sourceName = item['from_batch_data'] != null
                      ? item['from_batch_data']['name']
                      : 'N/A';
                  final date = item['date'] != null
                      ? DateFormat('dd MMM yyyy')
                          .format(DateTime.parse(item['date']))
                      : 'N/A';
                  final categoryName = item['category'] != null
                      ? item['category']['name']
                      : 'General';
                  final totalAmount = item['total_amount'] ?? '0';

                  return Container(
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(16),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.grey.withOpacity(0.1),
                          blurRadius: 10,
                          offset: const Offset(0, 4),
                        ),
                      ],
                    ),
                    child: Column(
                      children: [
                        // Header
                        Padding(
                          padding: const EdgeInsets.all(16.0),
                          child: Row(
                            children: [
                              CircleAvatar(
                                radius: 20,
                                backgroundColor:
                                    ColorUtils().primaryColor.withOpacity(0.1),
                                child: Text(
                                  categoryName[0].toUpperCase(),
                                  style: TextStyle(
                                    color: ColorUtils().primaryColor,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ),
                              const SizedBox(width: 12),
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      categoryName,
                                      style: TextStyle(
                                        fontWeight: FontWeight.bold,
                                        fontSize: 16,
                                        color: ColorUtils().textColor,
                                      ),
                                    ),
                                    const SizedBox(height: 4),
                                    Text(
                                      date,
                                      style: TextStyle(
                                        color: Colors.grey[500],
                                        fontSize: 12,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                              Container(
                                padding: const EdgeInsets.symmetric(
                                    horizontal: 10, vertical: 6),
                                decoration: BoxDecoration(
                                  color: item['status'] == 'completed'
                                      ? Colors.green.withOpacity(0.1)
                                      : Colors.orange.withOpacity(0.1),
                                  borderRadius: BorderRadius.circular(20),
                                ),
                                child: Text(
                                  item['status'].toString().toUpperCase(),
                                  style: TextStyle(
                                    color: item['status'] == 'completed'
                                        ? Colors.green
                                        : Colors.orange,
                                    fontSize: 10,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                        // Flow Section (From -> To)
                        Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 16.0),
                          child: Row(
                            children: [
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      "FROM",
                                      style: TextStyle(
                                        fontSize: 10,
                                        color: Colors.grey[400],
                                        fontWeight: FontWeight.bold,
                                        letterSpacing: 1.0,
                                      ),
                                    ),
                                    const SizedBox(height: 4),
                                    Text(
                                      sourceName,
                                      style: TextStyle(
                                        fontSize: 14,
                                        fontWeight: FontWeight.w600,
                                        color: ColorUtils().textColor,
                                      ),
                                      maxLines: 1,
                                      overflow: TextOverflow.ellipsis,
                                    ),
                                  ],
                                ),
                              ),
                              Padding(
                                padding:
                                    const EdgeInsets.symmetric(horizontal: 8.0),
                                child: Icon(
                                  Icons.arrow_forward,
                                  color: Colors.grey[300],
                                  size: 20,
                                ),
                              ),
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.end,
                                  children: [
                                    Text(
                                      "TO (${item['return_type'].toString().toUpperCase()})",
                                      style: TextStyle(
                                        fontSize: 10,
                                        color: Colors.grey[400],
                                        fontWeight: FontWeight.bold,
                                        letterSpacing: 1.0,
                                      ),
                                    ),
                                    const SizedBox(height: 4),
                                    Text(
                                      targetName,
                                      style: TextStyle(
                                        fontSize: 14,
                                        fontWeight: FontWeight.w600,
                                        color: ColorUtils().textColor,
                                      ),
                                      maxLines: 1,
                                      overflow: TextOverflow.ellipsis,
                                    ),
                                  ],
                                ),
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(height: 16),
                        // Footer
                        Container(
                          padding: const EdgeInsets.symmetric(
                              horizontal: 16, vertical: 12),
                          decoration: BoxDecoration(
                            color: ColorUtils().primaryColor.withOpacity(0.05),
                            borderRadius: const BorderRadius.only(
                              bottomLeft: Radius.circular(16),
                              bottomRight: Radius.circular(16),
                            ),
                          ),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Row(
                                    children: [
                                      Text(
                                        "Qty: ",
                                        style: TextStyle(
                                          fontSize: 12,
                                          color: Colors.grey[600],
                                        ),
                                      ),
                                      Text(
                                        "${item['quantity']}",
                                        style: TextStyle(
                                          fontWeight: FontWeight.bold,
                                          fontSize: 13,
                                          color: ColorUtils().textColor,
                                        ),
                                      ),
                                    ],
                                  ),
                                  Text(
                                    "@ ₹${item['rate_per_bag']}/bag",
                                    style: TextStyle(
                                      fontSize: 11,
                                      color: Colors.grey[500],
                                    ),
                                  ),
                                ],
                              ),
                              Row(
                                children: [
                                  Text(
                                    "₹$totalAmount",
                                    style: TextStyle(
                                      fontSize: 18,
                                      fontWeight: FontWeight.bold,
                                      color: ColorUtils().primaryColor,
                                    ),
                                  ),
                                  const SizedBox(width: 8),
                                  Container(
                                    height: 24,
                                    width: 1,
                                    color: Colors.grey[300],
                                  ),
                                  IconButton(
                                    icon: const Icon(Icons.edit_outlined,
                                        size: 20),
                                    color: Colors.grey[600],
                                    constraints: const BoxConstraints(),
                                    padding: const EdgeInsets.only(left: 8),
                                    onPressed: () {
                                      NavigationUtils.navigateTo(context,
                                          AddReturns(returnData: item));
                                    },
                                  ),
                                ],
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  );
                },
              );
            }),
          ),
        ],
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
                "Filter Returns",
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
                        child: DropdownButtonFormField<String>(
                          isExpanded: true,
                          value: _returnType,
                          decoration: _filterDecoration('Return Type'),
                          items: [
                            DropdownMenuItem<String>(value: 'vendor', child: Text('Vendor', style: TextStyle(fontSize: 13))),
                            DropdownMenuItem<String>(value: 'batch', child: Text('Batch', style: TextStyle(fontSize: 13))),
                          ],
                          onChanged: (val) => setState(() => _returnType = val),
                        ),
                      ),
                      SizedBox(width: 8),
                      Expanded(
                        child: DropdownButtonFormField<int>(
                          isExpanded: true,
                          value: _categoryId,
                          decoration: _filterDecoration('Category'),
                          items: itemsProvider.categoriesNames.map((c) => DropdownMenuItem<int>(
                            value: c['id'] as int,
                            child: Text(c['name']?.toString() ?? 'Category', style: TextStyle(fontSize: 13), overflow: TextOverflow.ellipsis),
                          )).toList(),
                          onChanged: (val) => setState(() => _categoryId = val),
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
                          value: _fromBatchId,
                          decoration: _filterDecoration('From Batch'),
                          items: batchesProvider.batchesNames.map((b) => DropdownMenuItem<int>(
                            value: b['id'] as int,
                            child: Text(b['name']?.toString() ?? 'Batch', style: TextStyle(fontSize: 13), overflow: TextOverflow.ellipsis),
                          )).toList(),
                          onChanged: (val) => setState(() => _fromBatchId = val),
                        ),
                      ),
                      SizedBox(width: 8),
                      Expanded(
                        child: DropdownButtonFormField<int>(
                          isExpanded: true,
                          value: _toBatchId,
                          decoration: _filterDecoration('To Batch'),
                          items: batchesProvider.batchesNames.map((b) => DropdownMenuItem<int>(
                            value: b['id'] as int,
                            child: Text(b['name']?.toString() ?? 'Batch', style: TextStyle(fontSize: 13), overflow: TextOverflow.ellipsis),
                          )).toList(),
                          onChanged: (val) => setState(() => _toBatchId = val),
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
                          value: _toVendorId,
                          decoration: _filterDecoration('To Vendor'),
                          items: vendorsProvider.supplierNames.map((v) => DropdownMenuItem<int>(
                            value: v['id'] as int,
                            child: Text(v['name']?.toString() ?? 'Vendor', style: TextStyle(fontSize: 13), overflow: TextOverflow.ellipsis),
                          )).toList(),
                          onChanged: (val) => setState(() => _toVendorId = val),
                        ),
                      ),
                      SizedBox(width: 8),
                      Expanded(
                        child: DropdownButtonFormField<String>(
                          isExpanded: true,
                          value: _status,
                          decoration: _filterDecoration('Status'),
                          items: [
                            DropdownMenuItem<String>(value: 'pending', child: Text('Pending', style: TextStyle(fontSize: 13))),
                            DropdownMenuItem<String>(value: 'completed', child: Text('Completed', style: TextStyle(fontSize: 13))),
                            DropdownMenuItem<String>(value: 'cancelled', child: Text('Cancelled', style: TextStyle(fontSize: 13))),
                          ],
                          onChanged: (val) => setState(() => _status = val),
                        ),
                      ),
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
                  SizedBox(height: 16),
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
                            _returnType = null;
                            _categoryId = null;
                            _fromBatchId = null;
                            _toBatchId = null;
                            _toVendorId = null;
                            _status = null;
                            _startDate = null;
                            _endDate = null;
                          });
                          context.read<VendorsProvider>().fetchReturns();
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
                          if (_returnType != null) filters['return_type'] = _returnType;
                          if (_categoryId != null) filters['category_id'] = _categoryId;
                          if (_fromBatchId != null) filters['from_batch_id'] = _fromBatchId;
                          if (_toBatchId != null) filters['to_batch_id'] = _toBatchId;
                          if (_toVendorId != null) filters['to_vendor_id'] = _toVendorId;
                          if (_status != null) filters['status'] = _status;
                          if (_startDate != null) filters['start_date'] = _startDate!.toUtc().toIso8601String();
                          if (_endDate != null) filters['end_date'] = _endDate!.toUtc().toIso8601String();
                          
                          context.read<VendorsProvider>().fetchReturns(filters: filters);
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
}
