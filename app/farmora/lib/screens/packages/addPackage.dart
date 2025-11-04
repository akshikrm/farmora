import 'dart:developer';

import 'package:farmora/providers/packages/packageProvider.dart';
import 'package:farmora/screens/authentication/loginPage.dart';
import 'package:farmora/utils/colors.dart';
import 'package:farmora/utils/customUtils.dart';
import 'package:farmora/utils/sizeutils.dart';
import 'package:farmora/utils/snackBarService.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';

class AddPackage extends StatefulWidget {
  bool isEdit;
  final int id;
  AddPackage({required this.isEdit, required this.id});

  @override
  State<AddPackage> createState() => _AddPackageState();
}

class _AddPackageState extends State<AddPackage> {
  TextEditingController name = TextEditingController();
  TextEditingController description = TextEditingController();
  TextEditingController price = TextEditingController();
  TextEditingController duration = TextEditingController();
  bool? active ;

  @override
  void initState() {
    super.initState();
    Future.delayed(Duration(seconds: 0), () async {
      if (widget.isEdit) {
        final data = await context
            .read<Packageprovider>()
            .fetchPackageDetails(widget.id);
        final details = data["data"];
        name.text = details["name"];
        description.text = details["description"].toString();
        price.text = details["price"].toString();
        duration.text = details["duration"].toString();
        active = details["status"];
        log("status ios $active");
        setState(() {});
      }
      else{
        active = true;
        setState(() {
          
        });
      }
    });
  }

  addPackage() {
    if (name.text.isNotEmpty &&
        description.text.isNotEmpty &&
        price.text.isNotEmpty &&
        duration.text.isNotEmpty) {
      context
          .read<Packageprovider>()
          .addPackage(name.text, description.text, price.text, duration.text);
      Navigator.pop(context);
    } else {
      SnackbarService.showSnackbar("Please fill out all the fields");
    }
  }

  editPackage() {
    if (name.text.isNotEmpty &&
        description.text.isNotEmpty &&
        price.text.isNotEmpty &&
        duration.text.isNotEmpty) {
      context.read<Packageprovider>().editPackage(name.text, description.text,
          price.text, duration.text, widget.id, active);
      Navigator.pop(context);
    } else {
      SnackbarService.showSnackbar("Please fill out all the fields");
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: ColorUtils().whiteColor,
      bottomNavigationBar: Padding(
        padding: const EdgeInsets.all(8.0),
        child: CustomButton(
            text: widget.isEdit ? "Edit Package" : "Add Package",
            onPressed: () {
              if (widget.isEdit == false) {
                addPackage();
              } else {
                editPackage();
              }
            },
            color: ColorUtils().primaryColor),
      ),
      appBar: AppBar(
        title: Text(
          widget.isEdit ? "Edit Package" : "Add Package",
          style: TextStyle(fontSize: appbarText),
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.all(8.0),
        child: SingleChildScrollView(
          child: Column(
            children: [
              Text(
                  "Here you can add the packages you wish to add which will be displayed to the customers"),
              SizedBox(
                height: 10,
              ),
              TextField(
                controller: name,
                decoration: InputDecoration(
                  labelText: "Package Name",
                  // border: OutlineInputBorder(),
                ),
              ),
              SizedBox(
                height: 10,
              ),
              TextField(
                controller: description,
                maxLines: 5,
                decoration: InputDecoration(
                  labelText: "Description",
                  // border: OutlineInputBorder(),
                ),
              ),
              SizedBox(
                height: 10,
              ),
              TextField(
                controller: price,
                keyboardType: TextInputType.number,
                inputFormatters: [FilteringTextInputFormatter.digitsOnly],
                decoration: InputDecoration(
                  labelText: "Price",
                  // border: OutlineInputBorder(),
                ),
              ),
              SizedBox(
                height: 10,
              ),
              TextField(
                controller: duration,
                keyboardType: TextInputType.number,
                inputFormatters: [FilteringTextInputFormatter.digitsOnly],
                decoration: InputDecoration(
                  labelText: "Duration",
                  // border: OutlineInputBorder(),
                ),
              ),
              SizedBox(
                height: 10,
              ),
              active!=null? StatusRadioButton(
                initialValue: active!,
                onChanged: (val) {
                  active = val;
                  print(
                      "Status is now: $val"); // true = Active, false = Inactive
                },
              ):SizedBox()
            ],
          ),
        ),
      ),
    );
  }
}
